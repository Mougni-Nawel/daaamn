const bcrypt = require("bcrypt");
const express = require("express");
const app = express();

const path = require("path");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false })); // <--- paramétrage du middleware
//app.set("views", __dirname + "/views");

const sqlite3 = require("sqlite3").verbose();
const db_name = 'ARosaje.sqlite'
const db = new sqlite3.Database(db_name, err => {
  if (err) {
    return console.error(err.message);
  }
  console.log("Connexion réussie à la base de données "+ db_name);
});




app.get("/", (req, res) => {
    // res.send("Bonjour le monde...");
    res.render("index.ejs");
  });

  app.get("/about", (req, res) => {
    res.render("about.ejs");
  });

  app.get("/data", (req, res) => {
    const test = {
      titre: "Test",
      items: ["un", "deux", "trois"]
    };
    res.render("data.ejs", { model: test });
  });

  app.get("/listes", (req, res) => {
    const sql = "SELECT * FROM Listes";
    db.all(sql, [], (err, rows) => {
      if (err) {
        return console.error(err.message);
      }
      res.render("listes.ejs", {model:rows });
      //return res.json({data:data})
    });
  });
  


  // GET /edit/5
app.get("/edit/:id", (req, res) => {
  const id = req.params.id;
  const sql = "SELECT * FROM Listes WHERE Plante_ID = ?";
  db.get(sql, id, (err, row) => {
    // if (err) ...
    res.render("edit.ejs", { model: row });
  });
});

// POST /edit/5
app.post("/edit/:id", (req, res) => {
  
  const id = req.params.id;
  const book = [req.body.photos, req.body.nomplante, req.body.geolocalisation, req.body.proprietaire, req.body.commentaires, id];
  const sql = "UPDATE Listes SET Photos = ?, Nomplante = ?, Geolocalisation = ?, Proprietaire = ?, Commentaires = ? WHERE (Plante_ID = ?)";
  db.run(sql, book, err => {
    // if (err) ...
    res.redirect("/listes");
  });
});

app.get("/botaniste", (req, res) => {
  const sql = "SELECT * FROM Listes";
  db.all(sql, [], (err, rows) => {
    if (err) {
      return console.error(err.message);
    }
    res.render("botaniste.ejs", {model:rows });
    //return res.json({data:data})
  });
});

  // GET /comment/5
  app.get("/comment/:id", (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM Listes WHERE Plante_ID = ?";
    db.get(sql, id, (err, row) => {
      // if (err) ...
      res.render("comment.ejs", { model: row });
    });
  });
  
  // POST /comment/5
  app.post("/comment/:id", (req, res) => {
    
    const id = req.params.id;
    const book = [req.body.commentaires, id];
    const sql = "UPDATE Listes SET Commentaires = ? WHERE (Plante_ID = ?)";
    //const sql = "INSERT INTO Listes (Commentaires) VALUE(?)";
    db.run(sql, book, err => {
      // if (err) ...
      res.redirect("/botaniste");
    });
  });


// GET /create
app.get("/create", (req, res) => {
  res.render("create.ejs", { model: {} });
});

// POST /create
app.post("/create", (req, res) => {
  const sql = "INSERT INTO Listes (Photos, Nomplante, Geolocalisation, Proprietaire, Commentaires) VALUES (?, ?, ?, ?, ?)";
  const book = [req.body.photos, req.body.nomplante, req.body.geolocalisation, req.body.proprietaire, req.body.commentaires];
  db.run(sql, book, err => {
    // if (err) ...
    res.redirect("/listes");
  });
});



// GET /delete/5
app.get("/delete/:id", (req, res) => {
  const id = req.params.id;
  const sql = "SELECT * FROM Listes WHERE Plante_ID = ?";
  db.get(sql, id, (err, row) => {
    // if (err) ...
    res.render("delete.ejs", { model: row });
  });
});

// POST /delete/5
app.post("/delete/:id", (req, res) => {
  const id = req.params.id;
  const sql = "DELETE FROM Listes WHERE Plante_ID = ?";
  db.run(sql, id, err => {
    // if (err) ...
    res.redirect("/listes");
  });
});



// GET /connexion
app.get("/userconnexion", (req, res) => {
  res.render("userconnexion.ejs", { model: {} });
});
// POST /connexion
app.get("/userconnexion", (req, res) => {
  const pseudo = "SELECT pseudo FROM connexion"
  const password = "SELECT password FROM connexion"

  if(pseudo == req.body.username && password == req.body.password){
    res.redirect("/listes");
  }

  //const sql = "INSERT INTO Listes (Photos, Nomplante, Geolocalisation, Proprietaire, Commentaires) VALUES (?, ?, ?, ?, ?)";
  //const book = [req.body.photos, req.body.nomplante, req.body.geolocalisation, req.body.proprietaire, req.body.commentaires];
  /*db.run(sql, book, err => {
    // if (err) ...
    res.redirect("/listes");
  });
  */
});


// GET /connexion
app.get("/botaconnexion", (req, res) => {
  res.render("botaconnexion.ejs", { model: {} });
});
/*
// POST /connexion
app.post("/create", (req, res) => {
  const sql = "INSERT INTO Listes (Photos, Nomplante, Geolocalisation, Proprietaire, Commentaires) VALUES (?, ?, ?, ?, ?)";
  const book = [req.body.photos, req.body.nomplante, req.body.geolocalisation, req.body.proprietaire, req.body.commentaires];
  db.run(sql, book, err => {
    // if (err) ...
    res.redirect("/listes");
  });
});
*/




app.get("/formulaire", (req, res) => {
  res.render("formulaire.ejs", { model: {} });
});

// POST /create
app.post("/formulaire", (req, res) => {
bcrypt.hash(req.body.Password, 50)
.then((hashpass) =>{
  const sql = "INSERT INTO utilisateur (user_firstname, user_lastname, pseudo, password, role, nombre_plante) VALUES (?, ?, ?, ?, ?, ?)";
  const book = [req.body.Prenom, req.body.Nom, req.body.Pseudo, hashpass, req.body.Role, req.body.NbrPlante];
  db.run(sql, book, err => {
    // if (err) ...
    res.redirect("/formulaire");
  });
})

  
});


  app.listen(3000, () => {
    console.log("Serveur démarré (http://localhost:3000/) !");
  });
/*
fetch('http://localhost:300/data')
.then((data)=>{
    console.log(JSON.stringify(data, null, 2))
})
*/
