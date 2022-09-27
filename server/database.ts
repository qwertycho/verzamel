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
        userName = this.sani(userName);
        password = this.sani(password);
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
},
    addUser: async function(userName, password) {
      console.log("add user");
      userName = userName.toLowerCase();
      userName = this.sani(userName);
      password = this.sani(password);
      
        let conn;
        try {
        // connectie maken met de database
        conn = await this.pool.getConnection();
        const row = await conn.query("SELECT * FROM gebruikers WHERE username = ?", [userName]);
        console.log(row);
        
        // als de gebruiker niet bestaat in de database is de row leeg
        if (row.length == 0) {
          console.log("gebruiker bestaat niet");
          await conn.query("INSERT INTO gebruikers (username, password) VALUES (?, ?)", [userName, password]);
          conn.end()
          return true;
        } else {
          console.log("gebruiker bestaat al");
          conn.end()
          return false;
        }
      } catch (err) {
        // als er een error is, log deze dan
        console.log("db error");
        console.log(err);
        throw err;
      }
    },

    addItem: async function(itemName, itemImg, itemPrice, itemDesc, itemCat, itemOwner) {
      console.log("add user");
      itemName = this.sani(itemName);
      itemImg = this.sani(itemImg);
      itemPrice = this.sani(itemPrice);
      itemDesc = this.sani(itemDesc);
      itemCat = this.sani(itemCat);
      itemOwner = this.sani(itemOwner);
      let conn;
      try {
      // connectie maken met de database
      conn = await this.pool.getConnection();
      const row = await conn.query("INSERT INTO verza (naam , tekst , thumbnail , datum, prijs , eigenaar , class) VALUES (? , ? , ? , ? , ? , ? , ?)", [itemName, itemDesc, itemImg, new Date(), itemPrice, itemOwner, itemCat]);
      console.log("item added");
      console.log(row);
      conn.end()
    } catch (err) {
      // als er een error is, log deze dan
      console.log("db error");
      console.log(err);
      throw err;
    }
 },

sani: function(str) {
  let safe = str.replace(/</g, "&lt;").replace(/>/g, "&gt;");
  safe = safe.replace(/'/g, "&#39;").replace(/"/g, "&quot;");
  safe = safe.replace(/&/g, "&amp;");
  safe = safe.replace(/`/g, "&#96;");
  safe = safe.replace(/\(/g, "&#40;").replace(/\)/g, "&#41;");
  safe = safe.replace(/\{/g, "&#123;").replace(/\}/g, "&#125;");
  safe = safe.replace(/\[/g, "&#91;").replace(/\]/g, "&#93;");
  safe = safe.replace(/\//g, "&#47;").replace(/\\/g, "&#92;");
  safe = safe.replace(/=/g, "&#61;").replace(/;/g, "&#59;");
  safe = safe.replace(/:/g, "&#58;").replace(/,/g, "&#44;");
  safe = safe.replace(/\?/g, "&#63;").replace(/!/g, "&#33;");
  safe = safe.replace(/\|/g, "&#124;").replace(/@/g, "&#64;");
  safe = safe.replace(/#/g, "&#35;").replace(/\$/g, "&#36;");
  safe = safe.replace(/%/g, "&#37;").replace(/\^/g, "&#94;");
  safe = safe.replace(/&/g, "&#38;").replace(/\*/g, "&#42;");
  safe = safe.replace(/\+/g, "&#43;").replace(/-/g, "&#45;");
  safe = safe.replace(/\./g, "&#46;").replace(/~/g, "&#126;");
  safe = safe.trim();
  return safe
 },

    getItems: async function() {
      let conn;
      try {
      // connectie maken met de database
      conn = await this.pool.getConnection();
      const row = await conn.query("SELECT * FROM verza");
      console.log(row);
      conn.end()
      return row;
    } catch (err) {
      // als er een error is, log deze dan
      console.log("db error");
      console.log(err);
      throw err;
    }
   }

};

module.exports = database;