# NOTIKONSCIO - Guía para Publicar Contenido

## Cómo funciona actualmente

El blog Notikonscio tiene **4 noticias de ejemplo** precargadas en la base de datos de tablas. Las categorías son:
- Proyecto
- Tecnología
- Comunidad
- Sostenibilidad

## Cómo publicar nuevas noticias

### OPCIÓN 1: Usando las herramientas de tablas (Backend simulado)

Las noticias están en `project.session_state['data']['noticias']`. Para añadir:

1. Usa `TableDataAdd` con estos campos:
```json
{
  "titulo": "Título de la noticia",
  "categoria": "Proyecto|Tecnología|Comunidad|Sostenibilidad",
  "fecha": "2026-04-15",
  "imagen": "url-de-imagen",
  "resumen": "Breve resumen...",
  "contenido": "Contenido completo HTML...",
  "autor": "Fundación Proyecta"
}
```

### OPCIÓN 2: Modificar directamente el archivo JavaScript

**Archivo:** `js/main.js` (línea ~400)

Añade objetos al array `mockNews`:

```javascript
{
    id: 5,
    titulo: 'Nueva noticia',
    categoria: 'Proyecto',
    fecha: '2026-04-15',
    imagen: 'images/tu-imagen.jpg',
    resumen: 'Resumen...',
    contenido: '<p>Contenido HTML...</p>',
    autor: 'Fundación Proyecta'
}
```

### OPCIÓN 3: Sistema CMS (Recomendado para producción)

Para gestión real necesitarías:
- Backend (Node.js + MongoDB / Firebase)
- Panel de administración
- Sistema de autenticación

## Solución rápida para ahora

Puedo crear noticias nuevas modificando el JS. ¿Quieres que añada alguna noticia específica?
