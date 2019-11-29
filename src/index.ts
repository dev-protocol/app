import { xApp } from './element/x-app'
import { init } from './init'
import web3 from 'web3'
const { history } = window

init({ history, web3 })

window.customElements.define('x-app', xApp)
