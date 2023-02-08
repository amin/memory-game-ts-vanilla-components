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

function generateTemplate(data: any, currentObj?: any): DocumentFragment {
    if (!Object.keys(data).length) throw new Error('Cannot parse data.')
    const objects: string[] = Object.getOwnPropertyNames(data).filter((e) => typeof data[e] === 'object')
    for (const object of objects) return generateTemplate(data[object], data)

    return Object.keys(currentObj).reduce((accumulator: any, key: any) => {
        if (key === 'type') accumulator = document.createElement(currentObj[key])
        if (key === 'attributes')
            Object.entries(currentObj[key]).map(([key, attr]) => {
                accumulator.setAttribute(key, attr)
            })
        return accumulator
    }, HTMLElement)
}
