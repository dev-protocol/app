import { xApp } from './element/x-app'
import { init } from './init'
import web3 from 'web3'
const { history } = window
const { pushState } = history

init({ pushState, web3 })

window.customElements.define('x-app', xApp)
