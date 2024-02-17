import state from "./state";
import "./style.css";
import { fromMillisecondsToHour } from "./utils/common";
import { DOMElements } from "./utils/dom";

DOMElements.stopStartButton().addEventListener("click", toggle);
DOMElements.clearButton().addEventListener("click", clear);

function toggle() {
  state.isRunning ? stop() : start();
}

function stop() {
  clearInterval(state.interval);
  state.isRunning = false;
  state.isClearVisible = true;
}

function start() {
  const parsedPayPerHour = parseFloat(DOMElements.payPerHour().value);
  state.payPerHour = !isNaN(parsedPayPerHour)? parsedPayPerHour : 0
  state.lastUpdateTime = Date.now();
  state.isRunning = true;
  state.isClearVisible = false;
  state.interval = setInterval(updateHoursPayment, 1000);
}

function updateHoursPayment() {
  const crossedTime = Date.now() - state.lastUpdateTime;
  state.lastUpdateTime = Date.now();
  state.hours += fromMillisecondsToHour(crossedTime)
}

function clear() {
  state.hours = 0;
  state.payPerHour = 0;
  state.isRunning = false;
  state.interval = 0;
}