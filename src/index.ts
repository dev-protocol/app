import { xApp } from './element/x-app'
import { init } from './init'
const { history } = window

init({ history })

window.customElements.define('x-app', xApp)
