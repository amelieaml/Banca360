const menu = document.querySelector('#mobile-menu');
const menuLinks = document.querySelector('.nav-menu');

menu.addEventListener('click', () => {
    menuLinks.classList.toggle('active');
    
    // Animación simple del icono hamburguesa
    const bars = document.querySelectorAll('.bar');
    bars[0].classList.toggle('rotate45');
    bars[1].classList.toggle('fadeout');
    bars[2].classList.toggle('rotate-45');
});
