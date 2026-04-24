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
function formatAmount(input) {
    // Solo permite números y un punto decimal
    let value = input.value.replace(/[^0-9.]/g, '');
    
    // Evita más de un punto
    const parts = value.split('.');
    if (parts.length > 2) value = parts[0] + '.' + parts.slice(1).join('');
    
    // Limita a 2 decimales
    if (parts[1] && parts[1].length > 2) {
        value = parts[0] + '.' + parts[1].slice(0, 2);
    }

    input.value = value;

    // Dinamismo: Ajusta el ancho del input según el largo del texto
    if (value.length > 5) {
        input.style.width = (value.length * 35) + "px";
    } else {
        input.style.width = "200px";
    }
}