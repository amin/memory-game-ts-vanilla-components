export interface IImage {
    element: {
        type: string
        attributes: {
            src: Object
        }
    }
}

export interface IOptions {
    api: {
        url: string
    }
    size: number
    pairs: number
}
