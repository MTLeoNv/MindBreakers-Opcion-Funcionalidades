import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";
import { firebaseConfig } from "/config.js";

// Configuración de Firebase usando las variables de entorno
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Referencias DOM
let menu = document.querySelector('#menu-icon');
let navlist = document.querySelector('.navlist');
let menuLinks = document.querySelectorAll('.navlist a');
let userIcon = document.querySelector('#user-icon');
let logoutButton = document.getElementById('logout-button');
let authModal = document.getElementById('auth-modal');
let authClose = document.getElementById('auth-close');
let registerLink = document.getElementById('register-link');
let loginLink = document.getElementById('login-link');
let loginForm = document.getElementById('login-form-auth');
let registerForm = document.getElementById('register-form-auth');

// Toggle the menu on menu icon click
menu.onclick = () => {
    menu.classList.toggle('bx-x');
    navlist.classList.toggle('open');
}

// Close the menu on scroll
window.onscroll = () => {
    menu.classList.remove('bx-x');
    navlist.classList.remove('open');
}

// Close the menu when any link is clicked
menuLinks.forEach(link => {
    link.addEventListener('click', () => {
        menu.classList.remove('bx-x');
        navlist.classList.remove('open');
    });
});

// Función para reiniciar y ocultar el modal
function resetAndHideAuthModal() {
    authModal.style.display = 'none';
    registerForm.style.display = 'none';
    loginForm.style.display = 'block';
}

// Observador de estado de sesión
onAuthStateChanged(auth, (user) => {
    if (user) {
        userIcon.style.display = 'none';
        logoutButton.style.display = 'inline-block';
    } else {
        userIcon.style.display = 'inline-block';
        logoutButton.style.display = 'none';
    }
});

// Cambiar a formulario de registro
registerLink.onclick = (e) => {
    e.preventDefault();
    loginForm.style.display = 'none';
    registerForm.style.display = 'block';
};

// Cambiar a formulario de inicio de sesión
loginLink.onclick = (e) => {
    e.preventDefault();
    registerForm.style.display = 'none';
    loginForm.style.display = 'block';
};

// Registro de usuarios
registerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = registerForm.querySelector('input[type="email"]').value;
    const password = registerForm.querySelector('input[type="password"]').value;

    createUserWithEmailAndPassword(auth, email, password)
        .then(() => {
            // Ocultar el modal
            authModal.style.display = 'none';

            // Mantener al usuario en la misma página
            window.location.href = window.location.href;
        })
        .catch((error) => {
            if (error.code === 'auth/email-already-in-use') {
                showFormError(registerForm, 'El correo electrónico ya está registrado. Intenta con otro.');
            } else {
                showFormError(registerForm, `Error al registrar: ${error.message}`);
            }
        });
});


// Inicio de sesión
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = loginForm.querySelector('input[type="email"]').value;
    const password = loginForm.querySelector('input[type="password"]').value;

    signInWithEmailAndPassword(auth, email, password)
        .then(() => {
            // Ocultar el modal
            authModal.style.display = 'none';

            // Mantener al usuario en la misma página
            window.location.href = window.location.href; 
        })
        .catch((error) => {
            if (error.code === 'auth/wrong-password') {
                showFormError(loginForm, 'Contraseña incorrecta. Intenta de nuevo.');
            } else if (error.code === 'auth/user-not-found') {
                showFormError(loginForm, 'No se encontró una cuenta con este correo. Regístrate primero.');
            } else {
                showFormError(loginForm, 'Error al iniciar sesión. Intenta nuevamente.');
            }
        });
});



function showFormError(form, message) {
    let errorElement = form.querySelector('.form-error');
    if (!errorElement) {
        // Crear un elemento de error si no existe
        errorElement = document.createElement('p');
        errorElement.classList.add('form-error');
        errorElement.style.color = 'red';
        errorElement.style.fontSize = '14px';
        form.appendChild(errorElement);
    }
    // Mostrar el mensaje de error
    errorElement.textContent = message;
}


// Cerrar sesión
logoutButton.addEventListener('click', () => {
    signOut(auth)
        .then(() => {
            // Mantener al usuario en la misma página al cerrar sesión
            window.location.href = window.location.href;
        })
        .catch((error) => {
            console.error(`Error al cerrar sesión: ${error.message}`); // Para depuración
        });
});


// Mostrar el modal de autenticación
userIcon.addEventListener('click', () => {
    resetAndHideAuthModal();
    authModal.style.display = 'flex';
});

// Cerrar el modal al hacer clic en la 'x'
authClose.addEventListener('click', () => {
    authModal.style.display = 'none';
});

// Funcionalidad de búsqueda
const productos = [
    { id: 1, nombre: "ROMPECABEZAS ARCOIRIS", imagen: "img/r1.png" },
    { id: 2, nombre: "ROMPECABEZAS GATO", imagen: "img/r2.png" },
    { id: 3, nombre: "ROMPECABEZAS ARTE", imagen: "img/r3.png" },
    { id: 4, nombre: "ROMPECABEZAS ARTE", imagen: "img/r4.png" },
    { id: 5, nombre: "ROMPECABEZAS PINTURA", imagen: "img/r5.png" },
    { id: 6, nombre: "ROMPECABEZAS VISTA", imagen: "img/r6.png" },
    { id: 7, nombre: "ROMPECABEZAS FLORES", imagen: "img/r7.png" },
    { id: 8, nombre: "ROMPECABEZAS TORRE", imagen: "img/r8.png" },
    { id: 9, nombre: "ROMPECABEZAS JUGUETE", imagen: "img/r9.png" },
    { id: 10, nombre: "ROMPECABEZAS DALI", imagen: "img/r10.png" },
    { id: 12, nombre: "ROMPECABEZAS NUM", imagen: "img/r12.png" },
    { id: 13, nombre: "ROMPECABEZAS ANIME", imagen: "img/r13.png" },
    { id: 14, nombre: "ROMPECABEZAS ARTE", imagen: "img/r14.png" },
    { id: 15, nombre: "ROMPECABEZAS LORD", imagen: "img/r15.png" },
    { id: 16, nombre: "ROMPECABEZAS DISNEY", imagen: "img/r16.png" },
    { id: 17, nombre: "ROMPECABEZAS SIRENITA", imagen: "img/r17.png" },
    { id: 18, nombre: "ROMPECABEZAS LEON", imagen: "img/r18.png" },
    { id: 19, nombre: "ROMPECABEZAS FROZEN", imagen: "img/r19.png" },
    { id: 20, nombre: "ROMPECABEZAS BARBIE", imagen: "img/r20.png" },
    { id: 21, nombre: "ROMPECABEZAS MARVEL", imagen: "img/r21.png" },
];

const searchIcon = document.getElementById('search-icon');
const searchInput = document.getElementById('search-input');
const searchResults = document.getElementById('search-results');
const resultsContainer = document.getElementById('results-container');

searchIcon.onclick = (e) => {
    e.preventDefault();
    searchInput.style.display = searchInput.style.display === 'none' ? 'inline-block' : 'none';
    searchInput.focus();
    searchResults.style.display = 'none';
};

searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase().trim();
    resultsContainer.innerHTML = '';
    if (query === '') {
        searchResults.style.display = 'none';
        return;
    }

    const resultados = productos.filter(producto =>
        producto.nombre.toLowerCase().includes(query)
    );

    if (resultados.length > 0) {
        searchResults.style.display = 'block';
        resultados.forEach(producto => {
            const productoElemento = document.createElement('div');
            productoElemento.classList.add('result-item');
            productoElemento.innerHTML = `
                <img src="${producto.imagen}" alt="${producto.nombre}" width="50" height="50">
                <span>${producto.nombre}</span>
            `;
            resultsContainer.appendChild(productoElemento);
        });
    } else {
        searchResults.style.display = 'block';
        resultsContainer.innerHTML = '<p>No se encontraron productos.</p>';
    }
});
