import { xApp } from './element/x-app'
import { route } from './store/route'
const { customElements, history } = window

customElements.define('x-app', xApp)

route.subscribe(x => history.pushState(undefined, '', x))
