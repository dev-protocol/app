import { xApp } from './element/x-app'
import { init } from './init'
const { history, ethereum } = window

init({ history, ethereum })

window.customElements.define('x-app', xApp)
