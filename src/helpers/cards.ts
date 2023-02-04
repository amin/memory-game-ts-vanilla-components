export default {
    settings: {
        api: 'https://picsum.photos/',
        defaultSize: 250,
        defaultPairs: 12,
    },

    getUrl: function (size: string) {
        return new URL(size, this.settings.api).href
    },

    getBoard: async function ({ size = this.settings.defaultSize, pairs = this.settings.defaultPairs }) {
        if (pairs % 2 !== 0) throw new Error('Only even numbers allowed')
        const array = []

        for (let i = parseInt(pairs); i > 0; i--) {
            const response = await this.fetchImg(this.getUrl(size))
            const blob = response.blob()
            const base64 = URL.createObjectURL(await blob)
            array.push(base64)
        }

        return this.shuffle(this.objectFactory(array))
    },

    shuffle: function (array: Array<Object>) {
        return array.reduce((accumulator, element, index, array) => {
            let r = Math.floor((array.length - index) * Math.random() + 1)
            ;[array[index], array[r]] = [array[r], array[index]]
            return array
        }, [])
    },

    objectFactory: function (images: Array<Object>) {
        const data = []
        for (const image of images) {
            data.push(
                {
                    element: {
                        type: 'img',
                        attributes: {
                            src: image,
                        },
                    },
                },
                {
                    element: {
                        type: 'img',
                        attributes: {
                            src: image,
                        },
                    },
                }
            )
        }
        return data
    },

    fetchImg: async function (url: string) {
        try {
            return await fetch(url)
        } catch {
            console.warn('Attempting to fetch content again...')
            return await fetch(url)
        }
    },
}
