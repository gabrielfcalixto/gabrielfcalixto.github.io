// Cria um elemento com atributos e filhos, sem usar innerHTML.
function el(tag, attrs = {}, ...filhos) {
    const node = document.createElement(tag);
    for (const [chave, valor] of Object.entries(attrs)) {
        if (valor === false || valor == null) continue;
        if (chave === "class") node.className = valor;
        else if (chave === "text") node.textContent = valor;
        else node.setAttribute(chave, valor === true ? "" : valor);
    }
    node.append(...filhos.filter(Boolean));
    return node;
}

const icone = (classes) => el("i", { class: classes, "aria-hidden": "true" });
