/**
 * Notikonscio CMS Loader
 * Carga noticias desde archivos Markdown generados por Decap CMS
 */

// Lista de archivos de noticias (se actualiza automáticamente cuando se publican desde el CMS)
// NOTA: En producción con GitHub Pages o Netlify, puedes usar el API de GitHub para listar archivos
const noticiasFiles = [
    '2026-03-10-lanzamiento-oficial-konscio3d-housing.md',
    '2026-04-15-tecnologia-blockchain-gobernanza-comunitaria.md'
];

/**
 * Parsea el front matter de un archivo Markdown
 */
function parseFrontMatter(markdown) {
    const frontMatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
    const match = markdown.match(frontMatterRegex);
    
    if (!match) {
        return { metadata: {}, content: markdown };
    }
    
    const frontMatter = match[1];
    const content = match[2];
    
    const metadata = {};
    const lines = frontMatter.split('\n');
    let currentKey = null;
    let currentValue = '';
    let inList = false;
    
    lines.forEach(line => {
        const keyValue = line.match(/^(\w+):\s*(.*)$/);
        
        if (keyValue) {
            // Si estábamos procesando una lista, guardamos el valor anterior
            if (currentKey && inList) {
                metadata[currentKey] = currentValue.split('\n').map(v => v.trim().replace(/^-\s*/, '')).filter(v => v);
                currentValue = '';
                inList = false;
            } else if (currentKey) {
                metadata[currentKey] = currentValue.replace(/^["']|["']$/g, '');
                currentValue = '';
            }
            
            currentKey = keyValue[1];
            currentValue = keyValue[2];
            
            // Detectar si es una lista
            if (!currentValue) {
                inList = true;
            }
        } else if (inList && line.trim().startsWith('-')) {
            currentValue += '\n' + line.trim();
        }
    });
    
    // Guardar el último valor
    if (currentKey) {
        if (inList) {
            metadata[currentKey] = currentValue.split('\n').map(v => v.trim().replace(/^-\s*/, '')).filter(v => v);
        } else {
            metadata[currentKey] = currentValue.replace(/^["']|["']$/g, '');
        }
    }
    
    return { metadata, content };
}

/**
 * Convierte Markdown básico a HTML
 */
function markdownToHtml(markdown) {
    let html = markdown;
    
    // Títulos
    html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>');
    html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>');
    html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>');
    
    // Negrita
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    
    // Enlaces
    html = html.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2">$1</a>');
    
    // Listas no ordenadas
    html = html.replace(/^\s*[-*]\s+(.*)$/gim, '<li>$1</li>');
    html = html.replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>');
    
    // Párrafos (líneas separadas por línea en blanco)
    const paragraphs = html.split('\n\n');
    html = paragraphs.map(p => {
        p = p.trim();
        if (!p.startsWith('<') && p) {
            return '<p>' + p + '</p>';
        }
        return p;
    }).join('\n');
    
    return html;
}

/**
 * Carga una noticia individual desde archivo Markdown
 */
async function loadNoticia(filename) {
    try {
        const response = await fetch(`/_posts/${filename}`);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        
        const markdownText = await response.text();
        const { metadata, content } = parseFrontMatter(markdownText);
        
        // Extraer ID del nombre del archivo
        const id = filename.replace('.md', '');
        
        return {
            id,
            titulo: metadata.titulo || 'Sin título',
            fecha: metadata.fecha || new Date().toISOString().split('T')[0],
            autor: metadata.autor || 'Fundación Proyecta',
            categoria: metadata.categoria || 'General',
            imagen: metadata.imagen || '/images/default-noticia.jpg',
            resumen: metadata.resumen || '',
            contenido: markdownToHtml(content),
            destacada: metadata.destacada === true || metadata.destacada === 'true',
            tags: metadata.tags || []
        };
    } catch (error) {
        console.error(`Error cargando noticia ${filename}:`, error);
        return null;
    }
}

/**
 * Carga todas las noticias
 */
async function loadAllNoticias() {
    const promesas = noticiasFiles.map(file => loadNoticia(file));
    const noticias = await Promise.all(promesas);
    
    // Filtrar noticias que fallaron al cargar
    const noticiasValidas = noticias.filter(n => n !== null);
    
    // Ordenar por fecha descendente (más reciente primero)
    noticiasValidas.sort((a, b) => {
        const fechaA = new Date(a.fecha);
        const fechaB = new Date(b.fecha);
        return fechaB - fechaA;
    });
    
    // Destacadas primero
    noticiasValidas.sort((a, b) => {
        if (a.destacada && !b.destacada) return -1;
        if (!a.destacada && b.destacada) return 1;
        return 0;
    });
    
    return noticiasValidas;
}

/**
 * Busca una noticia por ID
 */
async function getNoticiaById(id) {
    const filename = id + '.md';
    return await loadNoticia(filename);
}

// Exportar funciones
if (typeof window !== 'undefined') {
    window.NoticiasLoader = {
        loadAllNoticias,
        getNoticiaById
    };
}
