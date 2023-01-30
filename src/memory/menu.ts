export class Menu extends HTMLElement {
    shadow: ShadowRoot
    play: HTMLElement
    memory: any

    constructor() {
        super()

        const template: HTMLTemplateElement | null = document.querySelector('template#menu')
        if (!(template instanceof HTMLTemplateElement)) return

        this.shadow = this.attachShadow({ mode: 'open' })
        this.shadow.append(template.content.cloneNode(true))
        this.memory = document.querySelector('memory-game')!
        this.#factory()
        this.#bindEvents()
    }

    #factory() {
        this.play = this.shadow.querySelector('.menu__button--play')!
    }

    #bindEvents() {
        this.play.addEventListener('click', () => {
            const difficulty: number = parseInt(
                (this.shadow.querySelector('input[type="range"]') as HTMLInputElement).value
            )
            this.memory.play(difficulty, 12)
        })
    }
}

customElements.define('memory-menu', Menu)
