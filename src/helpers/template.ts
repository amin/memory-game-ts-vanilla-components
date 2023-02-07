import { IImage } from './interfaces'

export function renderTemplate(root: ShadowRoot, template: string, data: IImage[]): void {
    const fragment: DocumentFragment = getTemplate(template)
    for (const entry of data) {
        const render = generateTemplate(entry)
        root.append(render)
    }
}

function getTemplate(id: string): DocumentFragment {
    return (document.getElementById(id) as HTMLTemplateElement).content
}

function generateTemplate(data: IImage, currentObj: Object) {
    if (!Object.keys(data).length) throw new Error('Cannot parse data.')
    const objects = Object.getOwnPropertyNames(data).filter((e) => typeof data[e] === 'object')
    const attributes = Object.getOwnPropertyNames(data).filter((e) => typeof data[e] !== 'object')
    for (const object of objects) {
        return generateTemplate(data[object], data)
    }
    return Object.keys(currentObj).reduce((accumulator, key, index) => {
        if (key === 'type') accumulator = document.createElement(currentObj[key])
        if (key === 'attributes')
            Object.entries(currentObj[key]).map(([key, attr]) =>
                accumulator.setAttribute(key, attr)
            )
        return accumulator
    }, Element)
}
