import { normalizeLink } from "./normalizeLink.js";
import * as t from "https://deno.land/std/testing/asserts.ts";

Deno.test("normalizeLink", () => {
  t.assertEquals(normalizeLink('abc <a href=https://example.com/>test</a>'), 'abc <a href="https://example.com/">test</a>');
});
