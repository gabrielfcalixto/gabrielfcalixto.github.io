// Faz os elementos com .reveal aparecerem suavemente ao entrar na tela.
function iniciarReveal() {
    const itens = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window)) {
        itens.forEach((i) => i.classList.add("is-visible"));
        return;
    }
    const observer = new IntersectionObserver((entradas, obs) => {
        entradas.forEach(({ target, isIntersecting }) => {
            if (!isIntersecting) return;
            target.classList.add("is-visible");
            obs.unobserve(target);
        });
    }, { threshold: 0.15 });
    itens.forEach((i) => observer.observe(i));
}
