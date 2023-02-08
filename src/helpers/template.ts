import { IImage } from './interfaces'

export function renderTemplate(root: ShadowRoot, template: string, data: Object[], id): void {
    const fragment: HTMLTemplateElement = getTemplate(template)
    for (const entry of data) {
        const element = generateTemplate(entry)
        const clone = fragment.cloneNode(true)
        clone.querySelector(`[data-element=${id}]`).append(element)
        root.append(clone)
    }
}

function getTemplate(id: string): DocumentFragment {
    return (document.getElementById(id) as HTMLTemplateElement).content
}

function generateTemplate(data: Object, currentObj: Object): DocumentFragment {
    if (!Object.keys(data).length) throw new Error('Cannot parse data.')
    const objects = Object.getOwnPropertyNames(data).filter((e) => typeof data[e] === 'object')

    for (const object of objects) return generateTemplate(data[object], data)

    return Object.keys(currentObj).reduce((accumulator, key, index) => {
        if (key === 'type') accumulator = document.createElement(currentObj[key])
        if (key === 'attributes')
            Object.entries(currentObj[key]).map(([key, attr]) => {
                accumulator.setAttribute(key, attr)
            })
        return accumulator
    }, Element)
}
