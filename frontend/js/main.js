// ============================================================
// CONFIGURACIÓN
// Pega aquí la URL de tu Google Apps Script Web App
// (ver backend/README.md para instrucciones de despliegue)
// ============================================================
const CONFIG = {
  SCRIPT_URL: "PEGA_AQUI_TU_URL_DE_APPS_SCRIPT_WEB_APP",
};

const formSection = document.getElementById("formSection");
const thanksSection = document.getElementById("thanksSection");
const form = document.getElementById("registroForm");
const submitBtn = document.getElementById("submitBtn");
const formError = document.getElementById("formError");
const destinoBtn = document.getElementById("destinoBtn");

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

let registeredMail = "";

function isBackendConfigured() {
  return !CONFIG.SCRIPT_URL.includes("PEGA_AQUI");
}

// Si falta la imagen en assets/, mostramos un texto simple en vez del ícono roto
function handleMissingImage(img, fallbackText) {
  img.addEventListener("error", () => {
    const span = document.createElement("span");
    span.className = "brand-header__fallback-text";
    span.textContent = fallbackText;
    img.replaceWith(span);
  });
}
handleMissingImage(document.getElementById("headerLogo"), "América Solidaria · Destino");
handleMissingImage(document.getElementById("heroStar"), "");

function showError(message) {
  formError.textContent = message;
  formError.hidden = false;
}

function clearError() {
  formError.hidden = true;
  formError.textContent = "";
}

function sendToBackend(payload) {
  // Content-Type text/plain evita el preflight CORS que Apps Script no maneja bien
  return fetch(CONFIG.SCRIPT_URL, {
    method: "POST",
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body: JSON.stringify(payload),
  }).then((res) => res.json());
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  clearError();

  // Honeypot: si un bot llenó este campo oculto, descartamos silenciosamente
  if (form.website.value) {
    return;
  }

  const nombre = form.nombre.value.trim();
  const mail = form.mail.value.trim();
  const telefono = form.telefono.value.trim();
  const empresa = form.empresa.value.trim();

  if (!nombre || !mail || !telefono || !empresa) {
    showError("Por favor completá todos los campos.");
    return;
  }

  if (!EMAIL_REGEX.test(mail)) {
    showError("Ingresá un mail válido.");
    return;
  }

  submitBtn.disabled = true;
  submitBtn.textContent = "Enviando...";

  try {
    if (isBackendConfigured()) {
      const result = await sendToBackend({
        action: "registrar",
        nombre,
        mail,
        telefono,
        empresa,
      });

      if (!result.ok) {
        throw new Error(result.error || "No se pudo registrar.");
      }
    } else {
      console.warn(
        "CONFIG.SCRIPT_URL no está configurada: el registro no se guarda todavía (ver backend/README.md)."
      );
    }

    registeredMail = mail;
    formSection.hidden = true;
    thanksSection.hidden = false;
  } catch (err) {
    showError("Ocurrió un error al registrar tus datos. Probá de nuevo.");
    console.error(err);
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = "Enviar";
  }
});

destinoBtn.addEventListener("click", () => {
  if (!registeredMail || !isBackendConfigured()) {
    return;
  }
  // Registro del click "en segundo plano": no bloquea la navegación al link
  sendToBackend({ action: "click_destino", mail: registeredMail }).catch(
    (err) => console.error("No se pudo registrar el click de Destino", err)
  );
});
