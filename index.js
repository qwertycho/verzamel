// benodigde modules importeren
const express = require('express')
const app = express()
const mariadb = require("mariadb");
const dotenv = require('dotenv');
const { Router } = require('express');
const port = dotenv.config().parsed.PORT || 3000;
const ejs = require('ejs');
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const navBalk = require('./server/nav.js');
const database = require("./server/database.ts")

// je kan een .env bestand aanmaken om je wachtwoorden te verbergen
// daar moet je ook PORT=3000 doen om de server te starten
// het .evn bestand word niet meegenomen in git repository, dit is voor veiligheid

// rstel de render engine voor ejs in
app.set('view engine', 'ejs')

// zorgt ervoor dat de public folder beschikbaar is voor de client
app.use(express.static(__dirname + '/public'));

app.get("/contact", (req, res) => {
    res.render("contact", {navBalk: navBalk.navigatieBalk});
});

app.get("/object/:id", (req, res) => {
    let id = req.params.id;
    // console.log(id);
    async function dibbertje(id){
        console.log(id);
        let data = await database.getCollection(id);
        let object = data[0];
        console.log(object);
        if(object){
            res.render("object", {navBalk: navBalk.navigatieBalk, titel: object.naam, tekst: object.tekst, afbeelding: object.thumbnail, prijs: object.prijs});
        } else{
            res.render("object", {navBalk: navBalk.navigatieBalk, titel: null, tekst:null, afbeelding: null, prijs: null});
        }
    } dibbertje(id);
});


app.get("/verzameling", (req, res) => {
    console.log("verzameling");
     database.getCollection().then((data) => {
        res.send(data);
     });
});

// stelt de endpoint / als route in
// res.render renderd de template index.ejs en stuurt deze als html naar de client
// het object word meegenomen in het ejs bestand om de pagina te vullen
app.get("/", (req, res) => {
      res.render("index", {text: "hello", navBalk: navBalk.navigatieBalk});
});

// route naar het dashboard
// Deze route zit in /routes/dashboard.js
const dashboard = require('./routes/dashboard');
app.use('/dashboard', dashboard);

// de server starten
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
    }
)