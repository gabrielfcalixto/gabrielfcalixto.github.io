function iniciarContato({ email }) {
    const form = document.querySelector("#contact-form");
    const status = form.querySelector(".form__status");
    const botao = form.querySelector('button[type="submit"]');
    const rotuloInicial = botao.textContent;
    function mostrarEnvio(enviando) {
        botao.disabled = enviando;
        botao.setAttribute("aria-busy", String(enviando));
        botao.textContent = enviando ? traduzir("Enviando…") : rotuloInicial;
    }
    if (!email) {
        botao.disabled = true;
        status.textContent = traduzir("Contato por e-mail temporariamente indisponível.");
        return;
    }
    const envioNativo = location.protocol === "file:";
    if (envioNativo) {
        form.action = "https://formsubmit.co/" + email;
        form.append(el("input", {
            type: "hidden", name: "_url", value: "https://gabrielfcalixto.github.io/"
        }));
        window.addEventListener("pageshow", () => mostrarEnvio(false));
    }
    form.addEventListener("submit", async (event) => {
        if (botao.disabled) {
            event.preventDefault();
            return;
        }
        mostrarEnvio(true);
        status.dataset.tipo = "";
        status.textContent = "";
        if (envioNativo) return;
        event.preventDefault();
        try {
            const dados = Object.fromEntries(new FormData(form));
            const resposta = await fetch("https://formsubmit.co/ajax/" + encodeURIComponent(email), {
                method: "POST",
                headers: { "Content-Type": "application/json", Accept: "application/json" },
                body: JSON.stringify(dados)
            });
            const resultado = await resposta.json();
            if (!resposta.ok || String(resultado.success) !== "true") throw new Error();
            status.dataset.tipo = "ok";
            status.textContent = traduzir("Mensagem recebida. Obrigado pelo contato!");
            form.reset();
        } catch {
            status.dataset.tipo = "erro";
            status.textContent = traduzir("Falha no envio. Tente novamente.");
        } finally {
            mostrarEnvio(false);
        }
    });
}
