# Destino — América Solidaria

Formulario de registro para la actividad de Destino, con el mismo esquema del proyecto Univuelta: **frontend estático** + **backend en Google Sheets** (vía Google Apps Script).

## Estructura

```
base de datos/
├── frontend/           # Sitio estático (HTML/CSS/JS)
│   ├── index.html
│   ├── css/styles.css
│   ├── js/main.js
│   └── assets/         # Espacio para logos/imágenes reales (opcional)
└── backend/             # Google Apps Script (base de datos = Google Sheet)
    ├── Code.gs
    └── README.md        # Instrucciones de despliegue
```

## Flujo

1. **Pantalla 1**: "Gracias por participar con nosotros. Registrate aquí para ver nuestro collage de la actividad." con formulario de Nombre, Mail, Teléfono y Empresa.
2. Al enviar, el backend guarda el registro en la Google Sheet.
3. **Pantalla 2**: aparece la estrella de América Solidaria y el botón **"Sé parte del Destino de los jóvenes"**.
4. Al hacer click en ese botón, se abre `https://www.americasolidaria.cl` en una pestaña nueva y queda registrado en la planilla que esa persona hizo click.

## Puesta en marcha

1. Desplegar el backend siguiendo [`backend/README.md`](backend/README.md) y obtener la URL de la Web App.
2. Pegar esa URL en `frontend/js/main.js` (`CONFIG.SCRIPT_URL`).
3. Abrir `frontend/index.html` en el navegador (o publicarlo en cualquier hosting estático: GitHub Pages, Netlify, etc. — no necesita servidor propio).

## Personalización pendiente (opcional)

- Reemplazar la estrella/logo recreados en SVG por los archivos oficiales de la marca en `frontend/assets/` (ver el README de esa carpeta).
