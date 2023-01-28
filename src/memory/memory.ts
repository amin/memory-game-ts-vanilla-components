import '../base.css'

type Difficulty = 'easy' | 'medium' | 'hard'

const template = document.createElement('template')
template.innerHTML = `<style>@import '/src/memory/memory.css'</style>`

export class Memory extends HTMLElement {
    cards: DocumentFragment[]
    img: HTMLImageElement
    flipped: number[]
    delay: number

    constructor() {
        super()
        this.cards = []
        this.flipped = []
        this.delay = 0
        this.img = document.createElement('img')
        this.attachShadow({ mode: 'open' })
        this.shadowRoot!.appendChild(template.content.cloneNode(true))
        this.#play('hard', 12)
    }

    #play(difficulty: Difficulty, cards: number) {
        this.difficulty = difficulty
        this.#generate(difficulty, cards)
            .then(() => this.#shuffle())
            .then(() => this.#render())
    }

    async #generate(difficulty: Difficulty, amount?: number): Promise<void> {
        if (!amount) throw new Error('Invalid amount set.')

        difficulty === 'easy'
            ? (this.delay = 2000)
            : this.difficulty === 'medium'
            ? (this.delay = 1200)
            : this.difficulty === 'hard'
            ? (this.delay = 800)
            : null

        for (let i = 1; i <= amount / 2; i++) {
            const fragment = new DocumentFragment()
            let data: Response = await this.#getImage()
            this.img = document.createElement('img')
            const card: HTMLElement = document.createElement('card')
            card.dataset.id = Date.now().toString()

            this.img.src = URL.createObjectURL(await data.blob())
            this.img.dataset.url = data.url

            this.cards.forEach(async (card) => {
                if (card.querySelector('[data-url]')!.getAttribute('data-url') === data.url) {
                    this.img = document.createElement('img')
                    let data: Response = await this.#getImage()
                    this.img.src = URL.createObjectURL(await data.blob())
                    this.img.dataset.url = data.url
                }
            })

            const front = document.createElement('div')
            front.classList.add('card-front')

            const back = document.createElement('div')
            back.classList.add('card-back')

            back.append(this.img)
            front.append('Memory')

            const inner = document.createElement('div')
            inner.classList.add('card-flip')

            inner.append(front, back)

            card.append(inner)
            fragment.append(card)
            this.cards.push(fragment)
            this.cards.push(fragment)
        }
    }

    async #getImage(): Promise<Response> {
        return await fetch('https://loremflickr.com/240/240/scenery').then((data) => data)
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

    #check(id: number): void {
        this.flipped.length
            ? (() => {
                  if (id === this.flipped.shift()) this.#flip(id)
                  if (id !== this.flipped.shift())
                      setTimeout(
                          () =>
                              this.shadowRoot!.querySelectorAll('card').forEach((e) =>
                                  e.removeAttribute('data-clicked')
                              ),
                          this.delay
                      )
              })()
            : this.flipped.push(id)
    }

    #flip(id: number) {
        this.shadowRoot!.querySelectorAll(`[data-id="${id}"`).forEach((element) =>
            element.setAttribute('data-completed', '')
        )
    }

    #bindEvents(): void {
        this.shadowRoot!.querySelectorAll('card').forEach((card) =>
            card.addEventListener('click', (e) => {
                if (this.shadowRoot!.querySelectorAll('[data-clicked]').length === 2) return
                if (!(e.currentTarget as HTMLDivElement).hasAttribute('data-clicked')) {
                    ;(e.currentTarget as HTMLDivElement).setAttribute('data-clicked', '')
                    this.#check(Number((e.currentTarget as HTMLDivElement).getAttribute('data-id')))
                }
            })
        )
    }

    set difficulty(value: Difficulty) {
        this.setAttribute('difficulty', value)
    }

    get difficulty(): Difficulty {
        return (this.getAttribute('difficulty') as Difficulty) || 'easy'
    }
}

customElements.define('memory-game', Memory)
