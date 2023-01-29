export class Menu extends HTMLElement {
    shadow: ShadowRoot
    constructor() {
        super()
        this.shadow = this.attachShadow({ mode: 'open' })
        const template = document.querySelector('template.menu')!.innerHTML
        this.shadow.innerHTML = template
    }
}

customElements.define('memory-menu', Menu)
