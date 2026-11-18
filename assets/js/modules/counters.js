const formatar = (n) => "+" + Math.round(n).toLocaleString(document.documentElement.lang);
const semAnimacao = matchMedia("(prefers-reduced-motion: reduce)").matches;

function animar(elemento, alvo, duracao = 1600) {
    if (semAnimacao) { elemento.textContent = formatar(alvo); return; }
    const inicio = performance.now();
    const passo = (agora) => {
        const t = Math.min((agora - inicio) / duracao, 1);
        const suave = 1 - Math.pow(1 - t, 3); // ease-out
        elemento.textContent = formatar(alvo * suave);
        if (t < 1) requestAnimationFrame(passo);
    };
    requestAnimationFrame(passo);
}

async function reposPublicos(usuario) {
    try {
        const resp = await fetch(`https://api.github.com/users/${usuario}`);
        if (!resp.ok) return null;
        return (await resp.json()).public_repos ?? null;
    } catch {
        return null;
    }
}

// Conta de 0 até o valor quando os números aparecem na tela.
async function iniciarContadores(githubUser) {
    const valores = document.querySelectorAll("[data-count]");
    if (!valores.length) return;

    const github = document.querySelector("[data-github]");
    if (github && githubUser) {
        const repos = await reposPublicos(githubUser);
        if (repos) github.dataset.count = repos;
    }

    const observer = new IntersectionObserver((entradas, obs) => {
        entradas.forEach(({ target, isIntersecting }) => {
            if (!isIntersecting) return;
            animar(target, Number(target.dataset.count));
            obs.unobserve(target);
        });
    }, { threshold: 0.6 });
    valores.forEach((v) => observer.observe(v));
}

