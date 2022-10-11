let cookies = document.cookie;

if(cookies.includes("user=")){

    let username = cookies.split("user=")[1].split(";")[0]
    console.log(username);
    document.querySelector(".dashboardLink").innerHTML = username;
}