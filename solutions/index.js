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

ping("raul.dev", (err, info) => {
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
// ✅ ¿Cómo mejorarías el siguiente código y por qué? -> convert to async/await with promise all
// ✅ Arregla los tests si es necesario

export async function leerArchivos() {
  console.time("leerArchivos");
  const [archivo1, archivo2, archivo3] = await Promise.all([
    fs.promises.readFile("archivo1.txt", "utf8"),
    fs.promises.readFile("archivo2.txt", "utf8"),
    fs.promises.readFile("archivo3.txt", "utf8"),
  ]);
  console.timeEnd("leerArchivos");

  return `${archivo1} ${archivo2} ${archivo3}`;
}

// 5 - Escribe una funcion `delay` que retorne una promesa que se resuelva después de `n` milisegundos. Por ejemplo:
export async function delay() {
  // ...
}

// delay(3000).then(() => console.log("Hola mundo"));
// // o..
// await delay(3000);
// console.log("Hola mundo");
