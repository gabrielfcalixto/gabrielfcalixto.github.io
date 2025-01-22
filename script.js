const track = document.querySelector('.carousel-track');
const slides = Array.from(track.children);
const prevButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');
const indicators = document.querySelectorAll('.indicator');

// Definindo a largura do slide
const slideWidth = slides[0].getBoundingClientRect().width;

// Função para mover os slides
function moveToSlide(index) {
    track.style.transform = `translateX(-${slideWidth * index}px)`;
    updateIndicators(index);
}

// Atualizar os indicadores
function updateIndicators(index) {
    indicators.forEach((indicator, i) => {
        indicator.classList.remove('active');
        if (i === index) {
            indicator.classList.add('active');
        }
    });
}

// Função para ir para o próximo slide
function nextSlide() {
    const currentIndex = slides.findIndex(slide => slide === track.querySelector('.active'));
    const nextIndex = (currentIndex + 1) % slides.length;
    moveToSlide(nextIndex);
}
// Função para ir para o slide anterior
function prevSlide() {
    const currentIndex = slides.findIndex(slide => slide === track.querySelector('.active'));
    const prevIndex = (currentIndex - 1 + slides.length) % slides.length;
    moveToSlide(prevIndex);
}

// Evento para o botão "próximo"
nextButton.addEventListener('click', nextSlide);

// Evento para o botão "anterior"
prevButton.addEventListener('click', prevSlide);

// Configuração dos indicadores
indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => moveToSlide(index));
});

// Configuração de navegação automática
let currentIndex = 0;
let autoSlide = setInterval(() => {
    moveToSlide(currentIndex);
    currentIndex = (currentIndex + 1) % slides.length;
}, 3000); // Muda a cada 3 segundos

//pausar animação ao passar o mouse
track.addEventListener('mouseover', () => {
    track.style.animationPlayState = 'paused';
    clearInterval(autoSlide);
});

//retornar animação
track.addEventListener('mouseout', () => {
    track.style.animationPlayState = 'running';
    autoSlide = setInterval(() => {
        moveToSlide(currentIndex);
        currentIndex = (currentIndex + 1) % slides.length;
    }, 3000);
});
document.addEventListener("DOMContentLoaded", () => {
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".itens a");

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    // Remove a classe ativa de todos os links
                    navLinks.forEach((link) => link.classList.remove("active"));

                    // Adiciona a classe ativa ao link correspondente
                    const activeLink = document.querySelector(
                        `.itens a[href="#${entry.target.id}"]`
                    );
                    activeLink.classList.add("active");
                }
            });
        },
        { threshold: 0.7 } // Define quando a seção é considerada visível (70%)
    );

    sections.forEach((section) => observer.observe(section));
});


document.addEventListener("DOMContentLoaded", () => {
    const menuToggle = document.querySelector(".menu-toggle");
    const menu = document.querySelector(".itens");

    menuToggle.addEventListener("click", () => {
        menu.classList.toggle("active");
    });
});

const sections = document.querySelectorAll('section');
let currentSectionIndex = 0;
let isThrottled = false; // Controla o atraso entre os eventos

window.addEventListener('wheel', (event) => {
  if (isThrottled) return; // Ignora eventos se estiver no intervalo de espera
  
  const sensitivity = 50; // Valor mínimo de movimento para acionar a mudança (ajuste conforme necessário)
  
  if (event.deltaY > sensitivity) {
    // Rolagem para baixo
    currentSectionIndex = Math.min(currentSectionIndex + 1, sections.length - 1);
  } else if (event.deltaY < -sensitivity) {
    // Rolagem para cima
    currentSectionIndex = Math.max(currentSectionIndex - 1, 0);
  } else {
    return; // Ignora se o movimento for menor que a sensibilidade
  }

  // Rola para a seção correspondente
  sections[currentSectionIndex].scrollIntoView({ behavior: 'smooth' });

  // Ativa o atraso
  isThrottled = true;
  setTimeout(() => (isThrottled = false), 500); // 500ms de espera entre eventos
});
// Função para animar o número
function animateNumbers() {
    const stats = document.querySelectorAll('.stat h2');
    
    stats.forEach(stat => {
        const targetValue = parseInt(stat.textContent.replace(/[^\d]/g, ''), 10); // Remove qualquer texto não numérico
        let currentValue = 0;
        
        const increment = targetValue / 200; // Define o incremento por quadro
        
        const interval = setInterval(() => {
            currentValue += increment;
            stat.textContent = Math.floor(currentValue).toLocaleString(); // Atualiza o número na tela
            
            if (currentValue >= targetValue) {
                clearInterval(interval); // Para a animação quando o valor atingir o final
                stat.textContent = targetValue.toLocaleString(); // Garante que o número final seja exibido
            }
        }, 10); // Intervalo de 10ms para o efeito suave
    });
}

// Função para verificar se a seção está visível
function checkVisibility() {
    const statsSection = document.querySelector('.community-stats');
    const rect = statsSection.getBoundingClientRect();
    
    // Verifica se a seção está visível na tela
    if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
        animateNumbers();
        window.removeEventListener('scroll', checkVisibility); // Remove o evento de rolagem após a animação
    }
}

// Adiciona o evento de rolagem para verificar a visibilidade
window.addEventListener('scroll', checkVisibility);
