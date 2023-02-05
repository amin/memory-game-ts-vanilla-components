interface IImage {
    element: {
        type: string
        attributes: {
            src: Object
        }
    }
}

interface IOptions {
    api: {
        url: string
    }
    size: number
    pairs: number
}

export default {
    options: {
        api: {
            url: 'https://picsum.photos/',
        },
        size: 250,
        pairs: 6,
    } satisfies IOptions,

    get: async function (this, { size = this.options.size as number, pairs = this.options.pairs as number } = {}): Promise<Object> {
        const array = []

        for (let i = pairs; i > 0; i--) {
            try {
                const response = (await this.grabImages(this.grabUrl(size))) as Response
                const blob = await response.blob()
                const base64 = URL.createObjectURL(blob)
                array.push(base64)
            } catch (e) {
                console.error(e)
                throw new Error('Error parsing blobs.')
            }
        }

        return this.shuffle(this.objectFactory(array))
    },

    grabUrl: function (size: number): string {
        return new URL(size.toString() + `?${Date.now() + Math.floor(Math.random() * 1000)}`, this.options.api.url).href
    },

    grabImages: async function (url: string): Promise<Object> {
        try {
            return await fetch(url)
        } catch (e) {
            console.error(e)
            console.warn('Attempting to fetch content...')
            return new Promise((resolve) => setTimeout(async () => resolve(await fetch(url)), 3000))
        }
    },

    shuffle: function (array: Object[]) {
        return array.reduce((_accumulator, _element, index, array) => {
            let r = Math.floor((array.length - index) * Math.random() + 1)
            ;[array[index], array[r]] = [array[r], array[index]]
            return array
        }, [])
    },

    objectFactory: function (images: Object[]): Object[] {
        const data = []
        for (const image of images) {
            data.push({
                element: {
                    type: 'img',
                    attributes: {
                        src: image,
                    },
                },
            } satisfies IImage)
        }
        return [...data, ...data]
    },
}
