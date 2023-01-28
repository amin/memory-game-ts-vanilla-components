import './memory.css'

type Difficulty = 'easy' | 'normal' | 'hard'

export class Memory extends HTMLElement {
    cards: HTMLDivElement[]
    constructor() {
        super()
        this.cards = []
        this.attachShadow({ mode: 'open' })
        this.#play('hard')
    }

    #play(difficulty: Difficulty) {
        this.difficulty = difficulty
        this.#generate()
            .then(() => this.#shuffle())
            .then(() => this.#render())
    }

    set difficulty(value: Difficulty) {
        this.setAttribute('difficulty', value)
    }

    get difficulty(): Difficulty {
        return (this.getAttribute('difficulty') as Difficulty) || 'easy'
    }

    async #generate(amount?: number): Promise<void> {
        if (!amount) {
            this.difficulty === 'easy'
                ? (amount = 8)
                : this.difficulty === 'normal'
                ? (amount = 10)
                : this.difficulty === 'hard'
                ? (amount = 12)
                : null

            if (!amount) throw new Error('Invalid difficulty selected.')
        }

        for (let i = 1; i <= amount / 2; i++) {
            const card: HTMLDivElement = document.createElement('div')
            card.classList.add(`memory-card`)
            card.dataset.id = (
                Date.now() + Math.floor(Math.random() * 1000)
            ).toString()

            const img: HTMLImageElement = document.createElement('img')
            img.src = URL.createObjectURL(await this.#getImage())

            this.cards.forEach(async (card) => {
                while (img.src === card!.querySelector('img')!.src) {
                    img.src = URL.createObjectURL(await this.#getImage())
                }
            })

            card.append(img)

            this.cards.push(card)
            this.cards.push(card)
        }
    }

    async #getImage(): Promise<Blob> {
        return await fetch('https://loremflickr.com/240/240/patterns').then(
            (data) => data.blob()
        )
    }

    #shuffle(): void {
        for (let i: number = this.cards.length - 1; i > 0; i--) {
            let j: number = Math.floor(Math.random() * (i + 1))
            ;[this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]]
        }
    }

    #render(): void {
        for (const card of this.cards) {
            this.shadowRoot!.append(card.cloneNode(true))
        }
    }
}

customElements.define('memory-game', Memory)
