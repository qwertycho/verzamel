const sendForm = async (e) => {
    e.preventDefault();
    let productName = document.getElementById("productName").value;
    let omschrijving = document.getElementById("omschrijving").value;
    let datum = document.getElementById("datum").value;
    let waarde = document.getElementById("waarde").value;
    let eigenaar = document.getElementById("eigenaar").value;
    let classificatie = document.getElementById("classificatie").value;

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

document.getElementById("submitForm").addEventListener("click", sendForm);