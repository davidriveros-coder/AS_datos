# Backend — Google Apps Script + Google Sheets

Igual que en el proyecto de Univuelta: el "backend" es un Google Apps Script vinculado a una Google Sheet que actúa como base de datos.

## Qué registra

Una fila por persona registrada, con columnas:

| Fecha de registro | Nombre | Mail | Telefono | Empresa | Click Destino | Fecha click Destino |
|---|---|---|---|---|---|---|

- Al enviar el formulario del frontend se crea la fila con `Click Destino = FALSE`.
- Al hacer click en el botón **"Sé parte del Destino de los jóvenes"**, se actualiza esa misma fila (buscada por mail) a `Click Destino = TRUE` con la fecha del click.

## Pasos para desplegar

1. Andá a [sheets.google.com](https://sheets.google.com) y creá una hoja de cálculo nueva (por ejemplo, "Destino - Registros").
2. En esa hoja: **Extensiones → Apps Script**.
3. Borrá el contenido por defecto de `Code.gs` y pegá el contenido de [`Code.gs`](Code.gs) de esta carpeta.
4. Guardá el proyecto (ícono de disco o `Ctrl+S`).
5. Andá a **Implementar → Nueva implementación**.
   - Tipo: **Aplicación web**.
   - Ejecutar como: **Yo (tu cuenta)**.
   - Quién tiene acceso: **Cualquier usuario**.
6. Hacé click en **Implementar** y autorizá los permisos que pida Google (necesita acceso a la hoja de cálculo).
7. Copiá la **URL de la aplicación web** que te da al final (termina en `/exec`).
8. Pegá esa URL en [`frontend/js/main.js`](../frontend/js/main.js), reemplazando `PEGA_AQUI_TU_URL_DE_APPS_SCRIPT_WEB_APP` en `CONFIG.SCRIPT_URL`.

## Importante al actualizar el script

Cada vez que modifiques `Code.gs`, tenés que crear una **nueva implementación** (o editar la implementación existente con "Nueva versión") para que los cambios se reflejen en la URL pública. Guardar el archivo solo no alcanza.

## Probar que funciona

- Abrir la URL del script en el navegador (`/exec`) debería devolver `{"ok":true,"message":"Backend Destino activo."}`.
- Completar el formulario del frontend y revisar que aparezca una fila nueva en la pestaña "Registros" de la hoja.
- Hacer click en el botón de Destino y revisar que la columna "Click Destino" de esa fila pase a `TRUE`.
