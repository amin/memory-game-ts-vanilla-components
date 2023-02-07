import { IImage } from './interfaces'

export function renderTemplate(root: ShadowRoot, template: string, data: IImage[]): void {
    const fragment: DocumentFragment = getTemplate(template)
    console.log(fragment)

    for (const entry of data) {
        const render = generateTemplate(entry)
        root.append(render)
    }
}

function getTemplate(id: string): DocumentFragment {
    return (document.getElementById(id) as HTMLTemplateElement).content
}

function generateTemplate(data: IImage, currentObj: Object): DocumentFragment {
    const objects = Object.getOwnPropertyNames(data).filter((e) => typeof data[e] === 'object')
    const attributes = Object.getOwnPropertyNames(data).filter((e) => typeof data[e] !== 'object')
    for (const object of objects) {
        generateTemplate(data[object], data)
    }
    if (!currentObj) return

    const keys = Object.keys(currentObj)
    const element = keys.reduce((accumulator, key, index) => {
        if (key === 'type') accumulator = document.createElement(currentObj[key])
        if (key === 'attributes')
            Object.entries(currentObj[key]).map(([key, attr]) =>
                accumulator.setAttribute(key, attr)
            )
        return accumulator
    }, Element)
}
