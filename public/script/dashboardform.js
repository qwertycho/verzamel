function sendForm(e){
    e.preventDefault();
    let productName = document.getElementById("productName").value;
    let omschrijving = document.getElementById("omschrijving").value;
    let datum = document.getElementById("datum").value;
    let waarde = document.getElementById("waarde").value;
    let classificatie = document.getElementById("classificatie").value;

    let cookies = document.cookie;

    if(cookies.includes("user=")){

        let username = cookies.split("user=")[1].split(";")[0]
        console.log(username);
        document.querySelector(".dashboardLink").innerHTML = username;


        let xhr = new XMLHttpRequest();
        xhr.open('POST', '/dashboard/dashBoardForm', true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify({ productName, omschrijving, datum, waarde, username, classificatie }));
        xhr.onload = function () {
            if (xhr.status == 200) {
                // Boktor
            } else {
                alert(xhr.responseText);
            }
        }
    }
    
    document.getElementById("submitForm").addEventListener("click", sendForm);

    }


let xhr = new XMLHttpRequest();
xhr.open('GET', '/dashboard/classes', true);
xhr.setRequestHeader('Content-Type', 'application/json');
xhr.send();
xhr.onload = function () {
    if (xhr.status == 200) {
        let data = JSON.parse(xhr.responseText);
        makeClasses(data);


    } else {
        alert(xhr.responseText);
    }
}

function makeClasses(data) {
console.log(data);
  data.forEach(element => {
       let select = document.createElement("option");
       select.values = element.classID;
        select.innerHTML = element.class;
        document.getElementById("classificatie").appendChild(select);
  });

}


