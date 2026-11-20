function iniciarMenuNavbar() {
    const navbar = document.querySelector(".navbar");
    const botao = navbar.querySelector(".navbar__menu");
    const links = navbar.querySelector(".navbar__list");
    const mobile = matchMedia("(max-width: 620px)");

    function fecharMenu() {
        botao.setAttribute("aria-expanded", "false");
    }

    botao.addEventListener("click", () => {
        botao.setAttribute("aria-expanded", String(botao.getAttribute("aria-expanded") === "false"));
    });
    links.addEventListener("click", (evento) => {
        if (evento.target.closest("a")) fecharMenu();
    });
    document.addEventListener("click", (evento) => {
        if (!navbar.contains(evento.target) || evento.target.closest(".navbar__brand")) fecharMenu();
    });
    document.addEventListener("keydown", (evento) => {
        if (evento.key !== "Escape" || botao.getAttribute("aria-expanded") !== "true") return;
        fecharMenu();
        botao.focus();
    });
    mobile.addEventListener("change", () => {
        if (mobile.matches && links.contains(document.activeElement)) botao.focus();
        fecharMenu();
    });

    navbar.dataset.menuReady = "";
    botao.hidden = false;
}

function iniciarScrollSpy() {
    const header = document.querySelector(".site-header");
    const links = [...header.querySelectorAll(".navbar__link")];
    const secoes = links.map((link) => document.getElementById(link.hash.slice(1)));
    let atual = 0;
    let frame;

    function atualizar() {
        frame = undefined;
        const limite = header.getBoundingClientRect().bottom + Math.min(80, window.innerHeight * .1);
        const pagina = document.scrollingElement;
        const noFim = pagina.scrollTop > 0 && pagina.scrollHeight - pagina.scrollTop - pagina.clientHeight <= 2;
        let indice = noFim ? secoes.length - 1 : 0;

        if (!noFim) {
            for (let i = 1; i < secoes.length; i++) {
                if (secoes[i].getBoundingClientRect().top > limite) break;
                indice = i;
            }
        }

        if (atual === indice) return;
        links[atual].removeAttribute("aria-current");
        links[indice].setAttribute("aria-current", "location");
        atual = indice;
    }

    function agendarAtualizacao() {
        if (frame === undefined) frame = requestAnimationFrame(atualizar);
    }

    window.addEventListener("scroll", agendarAtualizacao, { passive: true });
    window.addEventListener("resize", agendarAtualizacao);
    window.addEventListener("pageshow", agendarAtualizacao);
    if ("ResizeObserver" in window) {
        const observer = new ResizeObserver(agendarAtualizacao);
        secoes.forEach((secao) => observer.observe(secao));
    }
    atualizar();
}
