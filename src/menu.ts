export class Menu extends HTMLElement {
    root: ShadowRoot

    constructor() {
        super()
        this.root = this.attachShadow({ mode: 'open' })
    }
}

customElements.define('menu-module', Menu)
