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

  #generateBoard(template: string, data: IImage[]) {
    renderTemplate(this.root, template, data)
  }

  connectedCallback() {
    getCards().then((data) => {
      this.#generateBoard('card', data as IImage[])
    })
  }
}
