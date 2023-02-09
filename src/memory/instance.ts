import { renderTemplate } from '../helpers/template'
import { IImage } from './interfaces'
import getCards from './cardUtils'

export class Memory extends HTMLElement {
  root: ShadowRoot

  constructor() {
    super()
    this.root = this.attachShadow({ mode: 'open' })
  }

  connectedCallback() {
    getCards().then((data) => {
      renderTemplate(this.root, 'memory-card', data as IImage[], 'card-back')
    })
  }
}

customElements.define('game-instance', Memory)
