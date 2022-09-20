// de hooft route naar de root van de server
router.get('/database', (req, res) => {
    const { resolveInclude } = require('ejs');
    const express = require('express');
    const router = express.Router();
    const cookieParser = require('cookie-parser');
    router.use(cookieParser())

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



    module.exports = router;