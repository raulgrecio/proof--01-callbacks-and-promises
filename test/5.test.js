/* cSpell:disable */
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
