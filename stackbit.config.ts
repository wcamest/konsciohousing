import {
  defineStackbitConfig,
  SiteMapEntry
} from "@stackbit/types";

import { GitContentSource } from "@stackbit/cms-git";

export default defineStackbitConfig({
  stackbitVersion: "~0.6.0",

  // El proyecto es HTML/CSS/JS estático.
  ssgName: "custom",

  nodeVersion: "20",

  // Servidor local que utilizará Visual Editor.
  devCommand: "npx serve . -l {PORT} -u",

  contentSources: [
    new GitContentSource({
      rootPath: __dirname,

      contentDirs: ["_posts"],

      models: [
        {
          name: "Noticia",
          label: "Noticias",
          type: "page",

          filePath: "_posts/{slug}.md",

          fields: [
            {
              name: "titulo",
              label: "Título",
              type: "string",
              required: true
            },
            {
              name: "fecha",
              label: "Fecha",
              type: "date",
              required: true
            },
            {
              name: "autor",
              label: "Autor",
              type: "string",
              required: true
            },
            {
              name: "categoria",
              label: "Categoría",
              type: "string",
              required: true
            },
            {
              name: "imagen",
              label: "Imagen",
              type: "image"
            },
            {
              name: "resumen",
              label: "Resumen",
              type: "text"
            },
            {
              name: "destacada",
              label: "Destacada",
              type: "boolean"
            },
            {
              name: "tags",
              label: "Etiquetas",
              type: "list",
              items: {
                type: "string"
              }
            }
          ]
        }
      ],

      assetsConfig: {
        referenceType: "static",
        staticDir: ".",
        uploadDir: "images",
        publicPath: "/"
      }
    })
  ],

  /*
   * Cada archivo:
   *
   * _posts/2026-03-10-mi-noticia.md
   *
   * se visualiza realmente como:
   *
   * /noticia-detalle.html?id=2026-03-10-mi-noticia
   */
  siteMap: ({ documents }) => {
    const entries: SiteMapEntry[] = [];

    for (const document of documents) {
      if (document.modelName !== "Noticia") {
        continue;
      }

      /*
       * document.id tendrá una ruta asociada al Markdown.
       * Extraemos solamente el nombre del archivo, sin .md.
       */
      const match = document.id.match(/([^/]+)\.md$/);

      if (!match) {
        continue;
      }

      const noticiaId = match[1];

      entries.push({
        stableId: document.id,

        urlPath:
          `/noticia-detalle.html?id=${encodeURIComponent(noticiaId)}`,

        document
      });
    }

    return entries;
  }
});
