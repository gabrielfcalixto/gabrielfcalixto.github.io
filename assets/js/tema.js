const sistemaEscuro = matchMedia("(prefers-color-scheme: dark)");
const botaoTema = document.querySelector("#theme-toggle");
let temaEscolhido;
try { temaEscolhido = localStorage.getItem("tema"); } catch {}

function aplicarTema() {
    const escuro = temaEscolhido ? temaEscolhido === "dark" : sistemaEscuro.matches;
    document.documentElement.dataset.theme = escuro ? "dark" : "light";
    document.querySelector('meta[name="theme-color"]').content = escuro ? "#18181b" : "#f5f5f7";
    botaoTema.setAttribute("aria-pressed", String(escuro));
}

botaoTema.addEventListener("click", () => {
    temaEscolhido = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    try { localStorage.setItem("tema", temaEscolhido); } catch {}
    aplicarTema();
});
sistemaEscuro.addEventListener("change", aplicarTema);
aplicarTema();
