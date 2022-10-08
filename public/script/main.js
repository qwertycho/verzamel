
function showItems(data) {
    // clear the list
    document.getElementById("verzameling").innerHTML = "";
    // add items to list
    data.forEach(element => {
       let link = document.createElement("a");
         link.href = `/object/${element.objectID}`;
         link.className = "object";
         let div = document.createElement("div");
         div.className = "item";
         link.innerHTML = `<h3>${element.naam}</h3>`
         let img = document.createElement("img");
            img.src =`/media/objecten/${element.thumbnail}`;
            img.alt = element.naam;
            img.width = 200;
            div.appendChild(img);
         link.appendChild(div);
        document.getElementById("verzameling").appendChild(link);
    });
}


const getVerzameling = async() => {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', '/verzameling', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send();
    xhr.onload = function () {
        if (xhr.status == 200) {
            console.log(this.responseText);
            showItems(JSON.parse(xhr.responseText));
        } else {
            alert(xhr.responseText);
        }
    }
}
getVerzameling();