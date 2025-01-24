
let count = 1;
document.getElementById("radio1").checked = true;

setInterval( function() {
 
    nextImage();
}, 5000)

function nextImage() {

    count++;
    if(count>7){
        count = 1;
    }
    document.getElementById("radio"+count).checked = true;
}
document.addEventListener('DOMContentLoaded', function() {
    const stats = document.querySelectorAll('.stat h2');

    // Função para fazer a contagem até o número
    function countUp(element, target, duration) {
        let start = 0;
        let increment = target / (duration / 50); // A cada 50ms
        let interval = setInterval(function() {
            start += increment;
            element.textContent = `+${Math.floor(start)}`;
            if (start >= target) {
                clearInterval(interval);
                element.textContent = `+${target}`; // Garante que o número final seja exato
            }
        }, 50);
    }

    // Função para verificar se a seção está visível
    function checkVisibility() {
        const rect = document.querySelector('.community-stats').getBoundingClientRect();
        if (rect.top <= window.innerHeight && rect.bottom >= 0) {
            stats.forEach(function(stat) {
                const target = parseInt(stat.textContent.replace('+', '').replace('.', ''));
                countUp(stat, target, 2000); // A contagem dura 2000ms (2 segundos)
            });
            window.removeEventListener('scroll', checkVisibility); // Remover o ouvinte após a animação
        }
    }

    // Inicializar a animação ao rolar até a seção
    window.addEventListener('scroll', checkVisibility);
    checkVisibility(); // Verificar se já está visível ao carregar a página
});

