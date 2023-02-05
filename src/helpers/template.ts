export function renderTemplate<T = string | DocumentFragment>(root: ShadowRoot, template: T, data: Object[]): void {
    ;(<DocumentFragment>template) = getTemplate(<string>template)

    for (const entry of data) {
        const render = generateTemplate(entry)
        root.append(render)
    }
}

function getTemplate(id: string): DocumentFragment {
    return (document.getElementById(id) as HTMLTemplateElement).content
}

function generateTemplate(data: Object): DocumentFragment {
    const fragment = new DocumentFragment()
    if (Object.keys(data).length) {
        if (Object.keys(data).indexOf('element')) throw new Error('Invalid paramaters. No element<Object> found.')
        return Object.values(data).reduce((_accumulator, entry): DocumentFragment => {
            const element = document.createElement(entry.type)
            if (entry.attributes) {
                Object.entries(entry.attributes).map(([key, attribute]) => {
                    element.setAttribute(key, attribute)
                })
            }
            fragment.append(element)

            return fragment
        }, [] as DocumentFragment[])
    }
    throw new Error('Something went very wrong.')
}
