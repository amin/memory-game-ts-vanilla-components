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
    if (Object.keys(data).indexOf('element')) throw new Error('Invalid paramaters. No element<Object> found.')
    if (!Object.keys(data).length) throw new Error('Cannot parse data.')

    const fragment = new DocumentFragment()

    return Object.values(data).reduce((_accumulator, entry) => {
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
