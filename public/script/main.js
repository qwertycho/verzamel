
function showItems(data) {
    // clear the list
    document.getElementById("verzameling").innerHTML = "";
    // add items to list
    for (let i = 0; i < data.length; i++) {
        let item = data[i];
        let div = document.createElement("div");
        let img = document.createElement("img");
        img.backgroundImage = item.image;
        let p = document.createElement("p");
        p.innerHTML = item.name;
        div.appendChild(img);
        div.appendChild(p);
        document.getElementById("verzameling").appendChild(div);
    }
}


const getVerzameling = async() => {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', '/verzameling', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send();
    xhr.onload = function () {
        if (xhr.status == 200) {
            showItems(JSON.parse(xhr.responseText));
        } else {
            alert(xhr.responseText);
        }
    }
}