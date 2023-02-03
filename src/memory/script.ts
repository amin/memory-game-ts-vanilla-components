import { getTemplate, renderTemplate } from '../helpers/template'

export class Memory extends HTMLElement {
  root: ShadowRoot
  constructor() {
    super()
    this.root = this.attachShadow({ mode: 'open' })
    this.root.innerHTML = '<style>@import url("./src/memory/style.css")</style>'
  }

  #createBoard(template: string, data?: Object) {
    renderTemplate(this.root, getTemplate(template), data)
  }

  connectedCallback() {
    this.#createBoard('card')
  }
}
