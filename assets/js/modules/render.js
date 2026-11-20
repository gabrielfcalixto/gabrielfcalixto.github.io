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
        el("li", { class: "skill" }, icone(ic), el("span", { text: nome }))
    ));
    const copia = ul.cloneNode(true);
    delete copia.dataset.skills;
    copia.setAttribute("aria-hidden", "true");
    ul.parentElement.append(copia);
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

function prepararGaleria(dialog) {
    const galeria = dialog.querySelector(".project-gallery");
    const faixa = galeria.querySelector(".project-gallery__track");
    const controles = galeria.querySelector(".project-gallery__controls");
    const posicao = galeria.querySelector(".project-gallery__position");
    const pausa = galeria.querySelector("[data-gallery-pause]");
    const reduzirMovimento = matchMedia("(prefers-reduced-motion: reduce)");
    let timer;
    let mouseSobreGaleria = false;
    let inicioToque;

    function slideAtual() {
        return Math.round(faixa.scrollLeft / (faixa.clientWidth || 1));
    }

    function atualizarPosicao() {
        const texto = `${slideAtual() + 1} / ${faixa.childElementCount}`;
        if (posicao.textContent !== texto) posicao.textContent = texto;
    }

    function mover(direcao, automatico = false) {
        const total = faixa.childElementCount;
        const destino = slideAtual() + direcao;
        const indice = (destino + total) % total;
        posicao.setAttribute("aria-live", automatico ? "off" : "polite");
        faixa.scrollTo({
            left: indice * faixa.clientWidth,
            behavior: destino === indice ? "auto" : "instant",
        });
    }

    faixa.addEventListener("scroll", atualizarPosicao, { passive: true });
    faixa.addEventListener("touchstart", (evento) => {
        inicioToque = evento.touches.length === 1 ? evento.touches[0] : undefined;
    }, { passive: true });
    faixa.addEventListener("touchend", (evento) => {
        const inicio = inicioToque;
        inicioToque = undefined;
        if (!inicio || controles.hidden || evento.touches.length) return;
        const fim = evento.changedTouches[0];
        const horizontal = fim.clientX - inicio.clientX;
        const vertical = fim.clientY - inicio.clientY;
        if (Math.abs(horizontal) >= 40 && Math.abs(horizontal) > Math.abs(vertical)) {
            mover(horizontal < 0 ? 1 : -1);
        }
    }, { passive: true });
    faixa.addEventListener("touchcancel", () => { inicioToque = undefined; }, { passive: true });
    galeria.querySelector("[data-gallery-prev]").addEventListener("click", () => mover(-1));
    galeria.querySelector("[data-gallery-next]").addEventListener("click", () => mover(1));
    pausa.addEventListener("click", () => {
        const pausado = pausa.getAttribute("aria-pressed") === "false";
        pausa.setAttribute("aria-pressed", String(pausado));
        pausa.firstElementChild.textContent = pausado ? "▶" : "Ⅱ";
    });
    galeria.addEventListener("keydown", (evento) => {
        if (controles.hidden || (evento.key !== "ArrowLeft" && evento.key !== "ArrowRight")) return;
        evento.preventDefault();
        mover(evento.key === "ArrowLeft" ? -1 : 1);
    });
    galeria.addEventListener("pointerenter", (evento) => {
        if (evento.pointerType === "mouse") mouseSobreGaleria = true;
    });
    galeria.addEventListener("pointerleave", () => { mouseSobreGaleria = false; });
    dialog.addEventListener("close", () => {
        if (!dialog.open) clearInterval(timer);
    });

    return (imagens) => {
        clearInterval(timer);
        mouseSobreGaleria = false;
        inicioToque = undefined;
        faixa.replaceChildren(...imagens.map(({ src, alt }) => el("img", { src, alt: traduzir(alt), decoding: "async" })));
        controles.hidden = imagens.length < 2;
        pausa.setAttribute("aria-pressed", "false");
        pausa.firstElementChild.textContent = "Ⅱ";
        posicao.setAttribute("aria-live", "off");
        dialog.showModal();
        dialog.scrollTop = 0;
        faixa.scrollTo({ left: 0, behavior: "instant" });
        atualizarPosicao();

        if (controles.hidden) return;
        timer = setInterval(() => {
            if (!dialog.open || document.hidden || reduzirMovimento.matches || mouseSobreGaleria || inicioToque ||
                galeria.contains(document.activeElement) || pausa.getAttribute("aria-pressed") === "true") return;
            mover(1, true);
        }, 5000);
    };
}

function renderProjetos(lista) {
    const grid = document.querySelector("[data-projects]");
    if (!grid) return;
    const dialog = document.querySelector("#project-dialog");
    const abrirGaleria = prepararGaleria(dialog);
    dialog.addEventListener("click", event => {
        if (event.target !== dialog) return;
        const box = dialog.getBoundingClientRect();
        if (event.clientX < box.left || event.clientX > box.right ||
            event.clientY < box.top || event.clientY > box.bottom) dialog.close();
    });

    grid.replaceChildren(...lista.map(({ titulo, descricao, imagem, imagens = [], tags = [], link }, indice) => {
        const tituloId = "card-title-" + indice;
        const botao = el("button", {
            type: "button", class: "card__details", text: "Ver detalhes",
            "aria-haspopup": "dialog", "aria-describedby": tituloId
        });
        botao.addEventListener("click", () => {
            dialog.querySelector("h2").textContent = traduzir(titulo);
            dialog.querySelector(".card__text").textContent = traduzir(descricao);
            dialog.querySelector(".tags").replaceChildren(...tags.map(tag => el("li", { text: traduzir(tag) })));
            const destino = dialog.querySelector("a");
            destino.hidden = !link;
            if (link) destino.href = link;
            else destino.removeAttribute("href");
            dialog.querySelector(".card__link--off").hidden = Boolean(link);
            abrirGaleria([{ src: imagem, alt: titulo }, ...imagens]);
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
