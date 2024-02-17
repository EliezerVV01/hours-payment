import { updateDomToReflectState } from "./utils/dom";


const state = {
  hours: 0,
  payPerHour: 0,
  isRunning: false,
  lastUpdateTime: Date.now(),
  interval: 0,
  payPerSecond: function () {
    return this.payPerHour / 3600;
  },
  getPay: function () {
    return this.hours * this.payPerHour;
  },
  isClearVisible: false,
};

type State = typeof state

const handler: ProxyHandler<State> = {
  set(target, prop: keyof State, value: State[keyof State]) {
    //@ts-ignore
    target[prop] = value;
    setTimeout(() => updateDomToReflectState())
    return true
  },
};

export default new Proxy(state, handler);
