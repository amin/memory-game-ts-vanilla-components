import { getTemplate, renderTemplate } from '../helpers/template'

export class Memory extends HTMLElement {
  root: ShadowRoot
  constructor() {
    super()
    this.root = this.attachShadow({ mode: 'open' })
    this.root.innerHTML = '<style>@import url("./src/memory/style.css")</style>'
  }

  #createBoard(template: string, data?: Array<Object>) {
    renderTemplate(this.root, getTemplate(template), data)
  }

  connectedCallback() {
    this.#createBoard('card', [
      {
        element: {
          type: 'img',
          attributes: {
            alt: 'a third piece',
            src: 'https://picsum.photos/200?' + Date.now() + Math.floor(Math.random() * 1000),
            target: 'data-back',
          },
        },
      },
      {
        element: {
          type: 'img',
          attributes: {
            alt: 'a third piece',
            src: 'https://picsum.photos/200?' + Date.now() + Math.floor(Math.random() * 1000),
            target: 'data-back',
          },
        },
      },
      {
        element: {
          type: 'a',
          attributes: {
            alt: 'abdulla',
            src: 'https://picsum.photos/200?' + Date.now() + Math.floor(Math.random() * 1000),
            target: 'data-back',
          },
        },
      },
    ])
  }
}
