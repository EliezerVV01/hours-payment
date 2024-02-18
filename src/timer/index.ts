import state from "../state";
import { fromMillisecondsToHour } from "../utils/common";
import { DOMElements } from "../utils/dom";

export function stop() {
  clearInterval(state.interval);
  state.isRunning = false;
  state.isClearVisible = true;
}

export function start() {
  const parsedPayPerHour = parseFloat(DOMElements.payPerHour().value);
  state.payPerHour =
    !isNaN(parsedPayPerHour) && parsedPayPerHour > 0 ? parsedPayPerHour : 0;
  state.lastUpdateTime = Date.now();
  state.isRunning = true;
  state.isClearVisible = false;
  state.interval = setInterval(updateHoursPayment, 1000);
}

export function updateHoursPayment() {
  if(!state.isRunning) return;
  const crossedTime = Date.now() - state.lastUpdateTime;
  state.lastUpdateTime = Date.now();
  state.hours += fromMillisecondsToHour(crossedTime);
}

export function clear() {
  state.hours = 0;
  state.payPerHour = 0;
  state.isRunning = false;
  state.interval = 0;
}
