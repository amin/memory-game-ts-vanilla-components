export class Menu extends HTMLElement {
    shadow: ShadowRoot
    play: HTMLElement
    memory: any

    constructor() {
        super()
        this.shadow = this.attachShadow({ mode: 'open' })
        const template: string | null = document.querySelector('template.menu')!.innerHTML
        this.shadow.innerHTML = template
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
