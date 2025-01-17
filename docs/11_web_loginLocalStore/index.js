// Franco Daniel Herrera

// Recibo los elementos
const contentDiv = document.getElementById('content');
const searchInput = document.getElementById('searchUser');
const loginButton = document.getElementById('btnLogin');
const registerButton = document.getElementById('btnRegister');
const logoutButton = document.getElementById('btnLogout');
const userButton = document.getElementById('btnUser');
const userName = document.getElementById('nameUser');

// Añado los eventos
logoutButton.addEventListener('click', logout);
loginButton.addEventListener('click', showLoginForm);
registerButton.addEventListener('click', showRegisterForm);
searchInput.addEventListener('input', function(event) {
    const searchText = event.target.value.toLowerCase();
    updateTable(searchText);
});

// Se inicia el javascript
checkLoggedInStatus();

// Funciones
function checkLoggedInStatus() {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn === 'true') {
        const loggedInUser = localStorage.getItem('loggedInUser');
        loginButton.style.display = 'none';
        registerButton.style.display = 'none';
        logoutButton.style.display = 'inline';
        userButton.style.display = 'inline';
        userName.innerText = `${loggedInUser}`;
    } else {
        loginButton.style.display = 'inline';
        registerButton.style.display = 'inline';
        logoutButton.style.display = 'none';
        userButton.style.display = 'none';
        userName.innerText = ``;
        userName.style.display = 'none';
    }
    updateTable();
}

function showLoginForm() {
    const loginForm = document.getElementById('loginForm');
    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();

        // Obtener datos ingresados por el usuario
        const enteredUsername = loginForm.querySelector("#floatingInput").value;
        const enteredPassword = loginForm.querySelector("#floatingPassword").value;
        
        // Obtener usuarios almacenados en localStorage
        const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
        
        // Verificar si las credenciales coinciden
        const matchedUser = storedUsers.find(user => user.username === enteredUsername && user.password === enteredPassword);
        if (matchedUser) {
            alert("Inicio de sesión exitoso!");
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('loggedInUser', matchedUser.username); // Almacenar el usuario logueado
            
            checkLoggedInStatus();

            window.location.reload();
        } else {
            alert("Usuario y/o contraseña incorrectas..");
        }
    });
}

function showRegisterForm() {
    const registerForm = document.getElementById('registerForm');
    registerForm.addEventListener('submit', function(event) {
        event.preventDefault();

        // Obtener datos ingresados por el usuario
        const enteredUsername = registerForm.querySelector("#floatingInput").value;
        const enteredPassword = registerForm.querySelector("#floatingPassword").value;
        
        // Obtener usuarios almacenados en localStorage
        const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
        
        // Verificar si el usuario ya está registrado
        const existingUser = storedUsers.find(user => user.username === enteredUsername);
        if (existingUser) {
            alert("Usuario ya registrado..");
        } else {
            // Agregar nuevo usuario al array y guardar en localStorage
            storedUsers.push({ username: enteredUsername, password: enteredPassword });
            localStorage.setItem('users', JSON.stringify(storedUsers));
            alert("Registro exitoso!");
            
            window.location.reload();
        }
    });
}

function logout() {
    localStorage.removeItem('loggedInUser'); // Eliminar el usuario logueado
    localStorage.setItem('isLoggedIn', 'false');
    alert("Se ha cerrado sesión.");

    checkLoggedInStatus();
    updateButtonsState();
}

function updateTable() {
    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
    const tbody = document.querySelector('tbody');
    
    // Limpiar contenido actual de la tabla
    tbody.innerHTML = '';
    
    // Agregar nuevas filas a la tabla
    storedUsers.forEach((user, index) => {
        const newRow = document.createElement('tr');
        newRow.innerHTML = `
            <th scope="row">${index + 1}</th>
            <td>${user.username}</td>
            <td>${user.password}</td>
        `;
        tbody.appendChild(newRow);
    });
}

function updateTable(searchText = '') {
    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
    const tbody = document.querySelector('tbody');
    
    // Limpiar contenido actual de la tabla
    tbody.innerHTML = '';
    
    // Agregar nuevas filas a la tabla
    storedUsers.forEach((user, index) => {
        // Filtrar usuarios por búsqueda
        if (user.username.toLowerCase().includes(searchText)) {
            const newRow = document.createElement('tr');
            newRow.innerHTML = `
                <th scope="row">${index + 1}</th>
                <td>${user.username}</td>
                <td>${user.password}</td>
            `;
            tbody.appendChild(newRow);
        }
    });
}


