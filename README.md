# Portfólio 

Site pessoal feito com HTML, CSS e JavaScript puros, sem framework e sem etapa de build.
Publicado com GitHub Pages: https://gabrielfcalixto.github.io

## Estrutura

```
index.html              estrutura da página
site.webmanifest        dados do app (ícone, cores)
assets/
  css/
    variables.css       cores, fontes, espaçamentos
    base.css            reset, layout, botões, utilitários
    navbar.css
    hero.css
    skills.css
    projects.css
    contact.css
    footer.css
  js/
    data.js             conteúdo: redes, skills, números, projetos
    main.js             ponto de entrada
    modules/
      dom.js            helper para criar elementos
      render.js         monta skills, números, projetos e redes
      scrollspy.js      destaca o item da navbar da seção visível
      reveal.js         animação de entrada ao rolar
      counters.js       contadores animados (repositórios vêm da API do GitHub)
      contact.js        envia o formulário por e-mail via FormSubmit
  images/
```

## Como editar

- Projetos, skills, números e redes sociais: `assets/js/data.js`.
- Cores e fontes: `assets/css/variables.css`.
- Ícones das skills: classes do [Devicon](https://devicon.dev).

## Rodar localmente

Abra o `index.html` com dois cliques. Se preferir usar um servidor local, execute:

```bash
npx serve .
# ou
python -m http.server
```

## Funcionalidades

- Navbar flutuante com destaque da seção atual
- Skills e projetos gerados a partir de `data.js`
- Contadores animados, com número de repositórios em tempo real
- Formulário de e-mail via FormSubmit. Configure o destinatário em CONTATO.email (assets/js/data.js) e confirme a ativação recebida no primeiro envio.
- Responsivo, acessível (navegação por teclado, `prefers-reduced-motion`) e sem dependências de build

## Tecnologias

HTML5, CSS3 e JavaScript.
