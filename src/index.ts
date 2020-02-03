import { xApp } from './element/x-app'
import { init } from './init'
import { xTry } from './element/x-try'
const { history, ethereum } = window

init({ history, ethereum })

window.customElements.define('x-app', xApp)
window.customElements.define('x-try', xTry)
