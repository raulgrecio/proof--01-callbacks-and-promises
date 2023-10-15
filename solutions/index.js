// 1.- no funciona como se espera
// hay que arreglar algo

import net from "node:net";
import fs from "node:fs";

export const ping = (ip, callback) => {
  const startTime = process.hrtime();

  const client = net.connect({ port: 80, host: ip }, () => {
    client.end();
    callback(null, { time: process.hrtime(startTime), ip });
  });

  client.on("error", (err) => {
    client.end();
    callback(err);
  });
};

ping("midu.dev", (err, info) => {
  if (err) console.error(err);
  console.log(info);
});

// 2.- transformar a promesas

export function obtenerDatosPromise() {
  return new Promise((resolve, _) => {
    setTimeout(() => {
      resolve({ data: "datos importantes" });
    }, 2000);
  });
}

// 3.-
// ✅ que hace: el contenido de un input.txt y lo escribe en output en mayúsculas
// ✅ corrige
// ✅ si hay algo innecesario elimina
// ✅ mejora legibilidad

export function procesarArchivo(callback) {
  const handleWrite = (error) => {
    if (error) {
      console.log("Error guardando archivo:", error.message);
      callback(error);
    }

    console.log("Archivo procesado y guardado con éxito");
    callback(null);
  };

  fs.readFile("input.txt", "utf8", (error, contenido) => {
    if (error) {
      console.log("Error leyendo archivo:", error.message);
      callback(error);
    }

    const textoProcesado = contenido.toUpperCase();

    fs.writeFile("output.txt", textoProcesado, handleWrite);
  });
}

export async function procesarArchivoPromise() {
  try {
    const contenido = await fs.promises.readFile("input.txt", "utf8");
    const textoProcesado = contenido.toUpperCase();
    await fs.promises.writeFile("output.txt", textoProcesado);
  } catch (error) {
    console.log("Error al procesar el archivo:", error.message);
    throw error;
  }
}

// 4.-
// ¿Cómo mejorarías el siguiente código y por qué?
// Arregla los tests si es necesario:

export function leerArchivos() {
  const archivo1 = fs.readFileSync("archivo1.txt", "utf8");
  const archivo2 = fs.readFileSync("archivo2.txt", "utf8");
  const archivo3 = fs.readFileSync("archivo3.txt", "utf8");

  return `${archivo1} ${archivo2} ${archivo3}`;
}
