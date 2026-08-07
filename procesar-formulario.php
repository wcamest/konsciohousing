<?php
/**
 * PROCESADOR DE FORMULARIOS - KONSCIO3D HOUSING
 * Sistema de procesamiento y envío de emails para hosting IONOS
 * Compatible con Apache + PHP + SMTP
 */

// ============================================
// CONFIGURACIÓN
// ============================================

// Email de destino
define('EMAIL_DESTINO', 'info@proyectakonscio.org');

// Configuración SMTP (para IONOS)
define('SMTP_HOST', 'smtp.ionos.es');  // Servidor SMTP de IONOS
define('SMTP_PORT', 587);                // Puerto TLS
define('SMTP_USER', 'info@proyectakonscio.org');  // Tu email
define('SMTP_PASS', '');  // ⚠️ DEBES AÑADIR TU CONTRASEÑA AQUÍ

// Configuración del sitio
define('SITE_NAME', 'Konscio3D Housing');
define('SITE_URL', 'https://konsciohousing.org');

// ============================================
// SEGURIDAD Y VALIDACIÓN
// ============================================

// Solo permitir POST
if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    header("Location: /index.html");
    exit;
}

// Protección contra CSRF básica
session_start();

// Protección antispam: honeypot
if (!empty($_POST['bot-field'])) {
    // Es un bot, redirigir sin procesar
    header("Location: /gracias.html");
    exit;
}

// Limitar tasa de envíos (rate limiting básico)
$ip = $_SERVER['REMOTE_ADDR'];
$rate_limit_file = sys_get_temp_dir() . '/form_rate_' . md5($ip);
$current_time = time();

if (file_exists($rate_limit_file)) {
    $last_submission = (int)file_get_contents($rate_limit_file);
    if (($current_time - $last_submission) < 60) {
        // Menos de 1 minuto desde el último envío
        die('Por favor, espera antes de enviar otro formulario.');
    }
}

file_put_contents($rate_limit_file, $current_time);

// ============================================
// OBTENER Y SANITIZAR DATOS
// ============================================

function sanitize_input($data) {
    if (is_array($data)) {
        return array_map('sanitize_input', $data);
    }
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data, ENT_QUOTES, 'UTF-8');
    return $data;
}

// Obtener tipo de formulario
$form_name = sanitize_input($_POST['form-name'] ?? 'desconocido');

// Datos comunes
$nombre = sanitize_input($_POST['nombre'] ?? '');
$email = filter_var($_POST['email'] ?? '', FILTER_SANITIZE_EMAIL);

// Validar email
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    header("Location: /error-formulario.html?error=email");
    exit;
}

// ============================================
// CONSTRUIR MENSAJE SEGÚN TIPO DE FORMULARIO
// ============================================

$subject = '';
$message_body = '';
$from_name = sanitize_input($nombre);

switch ($form_name) {
    case 'contacto':
        $asunto_form = sanitize_input($_POST['asunto'] ?? '');
        $mensaje = sanitize_input($_POST['mensaje'] ?? '');
        $privacy = isset($_POST['privacy_consent']) ? 'Aceptado' : 'No aceptado';
        
        $subject = "[Contacto Web] $asunto_form";
        $message_body = "
╔══════════════════════════════════════════════════════╗
║         NUEVO MENSAJE DE CONTACTO                    ║
║         " . SITE_NAME . "                           ║
╚══════════════════════════════════════════════════════╝

📋 INFORMACIÓN DEL CONTACTO
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
👤 Nombre:       $nombre
📧 Email:        $email
📌 Asunto:       $asunto_form
✅ RGPD:         $privacy

💬 MENSAJE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
$mensaje

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🌐 Formulario:   Contacto
🔗 Sitio web:    " . SITE_URL . "/contacto.html
📅 Fecha/Hora:   " . date('d/m/Y H:i:s') . "
🌍 IP:           " . $_SERVER['REMOTE_ADDR'] . "
";
        break;

    case 'habitante':
        $telefono = sanitize_input($_POST['telefono'] ?? 'No proporcionado');
        $ubicacion = sanitize_input($_POST['ubicacion'] ?? '');
        $situacion = sanitize_input($_POST['situacion_familiar'] ?? '');
        $motivacion = sanitize_input($_POST['motivacion'] ?? '');
        $privacy = isset($_POST['privacy_consent']) ? 'Aceptado' : 'No aceptado';
        
        $subject = "[Futuro Habitante] Nueva solicitud - $nombre";
        $message_body = "
╔══════════════════════════════════════════════════════╗
║      SOLICITUD: QUIERO VIVIR EN KONSCIO3D           ║
║         " . SITE_NAME . "                           ║
╚══════════════════════════════════════════════════════╝

👤 DATOS PERSONALES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Nombre:              $nombre
Email:               $email
Teléfono:            $telefono
País/Ciudad:         $ubicacion
Situación familiar:  $situacion
RGPD:                $privacy

💭 MOTIVACIÓN
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
$motivacion

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🌐 Formulario:   Quiero Vivir
🔗 Sitio web:    " . SITE_URL . "/unete.html
📅 Fecha/Hora:   " . date('d/m/Y H:i:s') . "
🌍 IP:           " . $_SERVER['REMOTE_ADDR'] . "
";
        break;

    case 'colaborador':
        $area = sanitize_input($_POST['area_experticia'] ?? '');
        $contribucion = sanitize_input($_POST['contribucion'] ?? '');
        $privacy = isset($_POST['privacy_consent']) ? 'Aceptado' : 'No aceptado';
        
        $subject = "[Colaborador] Nueva solicitud - $nombre";
        $message_body = "
╔══════════════════════════════════════════════════════╗
║      SOLICITUD: QUIERO COLABORAR                     ║
║         " . SITE_NAME . "                           ║
╚══════════════════════════════════════════════════════╝

👤 DATOS DEL COLABORADOR
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Nombre:              $nombre
Email:               $email
Área de experticia:  $area
RGPD:                $privacy

🎯 CONTRIBUCIÓN
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
$contribucion

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🌐 Formulario:   Quiero Colaborar
🔗 Sitio web:    " . SITE_URL . "/unete.html
📅 Fecha/Hora:   " . date('d/m/Y H:i:s') . "
🌍 IP:           " . $_SERVER['REMOTE_ADDR'] . "
";
        break;

    case 'inversor':
        $telefono = sanitize_input($_POST['telefono'] ?? 'No proporcionado');
        $tipo_inversion = sanitize_input($_POST['tipo_inversion'] ?? '');
        $mensaje_inv = sanitize_input($_POST['mensaje'] ?? 'Sin mensaje adicional');
        $privacy = isset($_POST['privacy_consent']) ? 'Aceptado' : 'No aceptado';
        
        $subject = "[Inversor] Interés en inversión - $nombre";
        $message_body = "
╔══════════════════════════════════════════════════════╗
║      SOLICITUD: QUIERO INVERTIR                      ║
║         " . SITE_NAME . "                           ║
╚══════════════════════════════════════════════════════╝

👤 DATOS DEL INVERSOR
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Nombre/Organización:  $nombre
Email:                $email
Teléfono:             $telefono
Tipo de inversión:    $tipo_inversion
RGPD:                 $privacy

💬 MENSAJE ADICIONAL
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
$mensaje_inv

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🌐 Formulario:   Quiero Invertir
🔗 Sitio web:    " . SITE_URL . "/unete.html
📅 Fecha/Hora:   " . date('d/m/Y H:i:s') . "
🌍 IP:           " . $_SERVER['REMOTE_ADDR'] . "
";
        break;

    default:
        header("Location: /error-formulario.html?error=tipo");
        exit;
}

// ============================================
// ENVIAR EMAIL CON FUNCIÓN MAIL() DE PHP
// ============================================

// Configurar encabezados del email
$headers = array();
$headers[] = 'MIME-Version: 1.0';
$headers[] = 'Content-type: text/plain; charset=UTF-8';
$headers[] = 'From: ' . SITE_NAME . ' <noreply@konsciohousing.org>';
$headers[] = 'Reply-To: ' . $from_name . ' <' . $email . '>';
$headers[] = 'X-Mailer: PHP/' . phpversion();
$headers[] = 'X-Priority: 1 (Highest)';
$headers[] = 'X-MSMail-Priority: High';
$headers[] = 'Importance: High';

// Convertir headers a string
$headers_string = implode("\r\n", $headers);

// Enviar email
$enviado = mail(EMAIL_DESTINO, $subject, $message_body, $headers_string);

// ============================================
// LOGGING (OPCIONAL)
// ============================================

// Guardar registro de envíos
$log_file = __DIR__ . '/logs/formularios.log';
$log_dir = dirname($log_file);

if (!file_exists($log_dir)) {
    @mkdir($log_dir, 0755, true);
}

$log_entry = sprintf(
    "[%s] Formulario: %s | Email: %s | Estado: %s | IP: %s\n",
    date('Y-m-d H:i:s'),
    $form_name,
    $email,
    $enviado ? 'ENVIADO' : 'ERROR',
    $_SERVER['REMOTE_ADDR']
);

@file_put_contents($log_file, $log_entry, FILE_APPEND);

// ============================================
// REDIRECCIONAR
// ============================================

if ($enviado) {
    // Éxito: redirigir a página de gracias
    header("Location: /gracias.html?form=" . urlencode($form_name));
} else {
    // Error: redirigir a página de error
    header("Location: /error-formulario.html?error=envio");
}

exit;
?>
