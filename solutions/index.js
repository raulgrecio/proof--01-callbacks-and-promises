// 1 - no funciona como se espera
// hay que arreglar algo

import net from "node:net";

export const ping = (ip) => {
  const startTime = process.hrtime();

  const client = net.connect({ port: 80, host: ip }, () => {
    client.end();
    return { time: process.hrtime(startTime), ip };
  });

  client.on("error", (err) => {
    throw err;
    client.end();
  });
};

ping("midu.dev", (err, info) => {
  if (err) console.error(err);
  console.log(info);
});
