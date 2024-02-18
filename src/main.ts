import { addHTML } from "./html";
import state from "./state";
import "./style.css";
import { clear, start } from "./timer";
import { DOMElements } from "./utils/dom";

addHTML()

DOMElements.stopStartButton().addEventListener("click", toggle);
DOMElements.clearButton().addEventListener("click", clear);

function toggle() {
  state.isRunning ? stop() : start();
}
