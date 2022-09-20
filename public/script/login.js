const button = document.getElementById('login');
const usernameField = document.getElementById('username');
const passwordField = document.getElementById('password');

const sendData = async (event) => {
    event.preventDefault();
    const username = usernameField.value;
    const password = passwordField.value;
    
    const response = await fetch('/dashboard/login', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: { 'Content-Type': 'application/json' },
    });
    
    if (response.ok) {
        console.log('success');
        document.location.replace('/dashboard');
    } else {
        alert(response.statusText);
    }
    }

button.addEventListener('click', sendData);