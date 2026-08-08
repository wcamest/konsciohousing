# Despliegue de Konscio3D Housing en el VPS

Este paquete está preparado para `/var/www/konsciohousing.org` y utiliza:

- Apache con `DocumentRoot /var/www/konsciohousing.org/public`.
- PHP 8.2 o superior.
- PHPMailer mediante SMTP autenticado de IONOS.
- Configuración secreta en `.env`, fuera de la carpeta pública.
- Registros sin datos personales en `storage/logs`.

## 1. Copiar el paquete

Descomprime el ZIP y copia el contenido de la carpeta `konsciohousing-production`
en `/var/www/konsciohousing.org`. No reemplaces el archivo `.env` de una instalación
que ya esté configurada.

## 2. Instalar dependencias

Desde la raíz del proyecto:

```bash
cd /var/www/konsciohousing.org
COMPOSER_ALLOW_SUPERUSER=1 composer install --no-dev --optimize-autoloader
```

Composer generará `vendor/` y `composer.lock`.

## 3. Crear la configuración privada

```bash
cd /var/www/konsciohousing.org
cp .env.example .env
openssl rand -hex 32
nano .env
```

Copia el resultado de `openssl rand -hex 32` en `APP_KEY` y escribe en
`SMTP_PASS` la contraseña real del buzón `info@proyectakonscio.org`.
No añadas espacios alrededor del signo `=` y conserva las comillas.

Protege el archivo:

```bash
chown root:www-data /var/www/konsciohousing.org/.env
chmod 640 /var/www/konsciohousing.org/.env
```

## 4. Aplicar permisos

```bash
chown -R root:www-data /var/www/konsciohousing.org/public /var/www/konsciohousing.org/vendor
find /var/www/konsciohousing.org/public -type d -exec chmod 755 {} \;
find /var/www/konsciohousing.org/public -type f -exec chmod 644 {} \;
chown -R www-data:www-data /var/www/konsciohousing.org/storage
find /var/www/konsciohousing.org/storage -type d -exec chmod 750 {} \;
find /var/www/konsciohousing.org/storage -type f -exec chmod 640 {} \;
```

## 5. Activar la configuración de seguridad de Apache

```bash
cp /var/www/konsciohousing.org/apache/konsciohousing-security.conf /etc/apache2/conf-available/konsciohousing-security.conf
a2enmod headers
a2enconf konsciohousing-security
apache2ctl configtest
systemctl reload apache2
```

## 6. Comprobar

```bash
curl -I https://konsciohousing.org
curl -I https://www.konsciohousing.org
tail -f /var/www/konsciohousing.org/storage/logs/formularios.log
```

Envía después una prueba desde cada uno de los cuatro formularios. El remitente
SMTP será `info@proyectakonscio.org` y el correo del visitante quedará como
`Reply-To`.

## Seguridad

- No subas `.env` a repositorios ni lo guardes dentro de `public/`.
- No copies al servidor el antiguo `procesar-formulario.php` basado en `mail()`.
- Si activas 2FA en el correo de IONOS, sustituye `SMTP_PASS` por una contraseña
  de aplicación.
- Los archivos de documentación y prueba del deploy original no forman parte de
  este paquete de producción.
