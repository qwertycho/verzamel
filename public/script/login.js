const button = document.getElementById('login');
const usernameField = document.getElementById('username');
const passwordField = document.getElementById('password');
console.log(document.cookie);

// const sendData = async (event) => {
//     event.preventDefault();
//     const username = usernameField.value;
//     const password = passwordField.value;
    
//     const response = await fetch('/dashboard/login', {
//         method: 'POST',
//         body: JSON.stringify({ username, password }),
//         headers: { 'Content-Type': 'application/json' },
//     });
    
//     if (response.ok) {
//         console.log('success');
//         document.location.replace('/dashboard');
//     } else {
//         alert(response.statusText);
//     }
// }

//  new xml request
function sendData(event){
    event.preventDefault();
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/dashboard/login", true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({ username: username, password: password }));
    xhr.onload = function () {
        console.log(xhr.responseText);
        if (xhr.responseText == "wrong credentials") {
            alert("wrong credentials");
        } else {
            document.location.replace('/dashboard');
        }
    }
    xhr.onerror = function () {
        console.log("error");
    }
    xhr.onabort = function () {
        console.log("abort");
    }
    xhr.ontimeout = function () {
        console.log("timeout");
    }
}

 button.addEventListener('click', sendData);

