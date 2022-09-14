// benodigde modules importeren
const express = require('express')
const app = express()
const mariadb = require("mariadb");
const dotenv = require('dotenv');
const { Router } = require('express');
const port = dotenv.config().parsed.PORT || 3000;
const ejs = require('ejs');

// je kan een .env bestand aanmaken om je wachtwoorden te verbergen
// daar moet je ook PORT=3000 doen om de server te starten
// het .evn bestand word niet meegenomen in git repository, dit is voor veiligheid

// rstel de render engine voor ejs in
app.set('view engine', 'ejs')

// zorgt ervoor dat de public folder beschikbaar is voor de client
app.use(express.static(__dirname + '/public'));

// stelt de endpoint / als route in
// res.render renderd de template index.ejs en stuurt deze als html naar de client
// het object word meegenomen in het ejs bestand om de pagina te vullen
app.get("/kip", (req, res) => {
      res.render("index", {text: "hello kip"});
});

// de hooft route naar de root van de server
app.get('/database', (req, res) => {
   
// dit is de connectie met de database
// nog om te testen
// Main function
async function main() {
    let conn;
 
   //  het proberen te verbinden met de database
    try {
       conn = await mariadb.createConnection({
          user: dotenv.config().parsed.username,
          host: dotenv.config().parsed.DB_host,
          password: dotenv.config().parsed.password,
          database: "testDB",
       });
 
       // Use Connection to get contacts data
       var rows = await get_contacts(conn);
 
       //Print list of contacts
         console.log(rows.naam);
         res.send(`dit is iets: ${rows[0].naam}`);
    } catch (err) {
       // Manage Errors
       console.log(err);
    } finally {
       // Close Connection
       if (conn) conn.close();
    }
 }
 
 //Get list of contacts
 function get_contacts(conn) {
    return conn.query("SELECT * FROM dataTable");
 }

main();

})

// de server starten
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
    }
)