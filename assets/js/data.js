// Conteúdo do site. Para adicionar ou editar algo, mexa só aqui.

const CONTATO = {
    email: "gabrielfeiferc@gmail.com",
    githubUser: "gabrielfcalixto",
};

const SOCIAL = [
    { nome: "LinkedIn", url: "https://www.linkedin.com/in/gabrielfcalixto/", icone: "fab fa-linkedin" },
    { nome: "GitHub", url: "https://github.com/gabrielfcalixto", icone: "fab fa-github" },
    // { nome: "Instagram", url: "https://instagram.com/SEU_USUARIO", icone: "fab fa-instagram" },
];

// Classes de ícone: https://devicon.dev
const SKILLS = [
    { nome: "Java", icone: "devicon-java-plain" },
    { nome: "Spring Boot", icone: "devicon-spring-original" },
    { nome: "Angular", icone: "devicon-angular-plain" },
    { nome: "TypeScript", icone: "devicon-typescript-plain" },
    { nome: ".NET", icone: "devicon-dot-net-plain" },
    { nome: "JavaScript", icone: "devicon-javascript-plain" },
    { nome: "React", icone: "devicon-react-original" },
    { nome: "React Native", icone: "devicon-react-original" },
    { nome: "HTML5", icone: "devicon-html5-plain" },
    { nome: "CSS3", icone: "devicon-css3-plain" },
    { nome: "Oracle", icone: "devicon-oracle-original" },
    { nome: "MySQL", icone: "devicon-mysql-original" },
    { nome: "PostgreSQL", icone: "devicon-postgresql-plain" },
    { nome: "Docker", icone: "devicon-docker-plain" },
    { nome: "Git", icone: "devicon-git-plain" },
    { nome: "CI/CD", icone: "devicon-githubactions-plain" },
    { nome: "Selenium", icone: "devicon-selenium-original" },
];

// "github: true" busca o número real de repositórios públicos na API do GitHub.
const STATS = [
    { valor: 36, rotulo: "Repositórios", github: true },
    { valor: 40, rotulo: "Ferramentas utilizadas" },
    { valor: 7308684, rotulo: "Linhas de código" },
];

// "imagem" é a capa. Use "imagens" para capturas adicionais do projeto.
// Deixe "link" vazio para projetos sem página pública.
const PROJETOS = [
    {
        titulo: "Sistema CRUD com React e Java",
        descricao: "Cadastro de usuários e login com autenticação por token.",
        imagem: "assets/images/img-slide/img8.jpeg",
        tags: ["React", "Java", "Spring"],
        link: "https://github.com/gabrielfcalixto/frontendsakai",
    },
    {
        titulo: "Interface Angular",
        descricao: "Tela de login interativa e fluida feita com Angular.",
        imagem: "assets/images/img-slide/img7.jpeg",
        tags: ["Angular", "TypeScript"],
        link: "https://github.com/gabrielfcalixto/Angular-login-BC",
    },
    {
        titulo: "Daily Motivation",
        descricao: "App de motivação diária com frases inspiradoras, publicado na Play Store.",
        imagem: "assets/images/img-slide/img3.jpeg",
        imagens: [
            { src: "assets/images/img-slide/daily-motivation-1.webp", alt: "Tela inicial do aplicativo" },
            { src: "assets/images/img-slide/daily-motivation-2.webp", alt: "Lista de frases" },
            { src: "assets/images/img-slide/daily-motivation-3.webp", alt: "Tela do plano Premium" },
            { src: "assets/images/img-slide/daily-motivation-4.webp", alt: "Tela de ajuda" },
        ],
        tags: ["React Native"],
        link: "https://play.google.com/store/apps/details?id=br.com.gfc.feemotivacao",
    },
    {
        titulo: "Chatbot Telegram com Gemini",
        descricao: "Bot no Telegram integrado à IA Gemini.",
        imagem: "assets/images/img-slide/img5.jpeg",
        tags: ["IA", "Telegram"],
        link: "https://t.me/GfcTech_bot",
    },
    {
        titulo: "Autobot para tarefas repetitivas",
        descricao: "Automação de tarefas repetitivas com C# e Selenium.",
        imagem: "assets/images/img-slide/img4.jpeg",
        tags: ["C#", "Selenium"],
        link: "",
    },
    {
        titulo: "Automação desktop por coordenadas",
        descricao: "Bot que interage com a interface gráfica controlando o mouse.",
        imagem: "assets/images/img-slide/img6.jpeg",
        tags: ["Automação"],
        link: "https://github.com/gabrielfcalixto/AutomationDesktop",
    },
    {
        titulo: "Site institucional",
        descricao: "Site institucional completo com interface amigável.",
        imagem: "assets/images/img-slide/img2.jpeg",
        imagens: [
            { src: "assets/images/img-slide/gfctech-sobre.jpeg", alt: "Seção Sobre nós do site institucional" },
            { src: "assets/images/img-slide/gfctech-servicos.jpeg", alt: "Seção de serviços do site institucional" },
        ],
        tags: ["HTML", "CSS", "JS"],
        link: "https://github.com/gabrielfcalixto/GFCTech_",
    },
    {
        titulo: "Landing page",
        descricao: "Landing page responsiva com design limpo e funcional.",
        imagem: "assets/images/img-slide/img1.jpeg",
        imagens: [
            { src: "assets/images/img-slide/landing-page-mobile.jpeg", alt: "Formulário da landing page no celular" },
        ],
        tags: ["HTML", "CSS"],
        link: "https://github.com/gabrielfcalixto/pgweb",
    },
];
