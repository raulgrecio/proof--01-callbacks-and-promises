// 1.- no funciona como se espera
// hay que arreglar algo

import net from "node:net";

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

export function obtenerDatosPromise(callback) {
  setTimeout(() => {
    callback(null, { data: "datos importantes" });
  }, 2000);
}
