// benodigde troep importeren
const { resolveInclude } = require('ejs');
const express = require('express');
const router = express.Router();
const cookieParser = require('cookie-parser');
const mariadb = require("mariadb");

// einde benodigde troep importeren
router.use(cookieParser());


async function main(username) {
    let conn;
 
    try {
       conn = await mariadb.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
       });

       var row = await conn.query(`SELECT * FROM gebruikers WHERE username = ${username}`);

         return row;
    } catch (err) {
         throw err;
    } finally {
            if (conn) return conn.end();
    }
}

// dit is de route voor login
// doordat dit bestand pas word aangesproken als de gebruiker naar /dashboard gaat is /login dus /dashboard/login
// Dit is een post route en geen get route. Hier word info dus op geplaats. In dit geval de login data
// Nu word gecheckt of de login data overeenkomt met wat in het dotenv bestand staat
router.post("/login", (req, res) => {
    console.log(`post/login req.cookies zijn: ${req.cookies.username}`);
    let username = req.body.username;
    let password = req.body.password;
    let DbResonse = main(username);
  if (username != undefined) {
    if (DbResonse.username == username && DbResonse.password == password) {
      // als de login data klopt word de gebruiker door gestuurd naar de dashboard pagina
      // de gebruiker word ook een cookie gegeven met de naam "login" en de waarde van het juiste wachtwoord
      res.cookie("auth", password, { maxAge: 900000, httpOnly: true });
      res.cookie("user", username, { maxAge: 900000, httpOnly: true });
      res.redirect("/dashboard");
    } else {
        console.log("xxxxxxxxxxxxxxxxxxxxxx");
      console.log("wrong credentials");
        console.log(`username: ${username}`);
        console.log(`password: ${password}`);
        console.log(`db username: ${DbResonse.username}`);
        console.log(`db password: ${DbResonse.password}`);
        console.log(DbResonse);
        console.log("xxxxxxxxxxxxxxxxxxxxxx");

      // loggen naar database
    }
  } else {
    console.log("no username");
  }
});

console.log("eeeeeeeeeeeeeeeeeeeeeeeeeee");
let test = main("qwertycho");
console.log(test);
console.log("eeeeeeeeeeeeeeeeeeeeeeeeeee");

router.get("/login", (req, res) => {
    console.log("xxxxxxxxxxxxxxxxxxxxxx");
    console.log(`/login req.cookies zijn: ${req.cookies.username}`);
    console.log("xxxxxxxxxxxxxxxxxxxxxx");
    if (req.cookies.username != undefined) {
        let DbResonse = main(req.cookies.user);
        if(
            DbResonse.username == req.cookies.user &&
            DbResonse.password == req.cookies.auth
        ){
            console.log("logged in");
            let user = {
                username: req.cookies.user,
            };
            res.render("../views/dashboard", { user: user });
        }
    } else {
        console.log("not logged in");
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
        let DbResonse = main(req.cookies.user);
        if(
            DbResonse.username == req.cookies.user &&
            DbResonse.password == req.cookies.auth
        ){
            console.log("logged in");
            let user = {
                username: req.cookies.user,
            };
            res.render("../views/dashboard", { user: user });
        }
    } else {
        console.log("not logged in");
        res.render("../views/login", {});
    }
});



    // async function login(username) {
    //    return new Promise((resolve, reject) => {
    //         main(username).then((result) => {
    //             resolve(result);
    //         });
    //     })
    // }

    module.exports = router;