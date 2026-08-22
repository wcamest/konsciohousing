# 📝 GUÍA COMPLETA: CMS Y FORMULARIOS - Konscio3D Housing

## 🎯 Resumen de Cambios Implementados

### ✅ PARTE 1: Sistema de Formularios con Netlify Forms

**Estado**: ✅ **Completamente implementado**

#### Formularios Configurados:
1. **Contacto** (`contacto.html`) - Consultas generales
2. **Quiero Vivir** (`unete.html`) - Futuros habitantes
3. **Quiero Colaborar** (`unete.html`) - Colaboradores expertos
4. **Quiero Invertir** (`unete.html`) - Inversores interesados

#### Características:
- ✅ Integración con Netlify Forms (incluida en plan gratuito)
- ✅ Protección anti-spam con honeypot
- ✅ Validación GDPR con checkbox obligatorio
- ✅ Página de confirmación profesional (`gracias.html`)
- ✅ Todos los campos tienen atributo `name` para captura de datos

---

### ✅ PARTE 2: Sistema CMS para Notikonscio con Decap CMS

**Estado**: ✅ **Completamente implementado** (requiere configuración en Netlify)

#### Archivos Creados:
- `admin/config.yml` - Configuración del CMS
- `admin/index.html` - Panel de administración
- `js/noticias-loader.js` - Procesador de Markdown
- `_posts/` - Carpeta para noticias (incluye 2 ejemplos)
- `gracias.html` - Página de confirmación de formularios

#### Archivos Modificados:
- `notikonscio.html` - Ahora lee noticias desde Markdown
- `noticia-detalle.html` - Ahora carga detalles desde Markdown
- `contacto.html` - Formulario con Netlify Forms
- `unete.html` - 3 formularios con Netlify Forms
- Archivos legales - Correo actualizado a `info@proyectakonscio.org`

---

## 🚀 PASOS DE CONFIGURACIÓN (DEBES REALIZAR TÚ)

### PASO 1: Subir el Proyecto a GitHub

**¿Por qué?**: Decap CMS requiere un repositorio Git para guardar las noticias.

#### Instrucciones:

1. **Crea una cuenta en GitHub** (si no tienes): https://github.com/signup

2. **Crea un nuevo repositorio**:
   - Ve a https://github.com/new
   - Nombre: `konscio3d-housing`
   - Privacidad: Público o Privado (tú decides)
   - NO marques "Add a README file"
   - Click en "Create repository"

3. **Sube tu proyecto**:
   
   **Opción A: Usando GitHub Desktop (más fácil)**
   - Descarga GitHub Desktop: https://desktop.github.com/
   - Instálalo y login con tu cuenta
   - File → Add Local Repository
   - Selecciona la carpeta de tu proyecto
   - Publish repository

   **Opción B: Usando línea de comandos**
   ```bash
   cd /ruta/a/tu/proyecto
   git init
   git add .
   git commit -m "Initial commit - Konscio3D Housing"
   git branch -M main
   git remote add origin https://github.com/TU-USUARIO/konscio3d-housing.git
   git push -u origin main
   ```

---

### PASO 2: Conectar Netlify con GitHub

1. **Ve a Netlify Dashboard**: https://app.netlify.com/

2. **Elimina el sitio actual** (que subiste con ZIP):
   - Ve a tu sitio actual
   - Site settings → General → Danger zone → Delete this site

3. **Crea nuevo sitio desde GitHub**:
   - Click en "Add new site" → "Import an existing project"
   - Selecciona "Deploy with GitHub"
   - Autoriza a Netlify acceder a tus repositorios
   - Selecciona el repositorio `konscio3d-housing`
   - Build settings:
     - Branch to deploy: `main`
     - Build command: (dejar vacío)
     - Publish directory: `/` (raíz)
   - Click en "Deploy site"

4. **Espera el deployment** (1-2 minutos)
   - Netlify asignará una URL temporal como `https://random-name-123456.netlify.app`

---

### PASO 3: Activar Netlify Identity (Autenticación)

**¿Para qué?**: Permite que tú y tus colaboradores accedan al panel CMS de forma segura.

1. **En el Dashboard de tu sitio en Netlify**:
   - Ve a `Site configuration` → `Identity`
   - Click en "Enable Identity"

2. **Configurar servicios externos**:
   - Scroll hasta "External providers"
   - Habilita **Google** o **GitHub** (recomendado)
   - Esto permite login con cuenta de Google

3. **Configurar Git Gateway**:
   - Ve a `Site configuration` → `Identity` → `Services`
   - Click en "Enable Git Gateway"
   - Esto permite que el CMS guarde noticias en GitHub

4. **Invitarte a ti mismo**:
   - Ve a `Site configuration` → `Identity` → `Users`
   - Click en "Invite users"
   - Ingresa tu email (el que usarás para administrar)
   - Recibirás un email de invitación
   - Click en el link y crea tu contraseña

---

### PASO 4: Configurar Netlify Forms (Notificaciones por Email)

**¿Para qué?**: Recibir emails cuando alguien envíe un formulario.

1. **En el Dashboard de tu sitio en Netlify**:
   - Ve a `Site configuration` → `Forms`
   - Los 4 formularios deberían aparecer automáticamente tras el primer deploy

2. **Configurar notificaciones**:
   - Click en uno de los formularios (ej: "contacto")
   - Ve a la pestaña "Form notifications"
   - Click en "Add notification" → "Email notification"
   - Email to notify: `info@proyectakonscio.org`
   - Repite para los otros 3 formularios

3. **Configurar reenvío desde `info@proyectakonscio.org` a Gmail**:
   - Esto debes hacerlo en el **panel de tu proveedor de email/hosting**
   - Busca opciones como "Email forwarding" o "Reenvío de correo"
   - Crea regla: `info@proyectakonscio.org` → `tugmail@gmail.com`

---

### PASO 5: Actualizar Configuración del CMS

Después de conectar GitHub, debes editar un archivo:

1. **Edita `admin/config.yml` en GitHub**:
   - Ve a tu repositorio en GitHub
   - Navega a `admin/config.yml`
   - Click en el ícono del lápiz (Edit)
   
2. **Actualiza las URLs**:
   ```yaml
   # Al final del archivo, cambia estas líneas:
   site_url: https://TU-SITIO.netlify.app
   display_url: https://TU-SITIO.netlify.app
   ```
   Reemplaza `TU-SITIO` con tu URL real de Netlify

3. **Guarda cambios** (Commit changes)

---

### PASO 6: Acceder al CMS por Primera Vez

1. **Abre tu sitio**: `https://tu-sitio.netlify.app/admin/`

2. **Login**:
   - Click en "Login with Netlify Identity"
   - Ingresa con el email que invitaste

3. **¡Ya puedes publicar noticias!** 🎉

---

## 📚 CÓMO USAR EL CMS PARA PUBLICAR NOTICIAS

### Publicar Nueva Noticia

1. **Accede al panel**: `https://tu-sitio.netlify.app/admin/`

2. **Click en "Noticias"** (en el menú lateral)

3. **Click en "New Noticias"**

4. **Completa el formulario**:
   - **Título**: El título de la noticia
   - **Fecha de Publicación**: Selecciona fecha con el calendario
   - **Autor**: Tu nombre o "Fundación Proyecta"
   - **Categoría**: Selecciona una (Proyecto, Tecnología, Comunidad, etc.)
   - **Imagen Principal**: Click en "Choose an image" para subir foto
   - **Resumen**: Breve descripción (máx. 200 caracteres)
   - **Contenido Completo**: Escribe el artículo completo
     - Soporta formato Markdown:
       - `# Título grande`
       - `## Título mediano`
       - `**negrita**`
       - `[link](https://ejemplo.com)`
       - `- Lista con viñetas`
   - **Etiquetas**: Palabras clave separadas por Enter
   - **Destacada**: Marcar si quieres que aparezca primero

5. **Click en "Save"** (arriba a la derecha)

6. **Publicar**:
   - El borrador se guarda en "Workflow"
   - Click en "Publish" → "Publish now"
   - La noticia se guardará en GitHub
   - En 1-2 minutos aparecerá en tu sitio

### Editar Noticia Existente

1. Ve a "Noticias" en el panel
2. Click en la noticia que quieres editar
3. Realiza cambios
4. Save → Publish

### Eliminar Noticia

1. Ve a "Noticias" en el panel
2. Click en la noticia
3. Click en "Delete entry" (arriba)
4. Confirma

---

## 👥 INVITAR COLABORADORES AL CMS

Para que otros puedan publicar noticias:

1. **En Netlify Dashboard**:
   - Ve a `Site configuration` → `Identity` → `Users`
   - Click en "Invite users"
   - Ingresa el email del colaborador
   - Envía invitación

2. **El colaborador**:
   - Recibirá email de invitación
   - Creará su contraseña
   - Podrá acceder a `https://tu-sitio.netlify.app/admin/`

---

## 📧 VERIFICAR QUE LOS FORMULARIOS FUNCIONEN

### Prueba Manual

1. **Abre tu sitio**: `https://tu-sitio.netlify.app/contacto.html`

2. **Completa el formulario de contacto**:
   - Rellena todos los campos
   - Marca checkbox GDPR
   - Click en "Enviar Mensaje"

3. **Deberías**:
   - Ser redirigido a `/gracias.html`
   - Ver mensaje de confirmación

4. **En Netlify Dashboard**:
   - Ve a `Site configuration` → `Forms`
   - Click en "contacto"
   - Deberías ver el envío en la lista

5. **En tu email** (`info@proyectakonscio.org`):
   - Deberías recibir notificación de Netlify
   - Con todos los datos del formulario

---

## ⚠️ PROBLEMAS COMUNES Y SOLUCIONES

### ❌ "No aparece el panel /admin/"

**Solución**:
- Verifica que los archivos `admin/config.yml` y `admin/index.html` estén en GitHub
- Verifica que el sitio haya hecho deploy exitoso en Netlify
- Limpia caché del navegador (Ctrl+Shift+Delete)

### ❌ "Login with Netlify Identity no funciona"

**Solución**:
- Verifica que activaste Netlify Identity en paso 3
- Verifica que habilitaste Git Gateway
- Verifica que te invitaste a ti mismo

### ❌ "Las noticias no aparecen en el sitio"

**Solución**:
- Verifica que publicaste la noticia (no solo guardaste)
- Espera 1-2 minutos para que GitHub y Netlify sincronicen
- Abre consola del navegador (F12) y busca errores
- Verifica que el archivo `.md` esté en la carpeta `_posts` en GitHub

### ❌ "Los formularios no envían datos"

**Solución**:
- Verifica que el sitio esté desplegado desde GitHub (no ZIP)
- Verifica que los formularios tengan el atributo `data-netlify="true"`
- Envía un formulario de prueba
- Ve a Netlify Dashboard → Forms y busca el envío

### ❌ "No recibo emails de notificación"

**Solución**:
- Verifica configuración en Netlify Dashboard → Forms → Form notifications
- Verifica que el email `info@proyectakonscio.org` esté correctamente escrito
- Revisa carpeta de SPAM
- Verifica que el reenvío a Gmail esté configurado en tu hosting

---

## 🎨 PERSONALIZAR EL CMS (OPCIONAL)

### Cambiar Categorías Disponibles

Edita `admin/config.yml`:

```yaml
- { label: "Categoría", name: "categoria", widget: "select", 
    options: ["Proyecto", "Tecnología", "Comunidad", "Sostenibilidad", "Eventos", "Innovación", "TU-NUEVA-CATEGORIA"] 
  }
```

### Cambiar Ruta de Imágenes

Edita `admin/config.yml`:

```yaml
media_folder: "images/noticias" # Carpeta donde se guardan
public_folder: "/images/noticias" # URL pública
```

---

## 📊 LÍMITES DEL PLAN GRATUITO DE NETLIFY

- ✅ **Formularios**: 100 envíos/mes gratis
- ✅ **Identity**: 1,000 usuarios gratis
- ✅ **Bandwidth**: 100 GB/mes gratis
- ✅ **Build minutes**: 300 minutos/mes gratis

Si necesitas más, el plan **Pro** cuesta $19/mes.

---

## 🔐 SEGURIDAD

### El CMS está protegido
- Solo usuarios invitados pueden acceder
- Requiere autenticación con Netlify Identity
- Las noticias se guardan en GitHub (versionado completo)

### Los formularios están protegidos
- Honeypot anti-spam incluido
- Validación GDPR obligatoria
- Los datos se guardan en Netlify (cifrado)

---

## ✅ CHECKLIST FINAL

Antes de dar por terminado, verifica:

- [ ] Proyecto subido a GitHub
- [ ] Netlify conectado a GitHub (no ZIP)
- [ ] Netlify Identity activado
- [ ] Git Gateway habilitado
- [ ] Te invitaste como usuario
- [ ] Puedes acceder a `/admin/`
- [ ] Puedes publicar una noticia de prueba
- [ ] La noticia aparece en Notikonscio
- [ ] Notificaciones de formularios configuradas
- [ ] Email `info@proyectakonscio.org` recibe notificaciones
- [ ] Reenvío a Gmail configurado
- [ ] Probaste los 4 formularios

---

## 📞 CONTACTO DE EMERGENCIA

Si tienes problemas técnicos:

- 📧 **Soporte Netlify**: https://answers.netlify.com/
- 📘 **Documentación Decap CMS**: https://decapcms.org/docs/
- 📘 **Documentación Netlify Forms**: https://docs.netlify.com/forms/setup/

---

**¡Buena suerte con la configuración!** 🚀

Una vez completados los pasos, tendrás un CMS completamente funcional donde tú y tus colaboradores podréis publicar noticias sin tocar código nunca más.
