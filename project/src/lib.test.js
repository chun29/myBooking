import { add, avg } from "./lib.js";
test("Test Add Function", () => {
  expect(add(3, 4)).toBe(7);
  expect(add(undefined, 4)).toBeNaN();
  expect(add("7", 8)).toBe(15);
});
