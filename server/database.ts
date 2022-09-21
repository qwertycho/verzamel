const mariadb = require("mariadb");

const database = {
    pool: mariadb.createPool({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        connectionLimit: 5
      }),
      checkUser: async function(userName, password) {
        let conn;
        try {
        // connectie maken met de database
        conn = await this.pool.getConnection();
        const row = await conn.query("SELECT * FROM gebruikers WHERE username = ?", [userName]);
        // als de gebruiker niet bestaat in de database is de row leeg
        if (row.length == 0) {
          console.log("gebruiker bestaat niet");
          return false;
        } else {
          if(row[0].password == password){
            console.log("passwords match");
            conn.end()
            return true;
          } else {
            console.log("passwords don't match");
            conn.end()
           return false;
          }
        }
      } catch (err) {
        // als er een error is, log deze dan
        console.log("db error");
        console.log(err);
      throw err;
      }
}
}

module.exports = database;