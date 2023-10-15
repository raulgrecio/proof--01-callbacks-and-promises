import { ping } from "../solutions/index.js";

import { describe, it } from "node:test";
import { equal, ifError } from "node:assert/strict";

describe("1. ping", () => {
  it("1.1. ping raul.dev", (_, done) => {
    ping("raul.dev", (err, info) => {
      ifError(err);
      equal(info.ip, "raul.dev");
      done();
    });
  });
});
