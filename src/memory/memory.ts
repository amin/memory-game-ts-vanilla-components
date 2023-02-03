customElements.define(
  'memory-module',
  class Memory extends HTMLElement {
    shadow: ShadowRootInit
    constructor() {
      super()
      this.shadow = this.attachShadow({ mode: 'open' })
    }
  }
)

export default customElements.get('memory-component')
import './memory.css'
