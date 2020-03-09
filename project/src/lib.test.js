import { validateEmail, getFormatTime } from "./lib.js";

test("Test validateEmail Function", () => {
  expect(validateEmail("june296@gmail.com")).toBe(true);
  expect(validateEmail("123")).toBe(false);
  expect(validateEmail("")).toBe(false);
});

test("Test getFormatTime Function", () => {
  expect(getFormatTime(12.5)).toMatch("12:30 PM");
  expect(getFormatTime(12)).toMatch("12:00 PM");
  expect(getFormatTime(null)).toMatch("00:00 AM");
});
