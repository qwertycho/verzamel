const button = document.getElementById('login');
const usernameField = document.getElementById('username');
const passwordField = document.getElementById('password');
const loginButton = document.getElementById('login');
const newUserButton = document.getElementById('signup');

const sendData = async (event) => {
    console.log('send data');
    console.log(event);
    event.preventDefault();
    const username = usernameField.value;
    const password = passwordField.value;
    
    let xhr = new XMLHttpRequest();
    xhr.open('POST', '/dashboard/login', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({ username, password }));
    xhr.onload = function () {
        if (xhr.status === 200) {
            window.location.href = '/dashboard';
        } else {
            alert(xhr.responseText);
        }
    }
}

loginButton.addEventListener('click', sendData);

 const signUp = async( e) => {
    let username = document.getElementById('newusername').value;
    let password = document.getElementById('newpassword').value;
    e.preventDefault();
    let xhr = new XMLHttpRequest();
    xhr.open('POST', '/dashboard/newuser', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({ username, password }));
    xhr.onload = function () {
        if (xhr.status == 200) {
            console.log('succes');
            document.location.replace('/dashboard');
        } else {
            alert(xhr.responseText);
        }
    }
}

    newUserButton.addEventListener('click', signUp);

let switchButton = document.getElementById('switch');

switchButton.addEventListener('click', (e) => {
    e.preventDefault();
    let loginForm = document.getElementById('loginForm');
    let newUserForm = document.getElementById('signUp');
    loginForm.classList.toggle('hidden');
    newUserForm.classList.toggle('hidden');
});