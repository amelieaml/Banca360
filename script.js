// --- MANEJO DEL MENÚ MÓVIL ---
const menu = document.querySelector('#mobile-menu');
const menuLinks = document.querySelector('.nav-menu');

if (menu) {
    menu.addEventListener('click', () => {
        menuLinks.classList.toggle('active');
        
        const bars = document.querySelectorAll('.bar');
        bars[0].classList.toggle('rotate45');
        bars[1].classList.toggle('fadeout');
        bars[2].classList.toggle('rotate-45');
    });
}

// --- FORMATO DE MONTO ---
function formatAmount(input) {
    let value = input.value.replace(/[^0-9.]/g, '');
    const parts = value.split('.');
    
    if (parts.length > 2) value = parts[0] + '.' + parts.slice(1).join('');
    
    if (parts[1] && parts[1].length > 2) {
        value = parts[0] + '.' + parts[1].slice(0, 2);
    }

    input.value = value;

    // Ajuste de ancho usando clases o lógica limpia
    if (value.length > 5) {
        input.style.width = (value.length * 35) + "px"; // Esto es dinámico, está bien mantenerlo así o por clases
    } else {
        input.style.width = "200px";
    }
}

// --- LÓGICA DE REGISTRO Y REDIRECCIÓN ---
document.addEventListener('DOMContentLoaded', () => {
    // --- LÓGICA DE INICIO DE SESIÓN ---
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const btn = document.getElementById('btnLogin');
            const btnText = btn.querySelector('.btn-text');
            const spinner = document.getElementById('spinner');
            
            // Estado de carga
            btn.classList.add('btn-loading');
            if (btnText) btnText.innerText = 'Validando...';
            if (spinner) spinner.classList.add('show');

            // Simulación de autenticación y redirección al Dashboard
            setTimeout(() => {
                window.location.href = 'dashboard.html';
            }, 2000);
        });
    }
    
    const registerForm = document.getElementById('registerForm'); // Asegúrate de que tu <form> tenga este ID
    
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Referencias a elementos del botón (usando las clases que ya tenemos)
            const btn = this.querySelector('.btn-submit-full');
            const btnText = btn.querySelector('span'); // El texto dentro del botón
            const spinner = btn.querySelector('.spinner');

            // 1. Validar contraseñas antes de mostrar carga
            const pass = document.getElementById('password').value;
            const confirmPass = document.getElementById('confirm-password').value;

            if (pass !== confirmPass) {
                alert("Las contraseñas no coinciden. Por favor, verifica.");
                return;
            }

            // 2. Activar estado de carga (usando las clases de tu CSS)
            btn.classList.add('btn-loading');
            if (btnText) btnText.innerText = 'Validando datos...';
            if (spinner) spinner.classList.add('show');

            // 3. Simular procesamiento y redirigir
            setTimeout(() => {
                // Redirigir a la pantalla de preguntas de seguridad
                window.location.href = 'security-config.html';
            }, 2000);
        });
    }
});