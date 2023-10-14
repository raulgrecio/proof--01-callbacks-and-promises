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
// que hace
// corrige
// si hay algo innecesario elimina
// mejora legibilidad

export function procesarArchivo() {
  fs.readFile("input.txt", "utf8", (error, contenido) => {
    if (error) {
      console.error("Error leyendo archivo:", error.message);
      return false;
    }

    setTimeout(() => {
      const textoProcesado = contenido.toUpperCase();

      fs.writeFile("output.txt", textoProcesado, (error) => {
        if (error) {
          console.error("Error guardando archivo:", error.message);
          return false;
        }

        console.log("Archivo procesado y guardado con éxito");
        return true;
      });
    }, 1000);
  });
}
