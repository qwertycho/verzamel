// benodigde troep importeren
const { resolveInclude } = require("ejs");
const express = require("express");
const router = express.Router();
const cookieParser = require("cookie-parser");
const mariadb = require("mariadb");
const { response } = require("express");

// einde benodigde troep importeren
router.use(cookieParser());

// 
const pool = mariadb.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  connectionLimit: 5
});

// functie om de database te connecten
// gebruikt const pool = mariadb.createPool
// haat 
async function checkUser(userName, password) {
        let conn;
        try {
        // connectie maken met de database
        conn = await pool.getConnection();
        // check of de gebruiker bestaat
        const row = await conn.query("SELECT * FROM gebruikers WHERE username = ?", [userName]);
        console.log("conn.query");
        console.log(row);
      } catch (err) {
        console.log("db error");
        console.log(err);
      throw err;
      } finally {
      if (conn) return conn.end();
        if(row[0].password == password){
          return true;
        }
      }
}

// dit is de route voor login
// doordat dit bestand pas word aangesproken als de gebruiker naar /dashboard gaat is /login dus /dashboard/login
// Dit is een post route en geen get route. Hier word info dus op geplaats. In dit geval de login data
// Nu word gecheckt of de login data overeenkomt met wat in het dotenv bestand staat
router.post("/login", (req, res) => {
  if (username != undefined) {
    checkUser(req.body.username, req.body.password).then( (authorised) => {
      if (authorised) {
          // als de login data klopt word de gebruiker door gestuurd naar de dashboard pagina
          // de gebruiker word ook een cookie gegeven met de naam "login" en de waarde van het juiste wachtwoord
          res.cookie("auth", password, { maxAge: 900000, httpOnly: true });
          res.cookie("user", username, { maxAge: 900000, httpOnly: true });
          res.redirect("/dashboard");
        } else {
          console.log("wrong credentials");
        }
    });
  } else {
      res.redirect("/dashboard/login");
    }
});

router.get("/login", (req, res) => {
  if (req.cookies.username != undefined) {
    checkUser(req.cookies.username, req.cookies.auth).then( (authorised) => {
      if (authorised) {
          // als de login data klopt word de gebruiker door gestuurd naar de dashboard pagina
          // de gebruiker word ook een cookie gegeven met de naam "login" en de waarde van het juiste wachtwoord
          res.cookie("auth", password, { maxAge: 900000, httpOnly: true });
          res.cookie("user", username, { maxAge: 900000, httpOnly: true });
          res.redirect("/dashboard");
        } else {
          console.log("wrong credentials");
        }
    });
  } else {
      res.render("../views/login", {});
    }
});

// route naar de dashboard. Ofte wel /dasboard/
// eerst word gecheckt of de gebruiker een cookie heeft met de naam "auth"
// als de gebruiker geen cookie heeft word hij door gestuurd naar de login pagina
// als de gebruiker wel een cookie heeft word gecheckt of de cookie waarde overeenkomt met de waarde in het dotenv bestand
router.get("/", (req, res) => {
  console.log(`/ req.cookies zijn: ${req.cookies.username}`);
  if (req.cookies.username != undefined) {
    checkUser(req.cookies.username, req.cookies.auth).then( (authorised) => {
    if (authorised) {
      console.log("logged in");
      res.render("../views/dashboard", { user: req.cookies.username });
    }
  });
  } else {
    console.log("not logged in");
    res.render("../views/login", {});
  }
});

module.exports = router;