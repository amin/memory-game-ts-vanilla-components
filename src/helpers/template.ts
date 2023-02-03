export function getTemplate(id: string): DocumentFragment {
    return (document.getElementById(id) as HTMLTemplateElement).content
}

export function renderTemplate(root: ShadowRoot, template: DocumentFragment, data?: Array<Object>): void {
    if (!data) return
    let element = template.querySelector('[data-id]')
    if (!(element instanceof Element)) return

    for (const entry of data) {
        element = Object.entries(entry).reduce((element, [key, entry]) => {
            console.log(key)
            console.log(entry)
            return element
        }, document.createElement('div'))

        root.append(element.cloneNode(true))
    }
}
