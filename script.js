document.addEventListener("DOMContentLoaded", () => {
    const track = document.querySelector(".carrousel-track");
    const projects = document.querySelectorAll(".projeto");
    const totalProjects = document.querySelectorAll(".projeto");

    let currentIndex = 0;

    function moveCarrousel() {
        currentIndex = (currentIndex + 1) % totalProjects;
        const offset = -currentIndex * 100; // desloca 100% por projeto
        track.style.transform = `translateX(${offset}%)`;
     }
     setInterval(moveCarrousel, 3000);
});