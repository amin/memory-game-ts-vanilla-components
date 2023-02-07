import { IImage } from './interfaces'

const utils = {
    getCards: async ({ size = 250 as number, pairs = 6 as number } = {}): Promise<Object> => {
        const array: string[] = []

        for (let i = pairs; i > 0; i--) {
            try {
                const response = (await utils.grabImages(utils.grabUrl(size))) as Response
                const blob = await response.blob()
                const base64 = URL.createObjectURL(blob)
                array.push(base64)
            } catch (e) {
                console.error(e)
                throw new Error('Error parsing blobs.')
            }
        }

        return utils.shuffle(utils.objectFactory(array))
    },

    grabUrl: function (size: number): string {
        return new URL(
            size.toString() + `?hash=${Date.now() + Math.floor(Math.random() * 1000)}`,
            'https://picsum.photos/'
        ).href
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

    shuffle: function (array: Object[]): Object[] {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1))
            ;[array[i], array[j]] = [array[j], array[i]]
        }
        return array
    },

    objectFactory: function (images: string[]): IImage[] {
        const data = []
        for (const image of images) {
            data.push({
                element: {
                    type: 'img',
                    attributes: {
                        src: image,
                        target: 'alt=""',
                    },
                },
            } satisfies IImage)
        }
        return [...data, ...data]
    },
}

export default utils.getCards
