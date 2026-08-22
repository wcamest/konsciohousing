# 🚀 GUÍA COMPLETA: MIGRACIÓN A IONOS VPS

## ✅ PROYECTO ADAPTADO PARA IONOS

**Versión:** 7.0.0 - IONOS READY  
**Fecha:** 24 de julio de 2026  
**Estado:** ✅ Listo para producción en IONOS VPS

---

## 📋 CAMBIOS REALIZADOS

### ❌ ELIMINADO (Dependencias de Netlify):

1. **Carpeta `/admin/`** - CMS Decap (requería Netlify Identity)
2. **Archivo `test-formulario-netlify.html`** - Test específico de Netlify
3. **Atributos Netlify en formularios**:
   - `data-netlify="true"`
   - `netlify-honeypot="bot-field"`
   - Etiquetas `<p>` con honeypot visible
4. **Lógica JavaScript de detección Netlify** en `main.js`

### ✅ AÑADIDO (Sistema PHP para IONOS):

1. **`procesar-formulario.php`** (9 KB)
   - Procesamiento de 4 formularios
   - Sistema antispam (honeypot + rate limiting)
   - Envío de emails con formato profesional
   - Validación de datos
   - Logging de envíos
   - Compatible con función `mail()` de PHP

2. **`error-formulario.html`** (11 KB)
   - Página de error personalizada
   - Detección de tipos de error
   - Información de contacto directo

3. **`.htaccess`** (6 KB)
   - Configuración Apache optimizada
   - Redirección www → non-www
   - Forzar HTTPS
   - Compresión GZIP
   - Cache de navegador
   - Cabeceras de seguridad
   - Protección de archivos sensibles

4. **`404.html`** (9 KB)
   - Página 404 personalizada
   - Enlaces rápidos a secciones principales

### ✏️ MODIFICADO:

1. **`contacto.html`** - Formulario actualizado para PHP
2. **`unete.html`** - 3 formularios actualizados para PHP
3. **`js/main.js`** - JavaScript simplificado sin lógica Netlify

---

## 📦 ARCHIVOS DEL PROYECTO

### Estructura Completa:

```
konsciohousing-ionos/
├── .htaccess                           ← NUEVO: Configuración Apache
├── 404.html                            ← NUEVO: Página 404
├── procesar-formulario.php             ← NUEVO: Procesador PHP
├── error-formulario.html               ← NUEVO: Página de error
├── index.html
├── el-proyecto.html
├── quienes-somos.html
├── modelo-piloto.html
├── tecnologia.html
├── vision-futuro.html
├── notikonscio.html
├── noticia-detalle.html
├── unete.html                          ← MODIFICADO
├── contacto.html                       ← MODIFICADO
├── gracias.html
├── politica-privacidad.html
├── aviso-legal.html
├── politica-cookies.html
├── sitemap.xml
├── robots.txt
├── css/
│   ├── style.css
│   ├── legal-styles.css
│   └── chatbot.css
├── js/
│   ├── main.js                         ← MODIFICADO
│   ├── chatbot.js
│   └── noticias-loader.js
├── images/
│   └── [todas las imágenes]
├── _posts/                             ← Noticias en Markdown
│   ├── 2026-03-10-lanzamiento-oficial-konscio3d-housing.md
│   └── 2026-04-15-tecnologia-blockchain-gobernanza-comunitaria.md
└── logs/                               ← Se creará automáticamente
    └── formularios.log
```

---

## 🛠️ PASOS DE INSTALACIÓN EN IONOS

### PASO 1: Preparar el VPS (Si aún no está configurado)

#### 1.1 Conectar por SSH

```bash
ssh usuario@tu-vps-ionos.com
```

#### 1.2 Actualizar Sistema

```bash
sudo apt update
sudo apt upgrade -y
```

#### 1.3 Instalar Apache + PHP

```bash
# Instalar Apache
sudo apt install apache2 -y

# Instalar PHP y módulos necesarios
sudo apt install php libapache2-mod-php php-cli php-curl php-mbstring -y

# Habilitar módulos de Apache
sudo a2enmod rewrite
sudo a2enmod headers
sudo a2enmod expires
sudo a2enmod deflate

# Reiniciar Apache
sudo systemctl restart apache2
```

#### 1.4 Verificar Instalación

```bash
# Verificar Apache
sudo systemctl status apache2

# Verificar PHP
php -v
```

---

### PASO 2: Configurar Virtual Host

#### 2.1 Crear Archivo de Configuración

```bash
sudo nano /etc/apache2/sites-available/konsciohousing.org.conf
```

#### 2.2 Añadir Configuración:

```apache
<VirtualHost *:80>
    ServerName konsciohousing.org
    ServerAlias www.konsciohousing.org
    ServerAdmin info@proyectakonscio.org
    
    DocumentRoot /var/www/konsciohousing.org
    
    <Directory /var/www/konsciohousing.org>
        Options -Indexes +FollowSymLinks
        AllowOverride All
        Require all granted
    </Directory>
    
    # Logs
    ErrorLog ${APACHE_LOG_DIR}/konsciohousing-error.log
    CustomLog ${APACHE_LOG_DIR}/konsciohousing-access.log combined
</VirtualHost>
```

#### 2.3 Habilitar Sitio

```bash
# Crear directorio
sudo mkdir -p /var/www/konsciohousing.org

# Habilitar sitio
sudo a2ensite konsciohousing.org.conf

# Deshabilitar sitio por defecto
sudo a2dissite 000-default.conf

# Recargar Apache
sudo systemctl reload apache2
```

---

### PASO 3: Subir Archivos del Proyecto

#### Opción A: Por FTP/SFTP (Más Fácil)

1. **Usa FileZilla o WinSCP**:
   - Host: `tu-vps-ionos.com`
   - Puerto: `22` (SFTP)
   - Usuario: `tu-usuario`
   - Contraseña: `tu-contraseña`

2. **Sube todos los archivos a**: `/var/www/konsciohousing.org/`

3. **Estructura final**:
   ```
   /var/www/konsciohousing.org/
   ├── .htaccess
   ├── index.html
   ├── procesar-formulario.php
   ├── [resto de archivos...]
   ```

#### Opción B: Por SSH (Más Rápido)

```bash
# En tu PC local, comprimir proyecto
cd /ruta/del/proyecto
zip -r konsciohousing.zip . -x "*.git*" -x "node_modules/*" -x "*.DS_Store"

# Subir por SCP
scp konsciohousing.zip usuario@tu-vps:/tmp/

# En el servidor, descomprimir
ssh usuario@tu-vps
cd /var/www/konsciohousing.org
sudo unzip /tmp/konsciohousing.zip
sudo rm /tmp/konsciohousing.zip
```

---

### PASO 4: Configurar Permisos

```bash
# Dueño de archivos
sudo chown -R www-data:www-data /var/www/konsciohousing.org

# Permisos de archivos
sudo find /var/www/konsciohousing.org -type f -exec chmod 644 {} \;

# Permisos de directorios
sudo find /var/www/konsciohousing.org -type d -exec chmod 755 {} \;

# Permisos especiales para PHP
sudo chmod 755 /var/www/konsciohousing.org/procesar-formulario.php

# Crear carpeta de logs con permisos de escritura
sudo mkdir -p /var/www/konsciohousing.org/logs
sudo chown www-data:www-data /var/www/konsciohousing.org/logs
sudo chmod 755 /var/www/konsciohousing.org/logs
```

---

### PASO 5: Configurar Email en IONOS

#### 5.1 Crear Buzón de Correo

1. **Panel de IONOS** → Email & Office → Email
2. **Crear dirección**: `info@proyectakonscio.org`
3. **Asignar contraseña** fuerte

#### 5.2 Configurar SPF (Prevenir Spam)

En la configuración DNS de tu dominio:

```
Tipo: TXT
Nombre: @
Valor: v=spf1 include:_spf.ionos.com ~all
TTL: 3600
```

#### 5.3 Verificar Función mail() de PHP

```bash
# Crear archivo de prueba
sudo nano /var/www/konsciohousing.org/test-email.php
```

Contenido:

```php
<?php
$to = "tu-email-personal@gmail.com";
$subject = "Test desde IONOS";
$message = "Si recibes este email, la función mail() funciona correctamente.";
$headers = "From: noreply@konsciohousing.org\r\n";

if (mail($to, $subject, $message, $headers)) {
    echo "Email enviado correctamente";
} else {
    echo "Error al enviar email";
}
?>
```

Accede a: `https://konsciohousing.org/test-email.php`

**⚠️ ELIMINAR después de probar:**
```bash
sudo rm /var/www/konsciohousing.org/test-email.php
```

---

### PASO 6: Instalar Certificado SSL (Let's Encrypt)

```bash
# Instalar Certbot
sudo apt install certbot python3-certbot-apache -y

# Obtener certificado
sudo certbot --apache -d konsciohousing.org -d www.konsciohousing.org

# Seguir instrucciones:
# 1. Ingresa email: info@proyectakonscio.org
# 2. Acepta términos: (A)gree
# 3. Redirección HTTPS: 2 (Redirect)

# Verificar renovación automática
sudo certbot renew --dry-run
```

#### 6.2 Verificar HTTPS

Accede a: `https://konsciohousing.org`

El candado verde debe aparecer en el navegador.

---

### PASO 7: Configurar DNS del Dominio

En tu proveedor de dominio (o en IONOS si transferiste el dominio):

```
Tipo    Nombre    Valor                    TTL
--------------------------------------------------
A       @         [IP-DE-TU-VPS]          3600
A       www       [IP-DE-TU-VPS]          3600
MX      @         mail.konsciohousing.org 10
TXT     @         v=spf1 include:_spf.ionos.com ~all  3600
```

**Obtener IP del VPS:**
```bash
curl ifconfig.me
```

---

### PASO 8: Configurar Contraseña SMTP en PHP

#### 8.1 Editar procesar-formulario.php

```bash
sudo nano /var/www/konsciohousing.org/procesar-formulario.php
```

#### 8.2 Buscar Línea 15 y Añadir Contraseña:

```php
define('SMTP_PASS', 'TU_CONTRASEÑA_AQUI');  // ⚠️ AÑADIR CONTRASEÑA
```

**⚠️ IMPORTANTE**: Si usas la función `mail()` de PHP (por defecto), NO necesitas configurar SMTP. La contraseña es solo si decides usar SMTP más adelante.

---

### PASO 9: Probar Formularios

#### 9.1 Probar Formulario de Contacto

1. Ve a: `https://konsciohousing.org/contacto.html`
2. Rellena el formulario
3. Click en "Enviar Mensaje"
4. Deberías ser redirigido a `/gracias.html`

#### 9.2 Verificar Email

Revisa `info@proyectakonscio.org` (y carpeta de spam).

#### 9.3 Verificar Logs

```bash
sudo tail -f /var/www/konsciohousing.org/logs/formularios.log
```

---

### PASO 10: Optimizaciones Finales

#### 10.1 Habilitar Cache de OPcache (PHP)

```bash
sudo nano /etc/php/8.1/apache2/php.ini
```

Añadir/modificar:

```ini
opcache.enable=1
opcache.memory_consumption=128
opcache.interned_strings_buffer=8
opcache.max_accelerated_files=4000
opcache.revalidate_freq=60
```

Reiniciar Apache:

```bash
sudo systemctl restart apache2
```

#### 10.2 Configurar Firewall

```bash
# Instalar UFW si no está
sudo apt install ufw -y

# Permitir SSH
sudo ufw allow 22/tcp

# Permitir HTTP y HTTPS
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp

# Habilitar firewall
sudo ufw enable

# Verificar estado
sudo ufw status
```

---

## 🧪 CHECKLIST DE VERIFICACIÓN

### Antes de Dar por Terminado:

- [ ] Apache corriendo: `sudo systemctl status apache2`
- [ ] PHP funcionando: `php -v`
- [ ] Archivos subidos a `/var/www/konsciohousing.org/`
- [ ] Permisos correctos: `ls -la /var/www/konsciohousing.org/`
- [ ] Virtual host configurado y habilitado
- [ ] DNS apuntando a IP del VPS (esperar 24-48h propagación)
- [ ] Certificado SSL instalado y funcionando
- [ ] Acceso a `https://konsciohousing.org` (candado verde)
- [ ] Email `info@proyectakonscio.org` creado en IONOS
- [ ] SPF configurado en DNS
- [ ] Contraseña en `procesar-formulario.php` (si usas SMTP)
- [ ] Formulario de contacto probado
- [ ] Email recibido en `info@proyectakonscio.org`
- [ ] Logs generándose en `/logs/formularios.log`
- [ ] Página 404 personalizada funcionando
- [ ] Todas las páginas cargan correctamente
- [ ] Imágenes, CSS y JS cargan sin errores
- [ ] Noticias en Notikonscio se muestran
- [ ] Chatbot de WhatsApp funciona

---

## ⚙️ MANTENIMIENTO

### Actualizar Contenido (Noticias)

#### Opción 1: Editar Archivos Markdown Directamente

```bash
# Conectar por SSH
ssh usuario@tu-vps

# Editar noticia existente
sudo nano /var/www/konsciohousing.org/_posts/2026-03-10-lanzamiento-oficial.md

# Crear nueva noticia
sudo nano /var/www/konsciohousing.org/_posts/2026-08-15-nueva-noticia.md
```

Formato del archivo:

```markdown
---
titulo: "Título de la Noticia"
fecha: 2026-08-15
autor: "Fundación Proyecta"
categoria: "Proyecto"
imagen: "/images/noticias/imagen.jpg"
resumen: "Breve descripción..."
destacada: false
tags:
  - tag1
  - tag2
---

# Contenido de la noticia

Texto en Markdown...
```

#### Opción 2: Usar FTP/SFTP

1. Conectar con FileZilla
2. Ir a `/_posts/`
3. Subir archivos `.md` nuevos
4. Las noticias aparecerán automáticamente

### Revisar Logs de Formularios

```bash
# Ver últimos envíos
sudo tail -n 50 /var/www/konsciohousing.org/logs/formularios.log

# Ver en tiempo real
sudo tail -f /var/www/konsciohousing.org/logs/formularios.log
```

### Renovar Certificado SSL

```bash
# Renovar manualmente (si es necesario)
sudo certbot renew

# Verificar próxima renovación
sudo certbot certificates
```

---

## 🆘 SOLUCIÓN DE PROBLEMAS

### Problema: "Internal Server Error" (Error 500)

**Solución:**

```bash
# Ver logs de Apache
sudo tail -f /var/log/apache2/konsciohousing-error.log

# Verificar sintaxis .htaccess
sudo apachectl configtest

# Verificar permisos PHP
ls -la /var/www/konsciohousing.org/procesar-formulario.php
```

### Problema: Formularios No Envían Emails

**Solución:**

```bash
# 1. Verificar que procesar-formulario.php es ejecutable
sudo chmod 755 /var/www/konsciohousing.org/procesar-formulario.php

# 2. Ver logs de PHP
sudo tail -f /var/log/apache2/error.log

# 3. Probar función mail()
php -r "mail('tu@email.com', 'Test', 'Contenido');"

# 4. Verificar configuración PHP
php -i | grep sendmail_path
```

### Problema: CSS/JS No Cargan

**Solución:**

```bash
# Verificar permisos de carpetas
sudo chmod 755 /var/www/konsciohousing.org/css
sudo chmod 755 /var/www/konsciohousing.org/js

# Verificar permisos de archivos
sudo chmod 644 /var/www/konsciohousing.org/css/*.css
sudo chmod 644 /var/www/konsciohousing.org/js/*.js

# Limpiar cache de Apache
sudo systemctl restart apache2
```

### Problema: Noticias No Aparecen

**Solución:**

```bash
# Verificar que archivos .md existen
ls -la /var/www/konsciohousing.org/_posts/

# Verificar permisos
sudo chmod 644 /var/www/konsciohousing.org/_posts/*.md

# Ver errores en consola del navegador (F12)
```

---

## 📞 SOPORTE

### Recursos:

- **Documentación Apache**: https://httpd.apache.org/docs/
- **Documentación PHP**: https://www.php.net/manual/es/
- **Soporte IONOS**: https://www.ionos.es/ayuda/

### Contacto:

- **Email**: info@proyectakonscio.org
- **Teléfono**: +34 697 318 741

---

## ✅ PROYECTO LISTO PARA PRODUCCIÓN

El proyecto está **100% adaptado para IONOS VPS** y no tiene dependencias de Netlify.

**Próximo paso:** Seguir esta guía para instalar en tu servidor IONOS.

---

**Versión:** 7.0.0  
**Fecha:** 24 de julio de 2026  
**Estado:** ✅ Production Ready
