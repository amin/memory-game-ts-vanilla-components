export default {
    settings: {
        api: 'https://picsum.photos/',
        size: 250,
        pairs: 6,
    },

    get: async function (this, { size = this.settings.size as number, pairs = this.settings.pairs as number } = {}): Promise<Object> {
        const array = []

        for (let i = pairs; i > 0; i--) {
            const response: Response = (await this.grabImages(this.grabUrl(size))) as Response
            const blob: Blob = await response.blob()
            const base64 = URL.createObjectURL(blob)
            array.push(base64)
        }

        return this.shuffle(this.objectFactory(array))
    },

    grabUrl: function (size: number) {
        return new URL(size.toString() + `?${Date.now() + Math.floor(Math.random() * 1000)}`, this.settings.api).href
    },

    grabImages: async function (url: string) {
        try {
            return await fetch(url)
        } catch (e) {
            console.error(e)
            console.warn('Attempting to fetch content...')
            return new Promise((resolve) => setTimeout(async () => resolve(await fetch(url)), 3000))
        }
    },

    shuffle: function (array: Array<Object>) {
        return array.reduce((_accumulator, _element, index, array) => {
            let r = Math.floor((array.length - index) * Math.random() + 1)
            ;[array[index], array[r]] = [array[r], array[index]]
            return array
        }, [])
    },

    objectFactory: function (images: Array<Object>) {
        const data = []
        for (const image of images) {
            data.push({
                element: {
                    type: 'img',
                    attributes: {
                        src: image,
                    },
                },
            })
        }
        return [...data, ...data]
    },
}
