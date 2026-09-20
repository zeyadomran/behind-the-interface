import test from "node:test";
import assert from "node:assert/strict";

test("temporary check: branch protection must block this PR", () => {
  assert.fail(
    "Intentional failure to verify the required CI merge gate; remove before merge.",
  );
});
