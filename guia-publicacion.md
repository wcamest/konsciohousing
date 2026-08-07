# 🚀 Guía Paso a Paso para Publicar - Konscio3D Housing

## ✅ CONFIGURACIÓN PRE-PUBLICACIÓN (15 minutos)

### 📱 Paso 1: Configurar WhatsApp (2 min)

1. **Abrir:** `js/chatbot.js`
2. **Buscar línea 9:**
   ```javascript
   whatsappNumber: '34600000000',  // ⚠️ CAMBIAR ESTO
   ```
3. **Cambiar por tu número real:**
   - Formato: Código país + número (sin + ni espacios)
   - España: `34612345678`
   - México: `52123456789`
   - Argentina: `5491123456789`
4. **Guardar archivo**

**✅ Verificar:** Abre el sitio, click en chatbot → "Hablar con un humano" → debe abrir WhatsApp con tu número

---

### 🌐 Paso 2: Actualizar URLs de Dominio (5 min)

Cuando ya tengas tu dominio definitivo (ejemplo: `konscio3dhousing.com`):

#### Archivo 1: `sitemap.xml`
Buscar y reemplazar TODAS las apariciones de:
```
https://tudominio.com
```
Por tu dominio real:
```
https://konscio3dhousing.com
```

**Herramienta:** Usa "Buscar y Reemplazar" (Ctrl+H en muchos editores)

#### Archivo 2: `robots.txt`
Actualizar la línea del sitemap:
```
Sitemap: https://konscio3dhousing.com/sitemap.xml
```

#### Archivo 3: `index.html`
Buscar y reemplazar en los meta tags:
- Open Graph URLs (líneas ~14-20)
- Twitter Card URLs (líneas ~24-28)
- Schema.org URLs (líneas ~47-95)

**Ejemplo:**
```html
<meta property="og:url" content="https://konscio3dhousing.com/index.html">
```

---

### 📱 Paso 3: Actualizar Redes Sociales (3 min)

**En TODOS los archivos HTML** (busca el footer), cambiar:

```html
<!-- ANTES -->
<a href="#" aria-label="Facebook"><i class="fab fa-facebook"></i></a>
<a href="#" aria-label="Twitter"><i class="fab fa-twitter"></i></a>
<a href="#" aria-label="LinkedIn"><i class="fab fa-linkedin"></i></a>
<a href="#" aria-label="Instagram"><i class="fab fa-instagram"></i></a>

<!-- DESPUÉS -->
<a href="https://facebook.com/tupagina" aria-label="Facebook" target="_blank"><i class="fab fa-facebook"></i></a>
<a href="https://twitter.com/tuperfil" aria-label="Twitter" target="_blank"><i class="fab fa-twitter"></i></a>
<a href="https://linkedin.com/company/tuempresa" aria-label="LinkedIn" target="_blank"><i class="fab fa-linkedin"></i></a>
<a href="https://instagram.com/tuperfil" aria-label="Instagram" target="_blank"><i class="fab fa-instagram"></i></a>
```

**Nota:** Si aún no tienes perfiles creados, puedes dejarlo como está temporalmente o eliminar los iconos.

---

### 🎨 Paso 4: Personalizar Imágenes Open Graph (5 min - Opcional)

Las imágenes que se muestran cuando compartes en redes sociales:

1. **Prepara una imagen destacada** (1200x630px recomendado)
2. **Súbela a** `images/og-image.jpg`
3. **Actualiza en index.html:**
   ```html
   <meta property="og:image" content="https://tudominio.com/images/og-image.jpg">
   ```

**Recomendación:** Usa una imagen con el logo y el tagline del proyecto.

---

## 📤 PUBLICACIÓN EN NETLIFY (5 minutos)

### Opción A: Netlify Drop (Más fácil)

1. **Ir a:** https://app.netlify.com/drop
2. **Arrastrar** toda la carpeta del proyecto
3. **Esperar** que suba (1-2 minutos)
4. **Obtendrás** una URL tipo: `random-name-123.netlify.app`
5. **Cambiar nombre:**
   - Click en "Site settings"
   - "Change site name"
   - Usar: `konscio3dhousing` (si está disponible)
   - URL final: `konscio3dhousing.netlify.app`

### Opción B: Conectar con GitHub

1. **Subir código a GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit - Konscio3D Housing v5.0"
   git remote add origin https://github.com/tuusuario/konscio3d-housing.git
   git push -u origin main
   ```

2. **En Netlify:**
   - New site from Git
   - Autorizar GitHub
   - Seleccionar el repositorio
   - Deploy settings: (dejar por defecto)
   - Click "Deploy site"

3. **Ventajas:**
   - Auto-deploy cada vez que haces push
   - Historial de versiones
   - Rollback fácil

---

## 🔧 CONFIGURACIÓN POST-PUBLICACIÓN (30 minutos)

### 📊 Paso 5: Google Analytics (10 min)

1. **Ir a:** https://analytics.google.com
2. **Crear cuenta/propiedad**
3. **Copiar código de seguimiento** (empieza con `G-XXXXXXXX`)
4. **Añadir en TODAS las páginas HTML** antes de `</head>`:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXX');
</script>
```

5. **Re-deploy** en Netlify (drag & drop de nuevo)

---

### 🔍 Paso 6: Google Search Console (15 min)

1. **Ir a:** https://search.google.com/search-console
2. **Añadir propiedad:**
   - Tipo: "Prefijo de URL"
   - URL: `https://tudominio.com`
3. **Verificar propiedad:**
   - Método recomendado: "Archivo HTML"
   - Descargar archivo de verificación
   - Subir a raíz del proyecto
   - Re-deploy
   - Click "Verificar"
4. **Subir sitemap:**
   - Click "Sitemaps" en menú lateral
   - Añadir: `https://tudominio.com/sitemap.xml`
   - Click "Enviar"

**Resultado:** Google empezará a indexar tu sitio en 24-48h.

---

### 🎨 Paso 7: Dominio Personalizado (5 min - Opcional)

Si compraste un dominio (ej: en Namecheap, GoDaddy):

1. **En Netlify:**
   - Site settings → Domain management
   - Click "Add custom domain"
   - Escribir tu dominio: `konscio3dhousing.com`

2. **En tu proveedor de dominio:**
   - Configurar DNS:
     ```
     Type: A Record
     Name: @
     Value: 75.2.60.5 (IP de Netlify)
     ```
   - Para www:
     ```
     Type: CNAME
     Name: www
     Value: [tu-sitio].netlify.app
     ```

3. **Esperar propagación DNS** (hasta 48h)

4. **Activar HTTPS en Netlify** (automático)

---

## ✅ VERIFICACIÓN FINAL (10 minutos)

### Checklist de Pruebas:

- [ ] **Home:** Efecto parallax funciona al hacer scroll
- [ ] **Navbar:** Todos los enlaces llevan a páginas correctas
- [ ] **Notikonscio:** Se cargan las 4 noticias
- [ ] **Blog:** Filtros por categoría funcionan
- [ ] **Detalle noticia:** Se puede leer completa y compartir
- [ ] **ChatBot:** Se abre, FAQs se despliegan, botón WhatsApp abre correctamente
- [ ] **Formulario Únete:** Selector de perfil cambia formularios
- [ ] **Formulario Contacto:** FAQs se despliegan
- [ ] **Footer:** Enlaces de redes sociales van a tus perfiles
- [ ] **Responsive:** Probar en móvil/tablet (F12 → Device toolbar)
- [ ] **Accesibilidad:** Navegar con Tab (skip link aparece)

---

## 🧪 HERRAMIENTAS DE TESTING

### Después de publicar, probar con:

1. **Google Lighthouse** (Chrome DevTools)
   - F12 → Lighthouse → Generate report
   - **Objetivos:**
     - Performance: 85+
     - SEO: 90+
     - Accessibility: 90+
     - Best Practices: 90+

2. **PageSpeed Insights**
   - https://pagespeed.web.dev/
   - Pegar tu URL
   - Revisar sugerencias de mejora

3. **Google Rich Results Test**
   - https://search.google.com/test/rich-results
   - Verificar que Schema.org se detecta correctamente

4. **WAVE Accessibility Tool**
   - https://wave.webaim.org/
   - Verificar accesibilidad

5. **Mobile-Friendly Test**
   - https://search.google.com/test/mobile-friendly
   - Verificar que es mobile-friendly

---

## 📝 MANTENIMIENTO CONTINUO

### Semanalmente:
- [ ] Publicar 1-2 noticias nuevas en Notikonscio
- [ ] Responder mensajes de WhatsApp
- [ ] Revisar formularios de contacto

### Mensualmente:
- [ ] Revisar Google Analytics
- [ ] Revisar Google Search Console
- [ ] Actualizar contenido si es necesario
- [ ] Backup del sitio

### Trimestralmente:
- [ ] Lighthouse audit completo
- [ ] Revisar velocidad de carga
- [ ] Actualizar imágenes/contenido obsoleto
- [ ] Revisar enlaces rotos

---

## 🆘 SOLUCIÓN DE PROBLEMAS

### Problema: ChatBot no abre WhatsApp correctamente
**Solución:**
- Verificar formato de número en `js/chatbot.js`
- Debe ser solo números, sin +, espacios ni guiones
- Ejemplo correcto: `34612345678`

### Problema: Noticias no se cargan
**Solución:**
- Verificar que la tabla "noticias" tiene datos
- Abrir consola del navegador (F12) para ver errores
- Verificar que la API de tablas está funcionando

### Problema: Imágenes no se ven
**Solución:**
- Verificar que las rutas son correctas
- Asegurarte de que las imágenes se subieron al servidor
- Verificar permisos de archivos

### Problema: SEO no mejora
**Solución:**
- Esperar al menos 1-2 semanas después de publicar
- Verificar que sitemap.xml se subió correctamente
- Asegurarte de que Google Search Console está configurado
- Publicar contenido regularmente

---

## 📞 CONTACTO DE SOPORTE

**Documentación disponible:**
- `README.md` - Información general del proyecto
- `SEO-ACCESIBILIDAD.md` - Guía de SEO y accesibilidad
- `RESUMEN-MEJORAS-V5.md` - Resumen de todas las mejoras

---

## 🎉 ¡FELICIDADES!

Si llegaste hasta aquí, tu sitio está **100% listo y optimizado** para:
- ✅ Recibir visitantes
- ✅ Captar leads con el chatbot
- ✅ Ser encontrado en Google
- ✅ Convertir visitantes en miembros de la comunidad

**¡Mucho éxito con Konscio3D Housing!** 🏡

---

**Versión de la guía:** 1.0  
**Fecha:** 14 de marzo de 2026  
**Compatible con:** Konscio3D Housing v5.0.0

