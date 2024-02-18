export function addHTML() {
    document.getElementById('app')!.innerHTML = `
    <div class="fluid-container">
    <input id="payPerHour" type="number" placeholder="How much you make an hour?"/>
    <button id="stop-start-button">Start</button>
    <button id="clear-button" class="link" style="visibility: hidden;">Clear</button>
    <div>
      <div>You have worked <span id="hours">0:00:00</span> hours</div>
      <div>And made $<span id="hours-pay">0.00</span> </div>
    </div>
    </div>`;
  }
  