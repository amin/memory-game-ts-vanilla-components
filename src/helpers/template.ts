import { IImage } from './interfaces'

export function renderTemplate(root: ShadowRoot, template: string, data: Object[], id: string): void {
    const fragment: HTMLTemplateElement = getTemplate(template)
    for (const entry of data) {
        const element = generateTemplate(entry)
        const clone = fragment.content.cloneNode(true) as HTMLElement
        const container = clone.querySelector(`[data-element=${id}]`)
        if (container instanceof Element) {
            container.append(element)
            root.append(clone)
        }
    }
}

function getTemplate(id: string): HTMLTemplateElement {
    return document.querySelector(`template[name=${id}]`) as HTMLTemplateElement
}

function generateTemplate<T extends Object>(data: T, currentObj?: IImage): HTMLElement {
    if (!Object.keys(data).length) throw new Error('Cannot parse data.')
    const objects: string[] = Object.getOwnPropertyNames(data).filter((e) => typeof data[e as keyof T] === 'object')
    for (const object of objects) return generateTemplate(data[object as keyof Object], data as unknown as J)

    return Object.keys(currentObj as IImage).reduce((accumulator: HTMLElement, key: string): HTMLElement => {
        if (!currentObj) return accumulator
        if (key === 'type') accumulator = document.createElement(currentObj[key])
        if (key === 'attributes')
            Object.entries(currentObj[key]).map(([key, attr]): void => {
                accumulator.setAttribute(key, attr as unknown as string)
            })

        return accumulator
    }, document.createElement('div') as HTMLElement)
}
