// benodigde troep importeren
const { resolveInclude } = require('ejs');
const express = require('express');
const router = express.Router();
const cookieParser = require('cookie-parser');

//peters troep
const navBalk = require('../server/nav.js');

// einde benodigde troep importeren
router.use(cookieParser());

// dit is de route voor login
// doordat dit bestand pas word aangesproken als de gebruiker naar /dashboard gaat is /login dus /dashboard/login
// Dit is een post route en geen get route. Hier word info dus op geplaats. In dit geval de login data
// TODO: dotenv vervangen met DB info
// Nu word gecheckt of de login data overeenkomt met wat in het dotenv bestand staat
router.post('/login', (req, res) => {
    console.log(req.body);
    let username = req.body.username;
    let password = req.body.password;
    if(username == process.env.admin && password == process.env.password){
        // als de login data klopt word de gebruiker door gestuurd naar de dashboard pagina
        // de gebruiker word ook een cookie gegeven met de naam "login" en de waarde van het juiste wachtwoord
        res.cookie('auth', process.env.password, { maxAge: 900000, httpOnly: true });
        res.redirect('/dashboard');
    } else {
        console.log(username, password);
        console.log(process.env.admin, process.env.password);
        console.log("wrong credentials");
        // loggen naar database
    }
});

// route naar de dashboard. Ofte wel /dasboard/
// eerst word gecheckt of de gebruiker een cookie heeft met de naam "auth"
// als de gebruiker geen cookie heeft word hij door gestuurd naar de login pagina
// als de gebruiker wel een cookie heeft word gecheckt of de cookie waarde overeenkomt met de waarde in het dotenv bestand
router.get('/', (req, res) => {
    console.log(req.cookies);
    if(req.cookies.auth == process.env.password){
        console.log("logged in");
        let user = {
            username: process.env.admin,
        }
        res.render('../views/dashboard', {user: user , navBalk: navBalk.navigatieBalk});
    } else {
        console.log("not logged in");
        res.render('../views/login', {});
    }
});

module.exports = router;