document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // 1. MANEJO DEL NAVBAR 
    // ==========================================
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

    // ==========================================
    // 2. REGISTRO Y VALIDACIONES DE FORMULARIO
    // ==========================================
    const registerForm = document.getElementById('registerForm');
    const passwordInput = document.getElementById('password');
    const reqLength = document.getElementById('req-length');
    const reqNumber = document.getElementById('req-number');
    const fechaInput = document.getElementById('fecha-nacimiento');

    // Validación de requisitos de contraseña en tiempo real
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

    // Configuración de fecha mínima (18 años) en el input date
    if (fechaInput) {
        const hoy = new Date();
        const hace18Anos = new Date(hoy.getFullYear() - 18, hoy.getMonth(), hoy.getDate());
        const maxFecha = hace18Anos.toISOString().split('T')[0];
        fechaInput.setAttribute('max', maxFecha);
    }

    // Lógica del Submit de Registro
    if (registerForm) {
        registerForm.addEventListener('submit', function (e) {
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

            // Validación de Edad (Lógica de cálculo)
            const fechaNacimiento = document.getElementById('fecha-nacimiento').value;
            const fechaNacDate = new Date(fechaNacimiento);
            const hoy = new Date();
            let edad = hoy.getFullYear() - fechaNacDate.getFullYear();
            const mes = hoy.getMonth() - fechaNacDate.getMonth();

            if (mes < 0 || (mes === 0 && hoy.getDate() < fechaNacDate.getDate())) {
                edad--;
            }

            if (edad < 18) {
                alert("Debes ser mayor de 18 años para registrarte.");
                return;
            }

            // Estado de carga y simulación de envío
            btn.classList.add('btn-loading');
            if (btnText) btnText.innerText = 'Creando cuenta...';
            if (spinner) spinner.classList.add('show');

            setTimeout(() => {
                window.location.href = 'security-config.html';
            }, 2000);
        });
    }

    // ==========================================
    // 3. LOGIN
    // ==========================================
    const loginForm = document.getElementById('loginForm');

    if (loginForm) {
        loginForm.addEventListener('submit', function (e) {
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

    // ==========================================
    // 4. DASHBOARD (SALDOS Y SEGURIDAD)
    // ==========================================
    const toggleBalanceBtn = document.getElementById('toggleBalance');
    const balanceAmount = document.getElementById('balanceAmount');
    const balanceHidden = document.getElementById('balanceHidden');
    const eyeIcon = document.getElementById('eyeIcon');

    if (toggleBalanceBtn) {
        toggleBalanceBtn.addEventListener('click', () => {
            const isHiddenNow = balanceAmount.classList.toggle('hidden');
            balanceHidden.classList.toggle('hidden');
            eyeIcon.innerText = isHiddenNow ? 'visibility_off' : 'visibility';
        });
    }

    const securityForm = document.getElementById('securityForm');
    if (securityForm) {
        securityForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Seguridad configurada con éxito.');
            window.location.href = 'login.html';
        });
    }

    // ==========================================
    // 5. PERFIL (DESPLEGABLE Y VALIDACIÓN)
    // ==========================================
    const btnToggle = document.getElementById('btnTogglePassword');
    const passwordCollapse = document.getElementById('passwordCollapse');
    const newPassInput = document.getElementById('newPasswordPerfil');
    const reqLen = document.getElementById('req-length-p');
    const reqNum = document.getElementById('req-number-p');

    if (btnToggle && passwordCollapse) {
        btnToggle.addEventListener('click', () => {
            passwordCollapse.classList.toggle('show');
            btnToggle.innerText = passwordCollapse.classList.contains('show') ? 'Cancelar' : 'Actualizar';
        });
    }

    if (newPassInput) {
        newPassInput.addEventListener('input', () => {
            const val = newPassInput.value;

            // Longitud
            if (val.length >= 6) {
                reqLen.classList.add('valid');
                reqLen.querySelector('.material-symbols-outlined').innerText = 'check_circle';
            } else {
                reqLen.classList.remove('valid');
                reqLen.querySelector('.material-symbols-outlined').innerText = 'circle';
            }

            // Solo Números
            const isNumeric = /^[0-9]*$/.test(val);
            if (isNumeric && val.length > 0) {
                reqNum.classList.add('valid');
                reqNum.querySelector('.material-symbols-outlined').innerText = 'check_circle';
            } else {
                reqNum.classList.remove('valid');
                reqNum.querySelector('.material-symbols-outlined').innerText = 'circle';
            }
        });
    }

    // ==========================================
    // 6. FORMATEO DE INPUTS (TELÉFONO Y CUENTA)
    // ==========================================
    const inputTelefono = document.getElementById('input-telefono');
    if (inputTelefono) {
        inputTelefono.addEventListener('input', function (e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length > 4) {
                value = value.slice(0, 4) + '-' + value.slice(4, 11);
            }
            e.target.value = value;
        });
    }

    const inputCuenta = document.getElementById('numero-cuenta');
    if (inputCuenta) {
        inputCuenta.addEventListener('input', function (e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length > 20) value = value.substring(0, 20);
            let formattedValue = value.match(/.{1,4}/g)?.join(' ') || '';
            e.target.value = formattedValue;
        });
    }

    // ==========================================
    // 7. LÓGICA DE MODALES
    // ==========================================
    const openModalBtn = document.getElementById('btnOpenModal');
    const closeModalBtn = document.getElementById('closeModal');
    const passwordModal = document.getElementById('passwordModal');

    if (openModalBtn && passwordModal) {
        openModalBtn.addEventListener('click', () => {
            passwordModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });

        closeModalBtn.addEventListener('click', () => {
            passwordModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        });

        window.addEventListener('click', (e) => {
            if (e.target === passwordModal) {
                passwordModal.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    }

});

// ==========================================
// 8. FUNCIONES GLOBALES (FUERA DEL DOMCONTENTLOADED)
// ==========================================

// Formato de Monto y Ancho Dinámico
function formatAmount(input) {
    let value = input.value.replace(/[^0-9.]/g, '');
    const parts = value.split('.');

    if (parts[1] && parts[1].length > 2) {
        value = parts[0] + '.' + parts[1].slice(0, 2);
    }
    input.value = value;

    if (value.length > 5) {
        input.style.width = (value.length * 30) + "px";
    } else {
        input.style.width = "200px";
    }
}

// Filtrado de Transacciones
function filterTx(type, btn) {
    const items = document.querySelectorAll('.tx-entry');
    const buttons = document.querySelectorAll('.filter-btn');

    buttons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    items.forEach(item => {
        const itemType = item.getAttribute('data-type');
        if (type === 'all' || itemType === type) {
            item.style.display = 'flex';
            item.style.opacity = '1';
        } else {
            item.style.display = 'none';
            item.style.opacity = '0';
        }
    });
}

// Mostrar Detalle de Transacción
function showTxDetail(name, person, date, amount, ref) {
    const modal = document.getElementById('detailModal');
    const body = document.getElementById('modalBody');

    if (!modal || !body) return;

    body.innerHTML = `
        <div class="detail-item">
            <label>Tipo de Operación</label>
            <p>${name}</p>
        </div>
        <div class="detail-item">
            <label>Descripción / Beneficiario</label>
            <p>${person}</p>
        </div>
        <div class="detail-item">
            <label>Fecha y Hora</label>
            <p>${date}</p>
        </div>
        <div class="detail-item">
            <label>Monto</label>
            <p><strong>${amount}</strong></p>
        </div>
        <div class="detail-item">
            <label>Número de Referencia</label>
            <p>${ref}</p>
        </div>
    `;

    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

// Cerrar Detalle de Transacción
function closeTxDetail() {
    const modal = document.getElementById('detailModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// Evento Global para cerrar modal de detalles
window.addEventListener('click', (event) => {
    const modal = document.getElementById('detailModal');
    if (event.target == modal) {
        closeTxDetail();
    }
});