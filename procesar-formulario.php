<?php

declare(strict_types=1);

use Dotenv\Dotenv;
use PHPMailer\PHPMailer\PHPMailer;

const MAX_POST_BYTES = 65536;
const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW = 900;
const ALLOWED_HOSTS = ['konsciohousing.org', 'www.konsciohousing.org'];

function redirectTo(string $location): never
{
    header('Location: ' . $location, true, 303);
    exit;
}

function validationError(string $type = 'validacion'): never
{
    redirectTo('/error-formulario.html?error=' . rawurlencode($type));
}

function postString(string $key): string
{
    $value = $_POST[$key] ?? '';

    if (!is_string($value)) {
        validationError();
    }

    return $value;
}

function cleanLine(string $key, int $maxLength, bool $required = true): string
{
    $value = trim(postString($key));
    $value = preg_replace('/[\x00-\x1F\x7F]+/u', ' ', $value) ?? '';
    $value = trim(preg_replace('/\s+/u', ' ', $value) ?? '');

    if (($required && $value === '') || mb_strlen($value, 'UTF-8') > $maxLength) {
        validationError();
    }

    return $value;
}

function cleanText(string $key, int $maxLength, bool $required = true): string
{
    $value = trim(postString($key));
    $value = str_replace(["\r\n", "\r", "\0"], ["\n", "\n", ''], $value);

    if (($required && $value === '') || mb_strlen($value, 'UTF-8') > $maxLength) {
        validationError();
    }

    return $value;
}

function allowedValue(string $key, array $allowed): string
{
    $value = cleanLine($key, 120);

    if (!in_array($value, $allowed, true)) {
        validationError();
    }

    return $value;
}

function envValue(string $key): string
{
    $value = $_ENV[$key] ?? $_SERVER[$key] ?? getenv($key);

    if (!is_string($value) || trim($value) === '') {
        throw new RuntimeException('Falta la variable de entorno ' . $key);
    }

    return trim($value);
}

function verifyRequestOrigin(): void
{
    $hostHeader = $_SERVER['HTTP_HOST'] ?? '';
    $host = strtolower((string) parse_url('https://' . $hostHeader, PHP_URL_HOST));

    if (!in_array($host, ALLOWED_HOSTS, true)) {
        http_response_code(403);
        exit;
    }

    $source = $_SERVER['HTTP_ORIGIN'] ?? $_SERVER['HTTP_REFERER'] ?? '';
    if ($source === '') {
        return;
    }

    $sourceHost = strtolower((string) parse_url($source, PHP_URL_HOST));
    if (!in_array($sourceHost, ALLOWED_HOSTS, true)) {
        http_response_code(403);
        exit;
    }
}

function enforceRateLimit(string $storagePath, string $ipAddress, string $appKey): void
{
    $directory = $storagePath . '/rate-limit';
    if (!is_dir($directory) && !mkdir($directory, 0750, true) && !is_dir($directory)) {
        throw new RuntimeException('No se pudo crear el directorio de rate limiting');
    }

    $identifier = hash_hmac('sha256', $ipAddress, $appKey);
    $filePath = $directory . '/' . $identifier . '.json';
    $handle = fopen($filePath, 'c+');

    if ($handle === false || !flock($handle, LOCK_EX)) {
        throw new RuntimeException('No se pudo abrir el control de frecuencia');
    }

    try {
        rewind($handle);
        $decoded = json_decode(stream_get_contents($handle) ?: '[]', true);
        $timestamps = is_array($decoded) ? $decoded : [];
        $now = time();
        $timestamps = array_values(array_filter(
            $timestamps,
            static fn ($timestamp): bool => is_int($timestamp) && $timestamp > ($now - RATE_LIMIT_WINDOW)
        ));

        if (count($timestamps) >= RATE_LIMIT_MAX) {
            validationError('limite');
        }

        $timestamps[] = $now;
        rewind($handle);
        ftruncate($handle, 0);
        fwrite($handle, json_encode($timestamps, JSON_THROW_ON_ERROR));
        fflush($handle);
    } finally {
        flock($handle, LOCK_UN);
        fclose($handle);
    }
}

function writeAuditLog(
    string $storagePath,
    string $appKey,
    string $formName,
    string $status,
    string $email,
    string $ipAddress,
    string $detail = ''
): void {
    $logDirectory = $storagePath . '/logs';
    if (!is_dir($logDirectory)) {
        @mkdir($logDirectory, 0750, true);
    }

    $record = [
        'timestamp' => gmdate('c'),
        'form' => $formName,
        'status' => $status,
        'email_hash' => hash_hmac('sha256', strtolower($email), $appKey),
        'ip_hash' => hash_hmac('sha256', $ipAddress, $appKey),
    ];

    if ($detail !== '') {
        $record['detail'] = mb_substr(preg_replace('/\s+/u', ' ', $detail) ?? '', 0, 500, 'UTF-8');
    }

    @file_put_contents(
        $logDirectory . '/formularios.log',
        json_encode($record, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES) . PHP_EOL,
        FILE_APPEND | LOCK_EX
    );
}

function buildMessage(string $formName, array $data, string $siteUrl): array
{
    $header = [
        'Nuevo envío desde Konscio3D Housing',
        '====================================',
        '',
    ];

    return match ($formName) {
        'contacto' => [
            '[Contacto web] ' . $data['asunto'],
            implode("\n", array_merge($header, [
                'Formulario: Contacto',
                'Nombre: ' . $data['nombre'],
                'Email: ' . $data['email'],
                'Asunto: ' . $data['asunto'],
                'Consentimiento de privacidad: Aceptado',
                '',
                'Mensaje:',
                $data['mensaje'],
                '',
                'Página: ' . $siteUrl . '/contacto.html',
                'Fecha UTC: ' . gmdate('Y-m-d H:i:s'),
            ])),
        ],
        'habitante' => [
            '[Futuro habitante] Nueva solicitud - ' . $data['nombre'],
            implode("\n", array_merge($header, [
                'Formulario: Futuro habitante',
                'Nombre: ' . $data['nombre'],
                'Email: ' . $data['email'],
                'Teléfono: ' . ($data['telefono'] ?: 'No proporcionado'),
                'País/Ciudad: ' . $data['ubicacion'],
                'Situación familiar: ' . $data['situacion_familiar'],
                'Consentimiento de privacidad: Aceptado',
                '',
                'Motivación:',
                $data['motivacion'],
                '',
                'Página: ' . $siteUrl . '/unete.html',
                'Fecha UTC: ' . gmdate('Y-m-d H:i:s'),
            ])),
        ],
        'colaborador' => [
            '[Colaborador] Nueva solicitud - ' . $data['nombre'],
            implode("\n", array_merge($header, [
                'Formulario: Colaborador',
                'Nombre: ' . $data['nombre'],
                'Email: ' . $data['email'],
                'Área de experiencia: ' . $data['area_experticia'],
                'Consentimiento de privacidad: Aceptado',
                '',
                'Contribución:',
                $data['contribucion'],
                '',
                'Página: ' . $siteUrl . '/unete.html',
                'Fecha UTC: ' . gmdate('Y-m-d H:i:s'),
            ])),
        ],
        'inversor' => [
            '[Inversor] Interés en inversión - ' . $data['nombre'],
            implode("\n", array_merge($header, [
                'Formulario: Inversor',
                'Nombre/Organización: ' . $data['nombre'],
                'Email: ' . $data['email'],
                'Teléfono: ' . ($data['telefono'] ?: 'No proporcionado'),
                'Tipo de inversión: ' . $data['tipo_inversion'],
                'Consentimiento de privacidad: Aceptado',
                '',
                'Mensaje:',
                $data['mensaje'] ?: 'Sin mensaje adicional',
                '',
                'Página: ' . $siteUrl . '/unete.html',
                'Fecha UTC: ' . gmdate('Y-m-d H:i:s'),
            ])),
        ],
        default => throw new InvalidArgumentException('Tipo de formulario no permitido'),
    };
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    redirectTo('/');
}

if ((int) ($_SERVER['CONTENT_LENGTH'] ?? 0) > MAX_POST_BYTES) {
    validationError();
}

verifyRequestOrigin();

if (postString('website') !== '' || postString('bot-field') !== '') {
    redirectTo('/gracias.html');
}

$projectRoot = dirname(__DIR__);
$storagePath = $projectRoot . '/storage';
$autoloadPath = $projectRoot . '/vendor/autoload.php';

if (!is_file($autoloadPath)) {
    error_log('KonscioHousing: falta vendor/autoload.php');
    validationError('configuracion');
}

require $autoloadPath;

$formName = '';
$email = '';
$ipAddress = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
$appKey = '';

try {
    Dotenv::createImmutable($projectRoot)->safeLoad();

    $appKey = envValue('APP_KEY');
    $siteName = envValue('SITE_NAME');
    $siteUrl = rtrim(envValue('SITE_URL'), '/');
    $smtpHost = envValue('SMTP_HOST');
    $smtpPort = filter_var(envValue('SMTP_PORT'), FILTER_VALIDATE_INT, [
        'options' => ['min_range' => 1, 'max_range' => 65535],
    ]);
    $smtpUser = envValue('SMTP_USER');
    $smtpPassword = envValue('SMTP_PASS');
    $mailTo = envValue('MAIL_TO');

    if ($smtpPort === false || !filter_var($smtpUser, FILTER_VALIDATE_EMAIL) || !filter_var($mailTo, FILTER_VALIDATE_EMAIL)) {
        throw new RuntimeException('Configuración SMTP inválida');
    }

    enforceRateLimit($storagePath, $ipAddress, $appKey);

    $formName = cleanLine('form-name', 30);
    if (!in_array($formName, ['contacto', 'habitante', 'colaborador', 'inversor'], true)) {
        validationError('tipo');
    }

    $nombre = cleanLine('nombre', 120);
    $email = strtolower(cleanLine('email', 254));

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        validationError('email');
    }

    if (postString('privacy_consent') !== 'acepto') {
        validationError();
    }

    $data = ['nombre' => $nombre, 'email' => $email];

    switch ($formName) {
        case 'contacto':
            $data['asunto'] = allowedValue('asunto', [
                'Consulta general',
                'Quiero vivir en el proyecto',
                'Colaboración',
                'Inversión',
                'Prensa/Media',
                'Otro',
            ]);
            $data['mensaje'] = cleanText('mensaje', 5000);
            break;

        case 'habitante':
            $data['telefono'] = cleanLine('telefono', 40, false);
            $data['ubicacion'] = cleanLine('ubicacion', 160);
            $data['situacion_familiar'] = allowedValue('situacion_familiar', [
                'Individual',
                'Pareja',
                'Familia (2-3 personas)',
                'Familia (4+ personas)',
            ]);
            $data['motivacion'] = cleanText('motivacion', 5000);
            break;

        case 'colaborador':
            $data['area_experticia'] = allowedValue('area_experticia', [
                'Arquitectura',
                'Ingeniería',
                'Tecnología Blockchain',
                'Construcción 3D',
                'Sostenibilidad',
                'Gobernanza',
                'Otro',
            ]);
            $data['contribucion'] = cleanText('contribucion', 5000);
            break;

        case 'inversor':
            $data['telefono'] = cleanLine('telefono', 40, false);
            $data['tipo_inversion'] = allowedValue('tipo_inversion', [
                'Inversión de impacto',
                'Tokenización RWA',
                'Patrocinio',
                'Otro',
            ]);
            $data['mensaje'] = cleanText('mensaje', 5000, false);
            break;
    }

    [$subject, $body] = buildMessage($formName, $data, $siteUrl);

    $mail = new PHPMailer(true);
    $mail->isSMTP();
    $mail->Host = $smtpHost;
    $mail->Port = $smtpPort;
    $mail->SMTPAuth = true;
    $mail->Username = $smtpUser;
    $mail->Password = $smtpPassword;
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->CharSet = PHPMailer::CHARSET_UTF8;
    $mail->Timeout = 15;

    $mail->setFrom($smtpUser, $siteName);
    $mail->addAddress($mailTo);
    $mail->addReplyTo($email, $nombre);
    $mail->Subject = $subject;
    $mail->Body = $body;
    $mail->isHTML(false);
    $mail->send();

    writeAuditLog($storagePath, $appKey, $formName, 'sent', $email, $ipAddress);
    redirectTo('/gracias.html?form=' . rawurlencode($formName));
} catch (Throwable $exception) {
    $logKey = $appKey !== '' ? $appKey : 'temporary-log-key';
    writeAuditLog(
        $storagePath,
        $logKey,
        $formName !== '' ? $formName : 'unknown',
        'error',
        $email,
        $ipAddress,
        $exception->getMessage()
    );
    error_log('KonscioHousing form error: ' . $exception->getMessage());
    validationError('envio');
}
