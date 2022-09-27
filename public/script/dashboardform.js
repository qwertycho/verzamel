const productName = document.getElementById("productName").value;
const omschrijving = document.getElementById("omschrijving").value;
const datum = document.getElementById("datum").value;
const waarde = document.getElementById("waarde").value;
const eigenaar = document.getElementById("eigenaar").value;
const classificatie = document.getElementById("classificatie").value;
const submitFormButton = document.getElementById("submitForm");

const sendForm = async (e) => {
    let productName = document.getElementById("productName").value;
    let omschrijving = document.getElementById("omschrijving").value;
    let datum = document.getElementById("datum").value;
    let waarde = document.getElementById("waarde").value;
    let eigenaar = document.getElementById("eigenaar").value;
    let classificatie = document.getElementById("classificatie").value;

    e.preventDefault();
    let xhr = new XMLHttpRequest();
    xhr.open('POST', '/dashboard/dashBoardForm', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({ productName, omschrijving, datum, waarde, eigenaar, classificatie }));
    xhr.onload = function () {
        if (xhr.status == 200) {
            // Boktor
        } else {
            alert(xhr.responseText);
        }
    }
}

submitFormButton.addEventListener('click', sendForm);