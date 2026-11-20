function renderSocial(lista) {
    document.querySelectorAll("[data-social]").forEach((ul) => {
        ul.replaceChildren(...lista.map(({ nome, url, icone: ic }) =>
            el("li", {}, el("a", { href: url, target: "_blank", rel: "noopener", "aria-label": nome }, icone(ic)))
        ));
    });
}

function renderSkills(lista) {
    const ul = document.querySelector("[data-skills]");
    if (!ul) return;
    ul.replaceChildren(...lista.map(({ nome, icone: ic }) =>
        el("li", { class: "skill" }, icone(ic + " colored"), el("span", { text: nome }))
    ));
    const faixa = ul.closest(".skills__showcase");
    const copia = ul.cloneNode(true);
    delete copia.dataset.skills;
    copia.setAttribute("aria-hidden", "true");
    ul.parentElement.append(copia);

    const botao = faixa.querySelector(".skills__motion");
    botao.hidden = false;
    botao.addEventListener("click", () => {
        const pausado = faixa.classList.toggle("is-paused");
        botao.setAttribute("aria-pressed", String(pausado));
        botao.firstElementChild.textContent = pausado ? "▶" : "Ⅱ";
    });
}

function renderStats(lista) {
    const ul = document.querySelector("[data-stats]");
    if (!ul) return;
    ul.replaceChildren(...lista.map(({ valor, rotulo, github }) =>
        el("li", { class: "stat reveal" },
            el("strong", { class: "stat__value", "data-count": valor, "data-github": github, text: "+0" }),
            el("span", { class: "stat__label", text: rotulo })
        )
    ));
}

function renderProjetos(lista) {
    const grid = document.querySelector("[data-projects]");
    if (!grid) return;
    const dialog = document.querySelector("#project-dialog");
    dialog.addEventListener("click", event => {
        if (event.target !== dialog) return;
        const box = dialog.getBoundingClientRect();
        if (event.clientX < box.left || event.clientX > box.right ||
            event.clientY < box.top || event.clientY > box.bottom) dialog.close();
    });

    grid.replaceChildren(...lista.map(({ titulo, descricao, imagem, tags = [], link }, indice) => {
        const tituloId = "card-title-" + indice;
        const botao = el("button", {
            type: "button", class: "card__details", text: "Ver detalhes",
            "aria-haspopup": "dialog", "aria-describedby": tituloId
        });
        botao.addEventListener("click", () => {
            const foto = dialog.querySelector("img");
            foto.src = imagem;
            foto.alt = traduzir(titulo);
            dialog.querySelector("h2").textContent = traduzir(titulo);
            dialog.querySelector(".card__text").textContent = traduzir(descricao);
            dialog.querySelector(".tags").replaceChildren(...tags.map(tag => el("li", { text: traduzir(tag) })));
            const destino = dialog.querySelector("a");
            destino.hidden = !link;
            if (link) destino.href = link;
            else destino.removeAttribute("href");
            dialog.querySelector(".card__link--off").hidden = Boolean(link);
            dialog.showModal();
        });

        return el("article", { class: "card reveal" },
            el("div", { class: "card__media" },
                el("img", { src: imagem, alt: "", loading: "lazy", width: 400, height: 225 })
            ),
            el("div", { class: "card__body" },
                el("h3", { id: tituloId, class: "card__title", text: titulo }),
                botao
            )
        );
    }));
}
