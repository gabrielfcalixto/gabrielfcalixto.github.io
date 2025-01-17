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
setInterval(() => {
    moveToSlide(currentIndex);
    currentIndex = (currentIndex + 1) % slides.length;
}, 3000); // Muda a cada 3 segundos
