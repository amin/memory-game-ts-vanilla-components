import { getTemplate, renderTemplate } from '../helpers/template'

customElements.define(
  'memory-module',
  class Memory extends HTMLElement {
    root: ShadowRoot
    constructor() {
      super()
      this.root = this.attachShadow({ mode: 'open' })
      this.root.innerHTML = '<style>@import url("./src/memory/memory.css")</style>'
    }

    #createBoard(template: string, data?: Object) {
      renderTemplate(this.root, getTemplate(template), data)
    }

    connectedCallback() {
      this.#createBoard('card')
    }
  }
)

export default customElements.get('memory-component')
