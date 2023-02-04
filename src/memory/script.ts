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
        id: Date.now() + Math.floor(Math.random() * 1000),
        element: {
          target: 'data-back',
          type: 'img',
          src: 'https://picsum.photos/200',
          attributes: {
            alt: 'a memory piece',
          },
        },
      },
      {
        id: Date.now() + Math.floor(Math.random() * 1000),
        element: {},
      },
      {
        id: Date.now() + Math.floor(Math.random() * 1000),
      },
    ])
  }
}
