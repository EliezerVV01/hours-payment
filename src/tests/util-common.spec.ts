import { describe, expect, it } from "vitest";
import { convertHoursToHHMMSS, fromMillisecondsToHour } from "../utils/common";

describe("convertHoursToHHMMSS", () => {
  it("converts decimal hours to HH:MM:SS format", () => {
    expect(convertHoursToHHMMSS(1.5)).toBe("1:30:00");
    expect(convertHoursToHHMMSS(0.5)).toBe("0:30:00");
    expect(convertHoursToHHMMSS(2.25)).toBe("2:15:00");
  })
  it("converts milliseconds to hours", () => {
    expect(fromMillisecondsToHour(3600000)).toBeCloseTo(1);
    expect(fromMillisecondsToHour(1800000)).toBeCloseTo(0.5);
    expect(fromMillisecondsToHour(900000)).toBeCloseTo(0.25);
  });
});