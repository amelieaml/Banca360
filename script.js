document.addEventListener('DOMContentLoaded', () => {
    
    // =====================
    // 1. MANEJO DEL NAVBAR
    // =====================
    const menu = document.querySelector('#mobile-menu');
    const menuLinks = document.querySelector('.nav-menu');

    if (menu) {
        menu.addEventListener('click', () => {
            menuLinks.classList.toggle('active');
            
            // Animación de las barras del menú hamburguesa
            const bars = document.querySelectorAll('.bar');
            bars[0].classList.toggle('rotate45');
            bars[1].classList.toggle('fadeout');
            bars[2].classList.toggle('rotate-45');
        });
    }

    // ============================
    // 2. VALIDACIÓN DE CONTRASEÑA 
    // ============================
    const passwordInput = document.getElementById('password');
    const reqLength = document.getElementById('req-length');
    const reqNumber = document.getElementById('req-number');

    if (passwordInput) {
        passwordInput.addEventListener('input', () => {
            const value = passwordInput.value;

            // Validar longitud (Mínimo 6)
            if (value.length >= 6) {
                reqLength.classList.add('valid');
                reqLength.querySelector('.material-symbols-outlined').innerText = 'check_circle';
            } else {
                reqLength.classList.remove('valid');
                reqLength.querySelector('.material-symbols-outlined').innerText = 'circle';
            }

            // Validar que sean solo números
            const onlyNumbers = /^[0-9]*$/.test(value);
            if (onlyNumbers && value.length > 0) {
                reqNumber.classList.add('valid');
                reqNumber.querySelector('.material-symbols-outlined').innerText = 'check_circle';
            } else {
                reqNumber.classList.remove('valid');
                reqNumber.querySelector('.material-symbols-outlined').innerText = 'circle';
            }
        });
    }

    // ============
    // 3. REGISTRO 
    // ============
    const registerForm = document.getElementById('registerForm');
    
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const btn = this.querySelector('.btn-submit-full');
            const btnText = btn.querySelector('span');
            const spinner = btn.querySelector('.spinner');

            // Validar que las contraseñas coincidan
            const pass = document.getElementById('password').value;
            const confirmPass = document.getElementById('confirm-password').value;

            if (pass !== confirmPass) {
                alert("Las contraseñas no coinciden. Por favor, verifica.");
                return;
            }

            // Estado de carga
            btn.classList.add('btn-loading');
            if (btnText) btnText.innerText = 'Creando cuenta...';
            if (spinner) spinner.classList.add('show');

            // Simulación de envío y redirección
            setTimeout(() => {
                window.location.href = 'security-config.html';
            }, 2000);
        });
    }

    // =========
    // 4. LOGIN
    // =========
    const loginForm = document.getElementById('loginForm');
    
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const btn = document.getElementById('btnLogin');
            const btnText = btn.querySelector('.btn-text');
            const spinner = document.getElementById('spinner');
            
            btn.classList.add('btn-loading');
            if (btnText) btnText.innerText = 'Validando...';
            if (spinner) spinner.classList.add('show');

            setTimeout(() => {
                window.location.href = 'dashboard.html';
            }, 2000);
        });
    }

    // =============
    // 5. DASHBOARD
    // =============
    const toggleBalanceBtn = document.getElementById('toggleBalance');
    const balanceAmount = document.getElementById('balanceAmount');
    const balanceHidden = document.getElementById('balanceHidden');
    const eyeIcon = document.getElementById('eyeIcon');

    if (toggleBalanceBtn) {
        toggleBalanceBtn.addEventListener('click', () => {
            const isHiddenNow = balanceAmount.classList.toggle('hidden');
            balanceHidden.classList.toggle('hidden');

            // Cambiar icono: si está oculto (hidden), ponemos el ojo tachado
            eyeIcon.innerText = isHiddenNow ? 'visibility_off' : 'visibility';
        });
    }

    const securityForm = document.getElementById('securityForm');
    if (securityForm) {
        securityForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Seguridad configurada con éxito.');
            window.location.href = 'login.html'; // Redirigir al login para mayor coherencia
        });
    }

    // ============================
    // 6. HISTORIAL DE MOVIMIENTOS
    // ============================
    const filterButtons = document.querySelectorAll('.filter-btn');
    const txItems = document.querySelectorAll('.tx-entry');

    // Solo ejecutamos si existen botones de filtro en la página actual
    if (filterButtons.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                // Prevenir comportamientos extraños
                const filter = button.getAttribute('data-filter');

                // 1. Manejar clases activas en botones
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');

                // 2. Filtrar elementos de la lista
                txItems.forEach(item => {
                    const type = item.getAttribute('data-type');
                    if (filter === 'all' || type === filter) {
                        item.style.display = 'flex';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
    }
});

// ==========================================
// 7. FORMATO DE MONTO 
// ==========================================
function formatAmount(input) {
    let value = input.value.replace(/[^0-9.]/g, '');
    const parts = value.split('.');
    
    // Limitar a 2 decimales
    if (parts[1] && parts[1].length > 2) {
        value = parts[0] + '.' + parts[1].slice(0, 2);
    }

    input.value = value;

    // Ajuste dinámico de ancho para el input de transferencias
    if (value.length > 5) {
        input.style.width = (value.length * 30) + "px";
    } else {
        input.style.width = "200px";
    }
}