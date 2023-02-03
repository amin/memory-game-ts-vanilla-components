export function getTemplate(id: string): DocumentFragment {
    return (document.getElementById(id) as HTMLTemplateElement).content
}

export function renderTemplate(Shadow: ShadowRoot, template: DocumentFragment, data?: Object): void {
    console.log(data)
    Shadow.appendChild(template)
}
