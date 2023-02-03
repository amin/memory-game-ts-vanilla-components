import { getTemplate, renderTemplate } from '../helpers/template'

customElements.define(
  'memory-module',
  class Memory extends HTMLElement {
    root: ShadowRoot
    constructor() {
      super()
      const sheet = new CSSStyleSheet()
      this.root = this.attachShadow({ mode: 'open' })
      this.root.adoptedStyleSheets = [sheet]

      this.#createBoard('memory-card')
    }
    #createBoard(template: string, data?: Object) {
      renderTemplate(this.root, getTemplate(template), data)
    }
  }
)

export default customElements.get('memory-component')
import './memory.css'
