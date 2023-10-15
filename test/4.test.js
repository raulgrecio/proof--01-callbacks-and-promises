import { leerArchivos } from "../solutions/index.js";

import { describe, it } from "node:test";
import { equal } from "node:assert/strict";

describe("4. leerArchivos", () => {
  it("4.1. leerArchivos", async () => {
    const mensaje = await leerArchivos();
    equal(mensaje, "hola qué tal");
  });
});
