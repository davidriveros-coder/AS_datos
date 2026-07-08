/**
 * Backend de Google Apps Script para el formulario "Sé parte del Destino".
 * Se despliega como Web App vinculado a una Google Sheet.
 * Ver README.md de esta carpeta para instrucciones de despliegue.
 */

const SHEET_NAME = "Registros";
const HEADERS = [
  "Fecha de registro",
  "Nombre",
  "Mail",
  "Telefono",
  "Empresa",
  "Click Destino",
  "Fecha click Destino",
];

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);

  try {
    const sheet = getOrCreateSheet();
    const data = JSON.parse(e.postData.contents);

    switch (data.action) {
      case "registrar":
        return registrar(sheet, data);
      case "click_destino":
        return registrarClickDestino(sheet, data);
      default:
        return jsonResponse({ ok: false, error: "Acción no reconocida." });
    }
  } catch (err) {
    return jsonResponse({ ok: false, error: err.message });
  } finally {
    lock.releaseLock();
  }
}

function doGet() {
  return jsonResponse({ ok: true, message: "Backend Destino activo." });
}

function getOrCreateSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    sheet.appendRow(HEADERS);
    sheet.setFrozenRows(1);
  }
  return sheet;
}

function registrar(sheet, data) {
  const nombre = normalize(data.nombre);
  const mail = normalize(data.mail).toLowerCase();
  const telefono = normalize(data.telefono);
  const empresa = normalize(data.empresa);

  if (!nombre || !mail) {
    return jsonResponse({ ok: false, error: "Nombre y mail son obligatorios." });
  }

  sheet.appendRow([new Date(), nombre, mail, telefono, empresa, false, ""]);
  return jsonResponse({ ok: true });
}

function registrarClickDestino(sheet, data) {
  const mail = normalize(data.mail).toLowerCase();
  if (!mail) {
    return jsonResponse({ ok: false, error: "Falta el mail." });
  }

  const values = sheet.getDataRange().getValues();
  // Recorremos de abajo hacia arriba para actualizar el registro más reciente de ese mail
  for (let row = values.length - 1; row >= 1; row--) {
    const rowMail = normalize(values[row][2]).toLowerCase();
    if (rowMail === mail) {
      sheet.getRange(row + 1, 6).setValue(true); // Click Destino
      sheet.getRange(row + 1, 7).setValue(new Date()); // Fecha click Destino
      return jsonResponse({ ok: true });
    }
  }

  return jsonResponse({
    ok: false,
    error: "No se encontró un registro previo con ese mail.",
  });
}

function normalize(value) {
  return (value || "").toString().trim();
}

function jsonResponse(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(
    ContentService.MimeType.JSON
  );
}
