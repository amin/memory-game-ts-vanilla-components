export function getTemplate(id: string): DocumentFragment {
    return (document.getElementById(id) as HTMLTemplateElement).content
}

export function renderTemplate(root: ShadowRoot, template: DocumentFragment, data?: Array<Object>): void {
    if (!data) return
    let element = template.querySelector('[data-id]')
    if (!(element instanceof Element)) return

    for (const entry of data) {
        element = createElement(entry)

        //        root.append(element.cloneNode(true))
    }
}

function createElement<T extends Object>(data: T, fragment?: DocumentFragment): DocumentFragment {
    if (!(fragment instanceof DocumentFragment)) fragment = new DocumentFragment()
    if (!Object.keys(data).length) return fragment
    for (const [key, entry] of Object.entries(data)) {
        // First layer

        if (Object.values(entry).length) {
            if (typeof entry === 'object') createElement(entry, fragment)
            if (key === 'element') {
                const element: HTMLElement = document.createElement(entry.type)
                if (entry.src) (element as HTMLImageElement).src = entry.src
                if (entry.target) element.setAttribute('target', entry.target)
                fragment.append(element)
                createElement(entry, fragment)
            }

            if (key === 'attributes') {
                console.log(entry)
            }
        }
    }
    return fragment
}
