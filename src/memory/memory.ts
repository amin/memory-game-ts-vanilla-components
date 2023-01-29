import '../base.css'

type Difficulty = 1 | 2 | 3

const template = document.createElement('template')
template.innerHTML = `<style>@import '/src/memory/memory.css'</style>`

export class Memory extends HTMLElement {
    cards: DocumentFragment[]
    img: HTMLImageElement
    flipped: number[]
    delay: number
    menu: HTMLElement
    shadow: DocumentFragment

    constructor() {
        super()
        this.cards = []
        this.flipped = []
        this.img = document.createElement('img')
        this.shadow = this.attachShadow({ mode: 'open' })
        this.shadow.appendChild(template.content.cloneNode(true))
        this.menu = document.querySelector('memory-menu')!
    }

    play(difficulty: Difficulty, cards: number) {
        this.#setDelay(difficulty)
        this.#generate(cards)
            .then(() => this.#shuffle())
            .then(() => this.#render())
            .then(() => (this.menu.style.display = 'none'))
    }

    #setDelay(difficulty: Difficulty) {
        difficulty === 1
            ? (this.delay = 2000)
            : difficulty === 2
            ? (this.delay = 1200)
            : difficulty === 3
            ? (this.delay = 800)
            : null
    }

    async #generate(amount: number): Promise<void> {
        for (let i = 1; i <= amount / 2; i++) {
            const fragment = new DocumentFragment()
            let data: Response = await this.#getImage()
            this.img = document.createElement('img')
            const card: HTMLElement = document.createElement('memory-card')
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
            this.shadow.append(card.cloneNode(true))
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
                              this.shadow
                                  .querySelectorAll('memory-card')
                                  .forEach((e) => e.removeAttribute('data-clicked')),
                          this.delay
                      )
              })()
            : this.flipped.push(id)
    }

    #flip(id: number) {
        this.shadow.querySelectorAll(`[data-id="${id}"`).forEach((element) => {
            element.setAttribute('data-completed', '')
            const completed: boolean = Array.from(this.shadow.querySelectorAll('memory-card')).every((e) =>
                e.hasAttribute('data-completed')
            )
            if (completed)
                setTimeout(() => {
                    this.shadow.querySelectorAll('memory-card').forEach((e) => {
                        e.remove()
                    })
                    this.cards = []
                    this.menu.style.display = 'block'
                }, 2000)
        })
    }

    #bindEvents(): void {
        this.shadow.querySelectorAll('memory-card').forEach((card) =>
            card.addEventListener('click', (e) => {
                if (this.shadow.querySelectorAll('[data-clicked]').length === 2) return
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
        return (this.getAttribute('difficulty') as Difficulty) || 1
    }
}

customElements.define('memory-game', Memory)
