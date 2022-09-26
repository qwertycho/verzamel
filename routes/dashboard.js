// benodigde troep importeren
const { resolveInclude, promiseImpl } = require("ejs");
const express = require("express");
const router = express.Router();
const cookieParser = require("cookie-parser");
const mariadb = require("mariadb");
const { response } = require("express");
// dit is de database met alle apies
const database = require("../server/database.ts");

//peters troep
const navBalk = require('../server/nav.js');

// einde benodigde troep importeren
router.use(cookieParser());

// dit is de route voor login
// doordat dit bestand pas word aangesproken als de gebruiker naar /dashboard gaat is /login dus /dashboard/login
// Dit is een post route en geen get route. Hier word info dus op geplaats. In dit geval de login data
// Nu word gecheckt of de login data overeenkomt met wat in het dotenv bestand staat
router.post("/login", (req, res) => {
  console.log("post login");
  try{
    if (req.body.username != undefined) {
      database.checkUser(req.body.username, req.body.password).then(authorised => { 
        if (authorised) {
            // als de login data klopt word de gebruiker door gestuurd naar de dashboard pagina
            // de gebruiker word ook een cookie gegeven met de naam "login" en de waarde van het juiste wachtwoord
            res.cookie("auth", req.body.password, { maxAge: 900000, httpOnly: true });
            res.cookie("user", req.body.username, { maxAge: 900000, httpOnly: true });
            res.redirect("/dashboard");
          } else {
            // als de login data niet klopt word er een error gegeven
            console.log("wrong credentials");
            res.status(401).send("wrong credentials");
          }
      });
    } else {
      // als er geen cookies zijn word de gebruiker door gestuurd naar de login pagina
      console.log("no credentials");
      res.status(401).send("no credentials");
      }
  } catch (err) {
    // als er een error is, log deze dan
    console.log("error");
    console.log(err);
  }
});

// de route voor dashboard/login
// hier word gekeken of de gebruiker al is ingelogd
// als de gebruiker al is ingelogd word hij door gestuurd naar de dashboard pagina
router.get("/login", (req, res) => {
  console.log("get login");
  try{
    if (req.cookies.username != undefined) {
      database.checkUser(req.cookies.user, req.cookies.auth).then(authorised => { 
        if (authorised) {
            // als de login data klopt word de gebruiker door gestuurd naar de dashboard pagina
            // de gebruiker word ook een cookie gegeven met de naam "login" en de waarde van het juiste wachtwoord
            res.redirect("/dashboard");
          } else {
            console.log("wrong credentials");
            res.send("wrong credentials");
          }
      });
    } else {
        res.render("../views/login", {});
      }
  } catch (err) {
    // als er een error is, log deze dan
    console.log("error");
    console.log(err);
  }
});

// route naar de dashboard. Ofte wel /dasboard/
// eerst word gecheckt of de gebruiker een cookie heeft met de naam "auth"
// als de gebruiker geen cookie heeft word hij door gestuurd naar de login pagina
// als de gebruiker wel een cookie heeft word gecheckt of de cookie waarde overeenkomt met de waarde in het dotenv bestand
router.get("/", (req, res) => {

  console.log("get dashboard");
  try{
    if (req.cookies.user != undefined) {
      database.checkUser(req.cookies.user, req.cookies.auth).then(authorised => { 
        if (authorised) {
        console.log("logged in");
        res.render("../views/dashboard", { user: req.cookies.user });
      }
    });
    } else {
      console.log("not logged in");
      res.render("../views/login", {});
    }
} catch (err) {
  // als er een error is, log deze dan
  console.log("error");
  console.log(err);
}
});

module.exports = router;