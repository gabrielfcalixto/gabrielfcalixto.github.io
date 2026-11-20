if (location.protocol === "http:" || location.protocol === "https:") {
    document.head.append(el("link", { rel: "manifest", href: "site.webmanifest" }));
}

renderSocial(SOCIAL);
renderSkills(SKILLS);
renderStats(STATS);
renderProjetos(PROJETOS);
aplicarIdioma();

document.querySelectorAll("[data-year]").forEach((s) => (s.textContent = new Date().getFullYear()));

iniciarScrollSpy();
iniciarReveal();
const newLocal = iniciarContadores(CONTATO.githubUser);
iniciarContato(CONTATO);

