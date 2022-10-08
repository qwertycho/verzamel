const mariadb = require('mariadb');

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

 getObjects: async function(id) {
  try{

    if(id != undefined){
      let conn;
      conn = await this.pool.getConnection();
      const row = await conn.query("SELECT * FROM verza WHERE id = ?", [id]);
      console.log(row);
      conn.end()
      return row;
    } else {
      let conn;
      conn = await this.pool.getConnection();
      const row = await conn.query("SELECT * FROM verza");
      console.log(row);
      conn.end()
      return row;
    }
  } catch (err) {
    // als er een error is, log deze dan
    console.log("db error");
    console.log(err);
    throw err;
  }

 },

 addObjects: async function(id, naam, tekst, thumbnail, datum, prijs, eigenaar, klasse) {
  try{
    let conn;
    conn = await this.pool.getConnection();
    const row = await conn.query("INSERT INTO verza (id, naam , tekst , thumbnail , datum, prijs , eigenaar , class) VALUES (? , ? , ? , ? , ? , ? , ? , ?)", [id, naam, tekst, thumbnail, datum, prijs, eigenaar, klasse]);
    console.log(row);
    conn.end()
  } catch (err) {
    // als er een error is, log deze dan
    console.log("db error");
    console.log(err);
    throw err;
  }
},

getCollection: async function(id) {
  try{
    if (id != undefined){
      console.log("id is: " + id);
      
      let conn;
      conn = await this.pool.getConnection();
      const row = await conn.query("SELECT * FROM verza WHERE objectID = ?", [id]);
      conn.end()
      return row;
    } else {
      console.log("geen id meegegeven");
      
      let conn;
      conn = await this.pool.getConnection();
      const row = await conn.query("SELECT * FROM verza");
      conn.end()
      return row;
    }
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

 unescape: function(str) {
  let safe = str.replace(/&lt;/g, "<").replace(/&gt;/g, ">");
  safe = safe.replace(/&#39;/g, "'").replace(/&quot;/g, '"');
  safe = safe.replace(/&amp;/g, "&");
  safe = safe.replace(/&#96;/g, "`");
  safe = safe.replace(/&#40;/g, "(").replace(/&#41;/g, ")");
  safe = safe.replace(/&#123;/g, "{").replace(/&#125;/g, "}");
  safe = safe.replace(/&#91;/g, "[").replace(/&#93;/g, "]");
  safe = safe.replace(/&#47;/g, "/").replace(/&#92;/g, "\\");
  safe = safe.replace(/&#61;/g, "=").replace(/&#59;/g, ";");
  safe = safe.replace(/&#58;/g, ":").replace(/&#44;/g, ",");
  safe = safe.replace(/&#63;/g, "?").replace(/&#33;/g, "!");
  safe = safe.replace(/&#124;/g, "|").replace(/&#64;/g, "@");
  safe = safe.replace(/&#35;/g, "#").replace(/&#36;/g, "$");
  safe = safe.replace(/&#37;/g, "%").replace(/&#94;/g, "^");
  safe = safe.replace(/&#38;/g, "&").replace(/&#42;/g, "*");
  safe = safe.replace(/&#43;/g, "+").replace(/&#45;/g, "-");
  safe = safe.replace(/&#46;/g, ".").replace(/&#126;/g, "~");
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