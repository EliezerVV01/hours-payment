import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import state from "../state";
import { addHTML } from "../html";
import { clear, start, stop } from "../timer";
import { DOMElements } from "../utils/dom";

const ONE_HOUR_MS = 3600 * 1000;

describe("start function", () => {
  beforeEach(() => {
    state.isRunning = false;
    state.hours = 0;
    state.payPerHour = 0;

    document.body.innerHTML = `<div id="app"></div>`;
    addHTML();

    vi.useFakeTimers();
  });

  it("should start the timer", () => {
    start();
    expect(state.isRunning).toBe(true);
  });

  it("should update the button label", () => {
    start();
    vi.runOnlyPendingTimers();
    expect(DOMElements.stopStartButton().innerHTML).toBe("Stop");
  });

  it("should update the disable the input", () => {
    start();
    vi.runOnlyPendingTimers();
    expect(DOMElements.payPerHour().disabled).toBe(true);
  });

  it("should hide the clear button", () => {
    start();
    vi.runOnlyPendingTimers();
    expect(DOMElements.clearButton().style.visibility).toBe("hidden");
  });

  afterEach(() => {
    vi.useRealTimers();
  });
});


describe("stop function", () => {
  beforeEach(() => {
    state.isRunning = false;
    state.hours = 0;
    state.payPerHour = 0;

    document.body.innerHTML = `<div id="app"></div>`;
    addHTML();

    vi.useFakeTimers();
  });

  it("should stop the timer", () => {
    start();
    expect(state.isRunning).toBe(true);
    DOMElements.payPerHour().value = "10";
    start();
    vi.advanceTimersByTime(ONE_HOUR_MS)
    vi.runOnlyPendingTimers();
    expect(DOMElements.payPerHour().value).toBe("10.00")
    expect(DOMElements.hoursPay().innerHTML).toBe("10.00")
    expect(DOMElements.hours().innerHTML).toBe("1:00:00")

    stop();
    vi.advanceTimersByTime(ONE_HOUR_MS)

    vi.runOnlyPendingTimers();
    expect(DOMElements.payPerHour().value).toBe("10.00")
    expect(DOMElements.hoursPay().innerHTML).toBe("10.00")
    expect(DOMElements.hours().innerHTML).toMatch("1:00")

  });


  afterEach(() => {
    vi.useRealTimers();
  });
});

describe("clear function", () => {
  beforeEach(() => {
    state.isRunning = false;
    state.hours = 0;
    state.payPerHour = 0;

    document.body.innerHTML = `<div id="app"></div>`;
    addHTML();

    vi.useFakeTimers();
  });

  it("should clear the input", () => {
    start();
    expect(state.isRunning).toBe(true);
    DOMElements.payPerHour().value = "10";
    start();
    vi.advanceTimersByTime(ONE_HOUR_MS)
    vi.runOnlyPendingTimers();
    expect(DOMElements.payPerHour().value).toBe("10.00")
    expect(DOMElements.hoursPay().innerHTML).toBe("10.00")
    expect(DOMElements.hours().innerHTML).toBe("1:00:00")

    stop();
    clear();
    vi.runOnlyPendingTimers();
    expect(DOMElements.payPerHour().value).toBe("0.00")
    expect(DOMElements.hoursPay().innerHTML).toBe("0.00")
    expect(DOMElements.hours().innerHTML).toBe("0:00:00")

  });


  afterEach(() => {
    vi.useRealTimers();
  });
});



describe("hours payment", () => {
  beforeEach(() => {
    state.isRunning = false;
    state.hours = 0;

    document.body.innerHTML = `<div id="app"></div>`;
    addHTML();

    vi.useFakeTimers();
  });

  it("should handle positive values", () => {
    DOMElements.payPerHour().value = "10";
    start();
    vi.advanceTimersByTime(ONE_HOUR_MS)
    vi.runOnlyPendingTimers();
    expect(DOMElements.payPerHour().value).toBe("10.00")
    expect(DOMElements.hoursPay().innerHTML).toBe("10.00")
    expect(DOMElements.hours().innerHTML).toBe("1:00:00")
  });

  it("should treat empty pay per hour as 0", () => {
    DOMElements.payPerHour().value = "";
    start();
    vi.advanceTimersByTime(ONE_HOUR_MS)
    vi.runOnlyPendingTimers();
    expect(DOMElements.payPerHour().value).toBe("0.00")
    expect(DOMElements.hoursPay().innerHTML).toBe("0.00")
    expect(DOMElements.hours().innerHTML).toBe("1:00:00")
  });


  it("should treat negative values as 0", () => {
    DOMElements.payPerHour().value = "-5";
    start();
    vi.advanceTimersByTime(ONE_HOUR_MS)
    vi.runOnlyPendingTimers();
    expect(DOMElements.payPerHour().value).toBe("0.00")
    expect(DOMElements.hoursPay().innerHTML).toBe("0.00")
    expect(DOMElements.hours().innerHTML).toBe("1:00:00")
  });

  afterEach(() => {
    vi.useRealTimers();
  });
});
