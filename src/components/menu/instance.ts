export class Menu extends HTMLElement {
    root: ShadowRoot
    $app: HTMLElement
    constructor() {
        super()
        this.$app = document.getElementById('app')!
        this.root = this.attachShadow({ mode: 'open' })
        this.root.innerHTML = '<a href="/" data-start-game>Start Memory game</a>'
        this.root.addEventListener('click', (e) => {
            e.preventDefault()
            this.$app.append(document.createElement('game-instance'))
        })
    }
}

customElements.define('game-menu', Menu)
