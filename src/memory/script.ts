import { renderTemplate } from '../helpers/template'
import { IImage } from '../helpers/interfaces'
import getCards from '../helpers/cards'

export class Memory extends HTMLElement {
  root: ShadowRoot
  constructor() {
    super()
    this.root = this.attachShadow({ mode: 'open' })
    this.root.innerHTML = '<style>@import url("./src/memory/style.css")</style>'
  }

  connectedCallback() {
    getCards().then((data) => {
      renderTemplate(this.root, 'card', data as IImage[])
    })
  }
}

customElements.define('memory-module', Memory)
