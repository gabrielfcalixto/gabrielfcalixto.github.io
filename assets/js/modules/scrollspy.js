// Marca na navbar o link da seção visível.
function iniciarScrollSpy() {
    const links = [...document.querySelectorAll(".navbar__link")];
    const porId = new Map(links.map((a) => [a.hash.slice(1), a]));

    const observer = new IntersectionObserver((entradas) => {
        entradas.forEach(({ target, isIntersecting }) => {
            if (!isIntersecting) return;
            links.forEach((a) => a.removeAttribute("aria-current"));
            porId.get(target.id)?.setAttribute("aria-current", "true");
        });
    }, { rootMargin: "-45% 0px -50% 0px" });

    document.querySelectorAll("main section[id]").forEach((s) => observer.observe(s));
}
