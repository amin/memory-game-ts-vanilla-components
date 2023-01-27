export class Memory extends HTMLElement {
    cards: HTMLElement[]

    constructor() {
        super()
        this.cards = []
        this.attachShadow({ mode: 'open' })
        this.#generateCardsArray(12)
            .then(() => this.#shuffle())
            .then(() => this.#render())
    }

    #render(): void {
        for (const card of this.cards) {
            this.shadowRoot?.append(card.cloneNode(true))
        }
    }

    #shuffle() {
        for (let i = this.cards.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1))
            ;[this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]]
        }
    }

    async #generateCardsArray(amount: number) {
        for (let i = 1; i <= amount / 2; i++) {
            const card: HTMLElement = document.createElement('div')
            card.classList.add(`memory-card`)
            card.dataset.id = (
                Date.now() + Math.floor(Math.random() * 100)
            ).toString()

            const img = document.createElement('img')
            img.src = await this.#getImage()

            this.cards.forEach(async (card) => {
                while (img.src === card?.querySelector('img')?.src) {
                    img.src = await this.#getImage()
                }
            })

            card.append(img)

            this.cards.push(card)
            this.cards.push(card)
        }
    }

    async #getImage() {
        return await fetch('https://loremflickr.com/320/240/patterns').then(
            (data) => data.url
        )
    }
}

customElements.define('memory-game', Memory)
