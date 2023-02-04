export function getTemplate(id: string): DocumentFragment {
    return (document.getElementById(id) as HTMLTemplateElement).content
}

export function renderTemplate(root: ShadowRoot, template: DocumentFragment, data?: Array<Object>): void {
    if (!data) return
    const element: HTMLDivElement | null = template.querySelector('[data-id]')
    if (!(element instanceof Element)) return

    for (const entry of data) {
        const render = createElements(entry)
        console.log(render)
    }
}

function createElements(data: Object): Array<HTMLDivElement> | boolean {
    const fragment = new DocumentFragment()
    if (Object.keys(data).length) {
        if (Object.keys(data).indexOf('element')) throw new Error('Invalid paramaters. No element<Object> found.')
        return Object.values(data).reduce((accumulator, entry): HTMLDivElement[] => {
            const element = document.createElement(entry.type)
            if (entry.attributes) {
                Object.entries(entry.attributes).map(([key, attribute]) => {
                    element.setAttribute(key, attribute)
                })
            }
            fragment.append(element)
            return fragment ? fragment : accumulator
        }, [] as HTMLDivElement[])
    }
    throw new Error('Something went wrong.')
}
