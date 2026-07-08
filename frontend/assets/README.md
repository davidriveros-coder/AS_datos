# Assets

- `logo-header.png` → logo oficial "América Solidaria | DESTINO" del encabezado. Ya cargado.
- `estrella.png` → estrella de América Solidaria, recortada del logo oficial para la pantalla de agradecimiento. Ya cargada.

Si en algún momento faltan estos archivos, el sitio no rompe: `index.html` los referencia con `<img>` y `main.js` reemplaza la imagen por un texto simple si no carga (ver `handleMissingImage` en `js/main.js`).
