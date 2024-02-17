import './style.css'
import { setupCounter } from './counter.ts'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
<div>
<span id="hours"></span>
hours
</div>
<div id="hours-pay"></div>
<button id="stop-start-button">Stop</button>
`

setupCounter(document.querySelector<HTMLButtonElement>('#counter')!)
