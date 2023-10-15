import { delay } from "../solutions/index.js";

import { describe, it } from "node:test";
import { strictEqual } from "node:assert/strict";

describe("5. delay", () => {
  it("5.1. delay", async () => {
    const start = Date.now();
    const delayTime = 1000;

    await delay(delayTime);

    const end = Date.now();
    const elapsed = end - start;

    // Utiliza la función 'strictEqual' de 'assert' para verificar si el tiempo transcurrido es igual o mayor que el tiempo de retraso
    strictEqual(
      elapsed >= delayTime,
      true,
      `La promesa se resolvió antes de lo esperado: ${elapsed}ms en lugar de ${delayTime}ms`
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
        `La promesa se resolvió antes de lo esperado: ${elapsed}ms en lugar de ${delayTime}ms`
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
