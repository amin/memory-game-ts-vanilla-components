import './memory.css'

type Difficulty = 'easy' | 'normal' | 'hard'

export class Memory extends HTMLElement {
    cards: DocumentFragment[]
    img: HTMLImageElement

    constructor() {
        super()
        this.cards = []
        this.img = document.createElement('img')
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
            const fragment = new DocumentFragment()
            const card: HTMLDivElement = document.createElement('div')
            let data: Response = await this.#getImage()
            this.img = document.createElement('img')

            card.classList.add(`memory-card`)
            card.dataset.id = (
                Date.now() + Math.floor(Math.random() * 1000)
            ).toString()

            this.img.src = URL.createObjectURL(await data.blob())
            this.img.dataset.url = data.url

            this.cards.forEach(async (card) => {
                if (
                    card
                        .querySelector('[data-url]')
                        ?.getAttribute('data-url') === data.url
                ) {
                    this.img = document.createElement('img')
                    let data: Response = await this.#getImage()
                    this.img.src = URL.createObjectURL(await data.blob())
                    this.img.dataset.url = data.url
                }
            })

            card.append(this.img)
            fragment.append(card)
            this.cards.push(fragment)
            this.cards.push(fragment)
        }
    }

    async #getImage(): Promise<Response> {
        return await fetch('https://loremflickr.com/240/240/patterns').then(
            (data) => data
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
        this.#bindEvents()
    }

    #bindEvents(): void {
        this.shadowRoot!.querySelectorAll('.memory-card').forEach((card) =>
            card.addEventListener('click', (e) => console.log(e.currentTarget))
        )
    }
}

customElements.define('memory-game', Memory)
