# PRO TABLE Chile

Landing de catálogo y cotización para PRO TABLE, creada con HTML, CSS y JavaScript. No requiere instalar paquetes ni ejecutar una compilación. Está preparada para alojarse en GitHub Pages.

**Estado:** versión local; la publicación en GitHub Pages no se ha realizado.

## Ver la página

Abre `index.html` en un navegador. También puedes iniciar un servidor local desde la carpeta del proyecto, si tienes Python instalado:

```powershell
python -m http.server 4173
```

Después visita [http://localhost:4173](http://localhost:4173). Para detener el servidor, usa `Ctrl+C` en la terminal.

## Archivos principales

| Archivo | Contenido |
| --- | --- |
| `index.html` | Estructura, textos y secciones de la página. |
| `assets/styles.css` | Estilos y adaptación a pantallas de distintos tamaños. |
| `assets/config.js` | Configuración de contacto, incluido WhatsApp. |
| `assets/site.js` | Interacciones de la página. |
| `assets/` | Fotografías y recursos locales. |
| `docs/analisis-instagram.md` | Investigación, fuentes y límites del contenido publicado. |

## Configurar el contacto y el contenido

El WhatsApp comercial confirmado es **+56 9 9571 0591**. Su valor para los enlaces es `56995710591`, sin espacios ni signo `+`. Para cambiarlo, edita el número en `assets/config.js` y los enlaces de respaldo `wa.me` en `index.html` (utilizados cuando JavaScript no está disponible). Verifica los botones de contacto en el navegador.

Los textos se editan en `index.html` y los estilos en `assets/styles.css`. Conserva las rutas relativas de los recursos para que funcionen también cuando GitHub Pages publique la página dentro de la ruta de un repositorio.

Las fotografías proceden del contenido público visible en el Instagram de la marca. Su trazabilidad está documentada en `docs/analisis-instagram.md`. Los precios y los plazos no se publican porque no fueron verificados.

Todo el JavaScript del sitio se entrega al navegador: no coloques contraseñas, tokens privados ni claves secretas en estos archivos.

La tipografía Anton se incluye localmente en `assets/fonts/`, junto con su licencia SIL Open Font License. Las fotos, la tipografía y los estilos se sirven desde el propio sitio; no dependen de una conexión con Instagram para mostrarse.

## Verificación realizada

Se comprobaron la sintaxis de JavaScript, los archivos referenciados, los destinos de navegación, las referencias ARIA y los textos alternativos de las imágenes. El servidor local respondió HTTP 200. También se verificó el script real en un DOM simulado con Node VM: menú, filtros, selección de modelo, mensaje de WhatsApp con caracteres especiales y rechazo de datos inválidos; no se realizaron conexiones a WhatsApp ni se enviaron mensajes. La herramienta de navegador bloqueó la vista previa local: la revisión visual en móvil y escritorio sigue pendiente. Los estilos incluyen adaptaciones para distintos anchos de pantalla y preferencias de movimiento reducido.

## Publicar en GitHub Pages

1. Crea o utiliza un repositorio de GitHub y sube los archivos a la rama `main`, con `index.html` en la raíz.
2. En el repositorio, abre **Settings → Pages**.
3. En **Build and deployment → Source**, selecciona **Deploy from a branch**.
4. Elige la rama **main** y la carpeta **/(root)**; guarda con **Save**.
5. Espera a que termine el despliegue y abre el enlace que muestra GitHub Pages. Si falla, revisa la ejecución en **Actions**.

La rama debe existir antes de seleccionarla. Este procedimiento se verificó en la [documentación oficial de GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site). Para publicar desde un repositorio privado, revisa la disponibilidad según tu plan de GitHub.

Antes de compartir el enlace, comprueba en móvil y escritorio que las fotos carguen y que los botones abran una conversación con el número correcto. Abrir el enlace de WhatsApp no envía el mensaje automáticamente.

## Evolución del sitio

La versión actual sirve como catálogo y contacto para cotizar. Una futura tienda puede conectarse a un servicio externo para pagos, pedidos y stock, o a un backend propio alojado fuera de GitHub Pages. La página estática no procesa esas operaciones por sí sola.

El alcance de las reservas está pendiente de definir: reserva de compra de una mesa, arriendo o reserva de horarios de juego requieren información y flujos diferentes. No se ha implementado un sistema de reservas.
