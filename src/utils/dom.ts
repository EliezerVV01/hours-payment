import state from "../state";
import { convertHoursToHHMMSS } from "./common";

export const DOMElements = {
  hours: () => document.getElementById("hours")!,
  payPerHour: () => document.getElementById("payPerHour") as HTMLInputElement,
  hoursPay: () => document.getElementById("hours-pay")!,
  stopStartButton: () => document.getElementById("stop-start-button")!,
  clearButton: () => document.getElementById("clear-button")!,
};

export function updateDomToReflectState() {
  DOMElements.payPerHour().value = state.payPerHour.toFixed(2)
  DOMElements.hours().innerHTML = convertHoursToHHMMSS(state.hours)
  DOMElements.hoursPay().innerHTML = state.getPay().toFixed(2);

  if(state.isRunning) {
    DOMElements.stopStartButton().innerHTML = "Stop"
    DOMElements.payPerHour().disabled = true;
  } else {
    DOMElements.stopStartButton().innerHTML = "Restart"
    DOMElements.payPerHour().disabled = false;
  }

  if(state.isClearVisible) {
    DOMElements.clearButton().style.visibility = "visible"
  } else {
    DOMElements.clearButton().style.visibility = "hidden"
  }
}
