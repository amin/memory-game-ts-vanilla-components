import { getTemplate, renderTemplate } from '../helpers/template'
import card from '../helpers/cards'

export class Memory extends HTMLElement {
  root: ShadowRoot
  constructor() {
    super()
    this.root = this.attachShadow({ mode: 'open' })
    this.root.innerHTML = '<style>@import url("./src/memory/style.css")</style>'
  }

  #createBoard(template: string, data?: Object[]) {
    renderTemplate(this.root, getTemplate(template), data)
  }

  connectedCallback() {
    card.getBoard({ pairs: 12 }).then((data) => {
      this.#createBoard('card', data as Object[])
    })
  }
}
