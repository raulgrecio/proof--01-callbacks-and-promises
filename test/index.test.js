/* cSpell:disable */
import {
  ping,
  obtenerDatosPromise,
  procesarArchivoPromise,
  procesarArchivo,
  leerArchivos,
  delay,
} from "../solutions/index.js";

import { describe, it, afterEach } from "node:test";
import { equal, ifError, strictEqual } from "node:assert/strict";
import { unlinkSync, writeFileSync } from "node:fs";
import { readFile } from "node:fs/promises";

describe("1. ping", () => {
  it("1.1. ping raul.dev", (_, done) => {
    ping("raul.dev", (err, info) => {
      ifError(err);
      equal(info.ip, "raul.dev");
      done();
    });
  });
});

describe("2. obtenerDatosPromise", () => {
  it("2.1. obtenerDatosPromise", async () => {
    const { data } = await obtenerDatosPromise({ time: 1 });
    equal(data, "datos importantes");
  });
});

describe("3. procesarArchivoPromise", () => {
  afterEach(() => {
    try {
      unlinkSync("output.txt");
    } catch {}
  });

  it("3.1. procesarArchivo", (t, done) => {
    writeFileSync("input.txt", "gogogo");
    procesarArchivo((err) => {
      ifError(err);
      readFile("output.txt", "utf8").then((contenido) => {
        equal(contenido, "GOGOGO");
        done();
      });
    });
  });

  it("3.2. procesarArchivoPromise", async () => {
    writeFileSync("input.txt", "hola");
    await procesarArchivoPromise();
    const contenido = await readFile("output.txt", "utf8");
    equal(contenido, "HOLA");
  });
});

describe("4. leerArchivos", () => {
  it("4.1. leerArchivos", async () => {
    const mensaje = await leerArchivos();
    equal(mensaje, "hola qué tal");
  });
});

describe("5. delay", () => {
  it("5.1. delay", async () => {
    const start = Date.now();
    const delayTime = 1000;

    await delay(delayTime);

    const end = Date.now();
    const elapsed = end - start;

    strictEqual(
      elapsed >= delayTime,
      true,
      `The promise was resolved sooner than expected: ${elapsed}ms instead of ${delayTime}ms`
    );

    console.log({
      start,
      delayTime,
      end,
      elapsed,
      strictEqual: elapsed >= delayTime,
    });
  });

  it("5.2. delay", () => {
    const start = Date.now();
    const delayTime = 3000;

    delay(delayTime).then(() => {
      const end = Date.now();
      const elapsed = end - start;

      strictEqual(
        elapsed >= delayTime,
        true,
        `The promise was resolved sooner than expected: ${elapsed}ms instead of ${delayTime}ms`
      );

      console.log({
        start,
        delayTime,
        end,
        elapsed,
        strictEqual: elapsed >= delayTime,
      });
    });
  });
});
