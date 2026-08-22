# 📰 GUÍA COMPLETA: Añadir Noticias a Notikonscio

**Versión:** 8.4.1  
**Fecha:** 22 de agosto de 2026  
**Para:** Equipo técnico Fundación Proyecta

---

## 📋 ÍNDICE

1. [Introducción](#introducción)
2. [Requisitos Previos](#requisitos-previos)
3. [Proceso Paso a Paso](#proceso-paso-a-paso)
4. [Estructura del Archivo Markdown](#estructura-del-archivo-markdown)
5. [Campos del Frontmatter (YAML)](#campos-del-frontmatter-yaml)
6. [Categorías Disponibles](#categorías-disponibles)
7. [Requisitos de Imágenes](#requisitos-de-imágenes)
8. [Ejemplos Completos](#ejemplos-completos)
9. [Solución de Problemas](#solución-de-problemas)
10. [Checklist Pre-Publicación](#checklist-pre-publicación)

---

## 🎯 INTRODUCCIÓN

El sistema de blog **Notikonscio** utiliza archivos **Markdown (.md)** para gestionar noticias de forma sencilla y eficiente. Este sistema:

- ✅ No requiere base de datos
- ✅ Permite previsualización instantánea
- ✅ Mantiene el contenido organizado en archivos de texto
- ✅ Soporta formato rico (negritas, listas, enlaces, imágenes)
- ✅ Carga dinámicamente en la página web

---

## 🔧 REQUISITOS PREVIOS

Antes de comenzar, asegúrate de tener:

1. **Editor de texto** (recomendados):
   - Visual Studio Code
   - Sublime Text
   - Notepad++
   - Cualquier editor de texto plano

2. **Acceso a la carpeta del proyecto**:
   ```
   /konscio-housing-project/
   ├── _posts/          ← Aquí van las noticias
   ├── images/          ← Aquí van las imágenes
   └── ...
   ```

3. **Imagen preparada**:
   - Formato: JPG, PNG o WebP
   - Tamaño recomendado: 1200x630px (ratio 1.91:1)
   - Peso máximo: 500KB (optimizada)
   - Nombres sin espacios ni acentos

---

## 📝 PROCESO PASO A PASO

### **PASO 1: Preparar la imagen**

1. Elige o crea una imagen representativa de la noticia
2. Renombra el archivo sin espacios ni caracteres especiales:
   ```
   ✅ CORRECTO: nueva-tecnologia-construccion.jpg
   ❌ INCORRECTO: Nueva Tecnología de Construcción.jpg
   ```

3. Optimiza la imagen (reduce peso sin perder calidad):
   - Usa herramientas online: TinyPNG, Compressor.io
   - O software: Photoshop, GIMP

4. Guarda la imagen en la carpeta `images/`:
   ```
   /konscio-housing-project/images/nueva-tecnologia-construccion.jpg
   ```

---

### **PASO 2: Crear el archivo Markdown**

1. Ve a la carpeta `_posts/`

2. Crea un nuevo archivo con el formato:
   ```
   YYYY-MM-DD-titulo-en-minusculas-sin-acentos.md
   ```

   **Ejemplo:**
   ```
   2026-08-22-nueva-tecnologia-construccion-sostenible.md
   ```

   **Reglas importantes:**
   - ✅ Fecha en formato ISO: `YYYY-MM-DD`
   - ✅ Todo en minúsculas
   - ✅ Palabras separadas por guiones `-`
   - ✅ Sin acentos, ñ, ni caracteres especiales
   - ✅ Extensión `.md`

---

### **PASO 3: Escribir el contenido**

Abre el archivo con tu editor y estructura el contenido en **DOS PARTES**:

#### **PARTE A: Frontmatter (metadatos en YAML)**

```markdown
---
titulo: "Nueva Tecnología de Construcción Sostenible"
fecha: 2026-08-22
autor: "Ing. María González"
categoria: Tecnología
imagen: "images/nueva-tecnologia-construccion.jpg"
resumen: "Descubre la última innovación en construcción ecológica que reduce costos en un 40% y el tiempo de construcción a la mitad."
destacada: true
tags: [construcción, sostenibilidad, innovación]
---
```

#### **PARTE B: Contenido del artículo (Markdown)**

```markdown
## Introducción

La **Fundación Proyecta** presenta una innovación revolucionaria en el sector de la construcción sostenible...

## Características principales

- Reducción de costos del 40%
- Tiempo de construcción: 50% más rápido
- Materiales 100% ecológicos
- Certificación LEED Platinum

## Impacto en la comunidad

Esta nueva tecnología permitirá...

### Beneficios económicos

El análisis financiero demuestra...

## Conclusión

Con esta innovación, damos un paso más hacia...

---

**Para más información:**  
Contacta a: [maria.gonzalez@proyecta.org](mailto:maria.gonzalez@proyecta.org)
```

---

## 🏷️ CAMPOS DEL FRONTMATTER (YAML)

El **frontmatter** es la sección entre los `---` al inicio del archivo. Define los metadatos de la noticia.

### **Campos Obligatorios:**

| Campo | Tipo | Descripción | Ejemplo |
|-------|------|-------------|---------|
| `titulo` | Texto | Título de la noticia (visible) | `"Nueva Tecnología Sostenible"` |
| `fecha` | Fecha | Formato YYYY-MM-DD | `2026-08-22` |
| `categoria` | Texto | Una de las 5 categorías válidas | `Tecnología` |
| `imagen` | Ruta | Ruta relativa desde la raíz | `"images/mi-imagen.jpg"` |
| `resumen` | Texto | Descripción breve (1-2 líneas) | `"Innovación que reduce costos..."` |

### **Campos Opcionales:**

| Campo | Tipo | Descripción | Ejemplo | Por Defecto |
|-------|------|-------------|---------|-------------|
| `autor` | Texto | Nombre del autor | `"Ing. María González"` | `"Fundación Proyecta"` |
| `destacada` | Booleano | ¿Aparece en portada destacada? | `true` o `false` | `false` |
| `tags` | Lista | Etiquetas para filtrar/buscar | `[tag1, tag2, tag3]` | `[]` |

### **Notas Importantes:**

- ⚠️ Los textos con espacios o caracteres especiales deben ir entre **comillas dobles**: `"Título con espacios"`
- ⚠️ Las fechas NO llevan comillas: `fecha: 2026-08-22`
- ⚠️ Los booleanos NO llevan comillas: `destacada: true`
- ⚠️ Las rutas de imágenes SÍ llevan comillas: `imagen: "images/foto.jpg"`

---

## 📂 CATEGORÍAS DISPONIBLES

El sistema acepta **exactamente 5 categorías** (sensible a mayúsculas):

| Categoría | Uso Recomendado | Color Badge |
|-----------|-----------------|-------------|
| `Proyecto` | Actualizaciones generales del proyecto Konscio Housing | Naranja |
| `Tecnología` | Innovaciones técnicas, nuevos materiales, métodos constructivos | Verde |
| `Comunidad` | Historias de residentes, eventos comunitarios, testimonios | Azul |
| `Eventos` | Anuncios de eventos, conferencias, talleres | Morado |
| `Avances` | Progreso de construcción, hitos alcanzados, estadísticas | Amarillo |

**⚠️ IMPORTANTE:** Usa **exactamente** uno de estos nombres (con mayúscula inicial). Cualquier otra categoría causará errores.

---

## 🖼️ REQUISITOS DE IMÁGENES

### **Especificaciones Técnicas:**

| Aspecto | Recomendación | Mínimo Aceptable |
|---------|---------------|------------------|
| **Formato** | JPG, PNG, WebP | JPG |
| **Dimensiones** | 1200x630px (1.91:1) | 800x420px |
| **Peso** | < 200KB | < 500KB |
| **Resolución** | 72 DPI | 72 DPI |
| **Modo color** | RGB | RGB |

### **Rutas de Imagen:**

```markdown
✅ CORRECTO:
imagen: "images/mi-imagen.jpg"

❌ INCORRECTO:
imagen: "/images/mi-imagen.jpg"      ← No usar barra inicial
imagen: "./images/mi-imagen.jpg"     ← No usar ./
imagen: "C:/imagenes/foto.jpg"       ← No usar rutas absolutas
imagen: "../images/mi-imagen.jpg"    ← No usar navegación relativa
```

### **Nombres de Archivo:**

```
✅ BUENAS PRÁCTICAS:
- construccion-modular-bambu.jpg
- evento-comunidad-2026-08.jpg
- avance-proyecto-fase-2.png

❌ EVITAR:
- Construcción Modular.jpg          ← Espacios y mayúsculas
- foto del evento (1).JPG            ← Espacios y paréntesis
- avance_proyecto_ñ_especial.jpg    ← Ñ y caracteres especiales
```

### **Sistema de Fallback:**

Si la imagen no carga, el sistema automáticamente muestra una imagen por defecto:
```
images/comunidad-sostenible-1.jpg
```

Por lo tanto, **verifica siempre** que tu imagen existe en la carpeta `images/`.

---

## 📚 EJEMPLOS COMPLETOS

### **EJEMPLO 1: Noticia de Tecnología (Completa)**

**Archivo:** `_posts/2026-08-22-impresion-3d-viviendas-economicas.md`

```markdown
---
titulo: "Impresión 3D de Viviendas: El Futuro de la Construcción Económica"
fecha: 2026-08-22
autor: "Arq. Carlos Mendoza"
categoria: Tecnología
imagen: "images/impresion-3d-construccion.jpg"
resumen: "La tecnología de impresión 3D BE MORE 3D permite construir viviendas completas en 48 horas con un ahorro del 60% en costos."
destacada: true
tags: [impresión 3D, BE MORE 3D, construcción rápida, innovación]
---

## La Revolución de la Impresión 3D en Construcción

La **tecnología BE MORE 3D** está transformando radicalmente la industria de la construcción. Con esta innovación, hemos logrado reducir el tiempo de construcción de meses a **solo 48 horas**.

## Ventajas Comprobadas

### Económicas
- **60% de ahorro** en costos totales de construcción
- Reducción del 80% en desperdicios de material
- Mano de obra especializada reducida en 70%

### Técnicas
- Precisión milimétrica en cada estructura
- Resistencia estructural certificada
- Diseños personalizables al 100%

### Ambientales
- Materiales ecológicos y reciclables
- Huella de carbono reducida en 55%
- Cero desperdicio en obra

## Proceso de Construcción

1. **Diseño digital:** Modelado 3D de la vivienda completa
2. **Preparación del terreno:** Nivelación y cimientos en 24h
3. **Impresión:** Estructura completa en 48h continuas
4. **Acabados:** Instalaciones y terminaciones en 1 semana

## Impacto Social

Esta tecnología permite que familias de bajos recursos accedan a viviendas dignas con pagos mensuales de **menos de $200 USD**.

> "Gracias a BE MORE 3D, más de 1,000 familias tendrán su hogar en el próximo año." - Fundación Proyecta

## Próximos Pasos

Estamos planificando un **piloto de 50 viviendas** en la comunidad de Villa Esperanza para el cuarto trimestre de 2026.

---

**¿Quieres conocer más?**  
📧 Contacto: [tecnologia@proyecta.org](mailto:tecnologia@proyecta.org)  
📱 WhatsApp: +1 (555) 123-4567  
🌐 Web: [www.konscio3dhousing.org](https://www.konscio3dhousing.org)
```

---

### **EJEMPLO 2: Noticia de Comunidad (Simple)**

**Archivo:** `_posts/2026-08-15-testimonio-familia-garcia.md`

```markdown
---
titulo: "Historia de Éxito: La Familia García y su Nuevo Hogar"
fecha: 2026-08-15
categoria: Comunidad
imagen: "images/familia-garcia-testimonio.jpg"
resumen: "Conoce cómo la familia García transformó su vida al acceder a una vivienda digna gracias al proyecto Konscio Housing."
destacada: false
tags: [testimonio, comunidad, éxito]
---

## Una Nueva Oportunidad

María García y su familia llevaban **15 años** viviendo en condiciones precarias. Hoy, nos comparten su emocionante historia de transformación.

## El Testimonio de María

*"Nunca pensé que sería posible tener una casa propia. El proceso fue increíblemente rápido y el apoyo del equipo fue excepcional."*

### Datos del Proyecto
- **Tiempo de construcción:** 3 semanas
- **Superficie:** 65 m²
- **Cuota mensual:** $180 USD
- **Fecha de entrega:** Julio 2026

## Lo Que Más Valoran

- Espacios amplios e iluminados
- Cocina moderna y funcional
- Baño completo y digno
- Jardín para los niños

## Mensaje Final

*"Gracias a Fundación Proyecta, mis hijos ahora tienen un lugar seguro para crecer. Este es el inicio de nuestra nueva vida."*

---

📸 **Galería de fotos:** [Ver más imágenes](galeria.html)
```

---

### **EJEMPLO 3: Noticia de Evento**

**Archivo:** `_posts/2026-09-01-jornada-puertas-abiertas-septiembre.md`

```markdown
---
titulo: "Jornada de Puertas Abiertas - Septiembre 2026"
fecha: 2026-09-01
categoria: Eventos
imagen: "images/evento-puertas-abiertas-sept.jpg"
resumen: "Únete a nuestra jornada de puertas abiertas el 15 de septiembre. Conoce las viviendas modelo, tecnologías y opciones de financiamiento."
destacada: true
tags: [evento, puertas abiertas, visitas, inscripción]
---

## 🎉 Te Invitamos a Conocer el Futuro de la Vivienda

**Fecha:** Sábado 15 de septiembre de 2026  
**Horario:** 10:00 AM - 5:00 PM  
**Lugar:** Modelo Piloto Konscio Housing - Villa Esperanza

## Agenda del Evento

### 10:00 AM - Registro y Bienvenida
Café de cortesía y entrega de material informativo

### 11:00 AM - Recorrido Guiado
Visita a las **3 viviendas modelo**:
- Vivienda BE MORE 3D
- Casa Modular de Bambú
- Domo Binishell

### 1:00 PM - Almuerzo Comunitario
Buffet incluido para todos los asistentes

### 2:00 PM - Charla Técnica
"Cómo Acceder a Tu Vivienda Sostenible"
- Opciones de financiamiento
- Proceso de solicitud
- Plazos y requisitos

### 4:00 PM - Sesión de Preguntas
Resuelve todas tus dudas con nuestro equipo

## Inscripción

**📝 Regístrate GRATIS:**  
[Formulario de inscripción](https://forms.gle/ejemplo)

**Cupos limitados:** 200 personas

## Beneficios de Asistir

✅ Conocer las tecnologías de primera mano  
✅ Asesoría personalizada gratuita  
✅ Descuento del 5% en enganche (solo ese día)  
✅ Gift bag con material informativo  
✅ Sorteo de 3 meses de cuota gratis

## Información Adicional

- **Estacionamiento:** Disponible y gratuito
- **Actividades para niños:** Área de juegos supervisada
- **Accesibilidad:** Instalaciones adaptadas para personas con discapacidad

---

📞 **Más información:**  
WhatsApp: [+1 (555) 123-4567](tel:+15551234567)  
Email: [eventos@proyecta.org](mailto:eventos@proyecta.org)

**¡No faltes! Te esperamos.** 🏡
```

---

## 🚨 SOLUCIÓN DE PROBLEMAS

### **PROBLEMA 1: La noticia no aparece en Notikonscio**

**Posibles causas:**

1. **Nombre de archivo incorrecto**
   - ✅ Verifica el formato: `YYYY-MM-DD-titulo-slug.md`
   - ✅ Asegúrate de que la extensión sea `.md`

2. **Frontmatter mal formateado**
   - ✅ Verifica que hay `---` al inicio y al final
   - ✅ Comprueba que no faltan comillas en los textos
   - ✅ Revisa que la categoría sea exacta (mayúscula inicial)

3. **Archivo no guardado en `_posts/`**
   - ✅ Confirma que está en la carpeta correcta

**Solución rápida:**
```bash
# Verificar estructura del archivo
1. Abrir _posts/TU-ARCHIVO.md
2. Comprobar que comienza con ---
3. Revisar cada campo del frontmatter
4. Verificar que termina con ---
5. Guardar cambios
6. Refrescar navegador con Ctrl+F5
```

---

### **PROBLEMA 2: La imagen no se muestra (cuadro gris)**

**Posibles causas:**

1. **Ruta incorrecta**
   ```markdown
   ❌ imagen: "/images/foto.jpg"    ← Barra inicial
   ❌ imagen: "image/foto.jpg"      ← Sin 's' final
   ✅ imagen: "images/foto.jpg"     ← CORRECTO
   ```

2. **Archivo de imagen no existe**
   - ✅ Verifica que el archivo está en `images/`
   - ✅ Comprueba que el nombre coincide exactamente (mayúsculas/minúsculas)

3. **Extensión incorrecta**
   ```markdown
   ❌ imagen: "images/foto.PNG"     ← Mayúsculas
   ✅ imagen: "images/foto.png"     ← Minúsculas
   ```

**Solución:**
1. Ve a la carpeta `images/`
2. Localiza tu imagen
3. Copia el nombre EXACTO del archivo
4. Pégalo en el frontmatter con el prefijo `images/`

---

### **PROBLEMA 3: Al hacer clic en "Leer más" no carga el artículo**

**Posibles causas:**

1. **Contenido Markdown vacío**
   - Debe haber contenido después del frontmatter

2. **Error de sintaxis en el Markdown**
   - Verifica que no hay caracteres raros

**Solución:**
```markdown
# Estructura mínima requerida

---
titulo: "Mi Noticia"
fecha: 2026-08-22
categoria: Proyecto
imagen: "images/mi-imagen.jpg"
resumen: "Descripción breve"
---

## Contenido

Al menos un párrafo de contenido es necesario aquí.
```

---

### **PROBLEMA 4: La noticia aparece con formato raro**

**Causas comunes:**

1. **HTML dentro del Markdown**
   - Evita mezclar HTML y Markdown salvo que sea necesario

2. **Saltos de línea incorrectos**
   - En Markdown necesitas **dos saltos** de línea para crear un párrafo

**Ejemplo correcto:**
```markdown
Este es un párrafo.

Este es otro párrafo (nota las dos líneas en blanco arriba).

## Título de sección

Contenido de la sección.
```

---

### **PROBLEMA 5: La fecha sale incorrecta**

**Causa:**
Formato de fecha incorrecto en el frontmatter

**Solución:**
```markdown
❌ fecha: 22/08/2026
❌ fecha: "August 22, 2026"
❌ fecha: 22-08-2026

✅ fecha: 2026-08-22        ← Formato ISO correcto
```

---

## ✅ CHECKLIST PRE-PUBLICACIÓN

Antes de guardar y publicar tu noticia, verifica:

### **Contenido:**
- [ ] El título es claro y atractivo
- [ ] El resumen tiene 1-2 líneas (no más de 160 caracteres)
- [ ] El contenido tiene al menos 200 palabras
- [ ] Hay al menos un subtítulo (##) en el artículo
- [ ] Los enlaces funcionan correctamente
- [ ] No hay errores ortográficos

### **Metadatos (Frontmatter):**
- [ ] Todos los campos obligatorios están completos
- [ ] La fecha está en formato `YYYY-MM-DD`
- [ ] La categoría es una de las 5 válidas
- [ ] La ruta de imagen es correcta: `images/nombre.jpg`
- [ ] El resumen no excede 160 caracteres
- [ ] Si es destacada, `destacada: true` está configurado

### **Archivo:**
- [ ] El nombre sigue el formato: `YYYY-MM-DD-titulo-slug.md`
- [ ] Está guardado en la carpeta `_posts/`
- [ ] La extensión es `.md`
- [ ] No hay espacios ni acentos en el nombre del archivo

### **Imagen:**
- [ ] La imagen existe en la carpeta `images/`
- [ ] El peso es menor a 500KB
- [ ] Las dimensiones son apropiadas (mín. 800x420px)
- [ ] El nombre no tiene espacios ni caracteres especiales

### **Prueba Final:**
- [ ] Abre `notikonscio.html` en el navegador
- [ ] La noticia aparece en la lista
- [ ] La imagen se muestra correctamente
- [ ] Al hacer clic en "Leer más" se abre el artículo completo
- [ ] El contenido se ve bien formateado
- [ ] Los botones de compartir funcionan

---

## 🎓 CONSEJOS DE ESCRITURA

### **Títulos Efectivos:**
```
✅ BUENOS:
- "Impresión 3D Reduce Costos de Construcción en 60%"
- "Familia García Recibe su Nuevo Hogar en Tiempo Récord"
- "Jornada de Puertas Abiertas: 15 de Septiembre"

❌ EVITAR:
- "Noticia importante"
- "Actualización del proyecto"
- "Información relevante sobre construcción"
```

### **Resúmenes Atractivos:**
```
✅ BUENO:
"La tecnología de impresión 3D permite construir viviendas 
completas en 48 horas con un ahorro del 60% en costos."

❌ EVITAR:
"En este artículo hablaremos sobre una nueva tecnología."
```

### **Estructura del Contenido:**

1. **Introducción (1 párrafo):** Presenta el tema principal
2. **Desarrollo (3-5 secciones):** Detalla la información con subtítulos
3. **Conclusión (1 párrafo):** Resume los puntos clave
4. **Call-to-Action:** Invita a contactar, registrarse o saber más

---

## 📞 SOPORTE TÉCNICO

Si después de revisar esta guía sigues teniendo problemas:

**Contacta al equipo técnico:**

📧 **Email:** soporte@proyecta.org  
📱 **WhatsApp:** +1 (555) 123-4567  
💬 **Slack:** Canal #notikonscio-soporte

**Información a proporcionar:**
1. Nombre del archivo .md problemático
2. Captura de pantalla del error (si hay)
3. Descripción del problema
4. Pasos que ya intentaste

---

## 🔄 ACTUALIZACIONES DE ESTA GUÍA

- **v8.4.1** (22/08/2026): Guía inicial completa
- Sistema de fallback de imágenes implementado
- Validaciones de rutas relativas activas

---

## 📄 PLANTILLA RÁPIDA

Copia y pega esta plantilla para crear noticias rápidamente:

```markdown
---
titulo: "TU TÍTULO AQUÍ"
fecha: YYYY-MM-DD
autor: "Tu Nombre"
categoria: Proyecto
imagen: "images/tu-imagen.jpg"
resumen: "Descripción breve de 1-2 líneas que enganche al lector."
destacada: false
tags: [tag1, tag2, tag3]
---

## Introducción

Primer párrafo introductorio que presenta el tema...

## Desarrollo

### Subtítulo 1

Contenido de la primera sección...

### Subtítulo 2

Contenido de la segunda sección...

## Conclusión

Párrafo final que resume los puntos clave...

---

**Contacto:**  
Email: [contacto@proyecta.org](mailto:contacto@proyecta.org)
```

---

**¡Listo! Ahora tienes todo lo necesario para publicar noticias en Notikonscio de forma profesional.** 🚀

**Fundación Proyecta** - Konscio Housing Project  
*Construyendo el futuro, una casa a la vez.*
