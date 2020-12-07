var mysql = require('mysql')
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'catalogue recettes'
})

connection.connect(function (err) {
  if (err) {
    console.log('Erreur de connexion à la BDD mySQL')
    throw err;
  }
  console.log("Connecté à la base de données MySQL !");
});



const express = require('express')
const multer = require('multer')
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express()
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors())
const port = 3001

//----------------------------UPLOAD PHOTO--------------------------//
// Uploadphoto pour les recettes 

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/img')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname)
  }
})

var upload = multer({ storage: storage }).single('file')

app.get('/', (req, res) => {
  res.send('Hello World!')
})


// ----------------------------RECETTES -------------------------------//
//1. On crée un nouvel endpoint pour afficher toutes les recettes
app.get('/recettes', (req, res) => {
  console.log(req.query.recetteDuMois) // recupere les attributs 
  var sql = `SELECT * FROM recettes`
  if (req.query.recetteDuMois == 'true') {
    sql = sql + ' WHERE  recette_mois = true'
  }

  connection.query(sql,
    function (err, rows, fields) { // rows est un array d'objets
      if (err) {
        res.send({
          message: err
        })
      } else {
        const data = {
          message: "ok",
          recettes: rows
        }
        res.send(data)
      }
    })
})

// 2. Requete SQL avec la méthode POST
app.post('/recette', (req, res) => {
  // req.body est un objet en l'esp avec 4 attributs: nom, photo, descrition et durée 
  console.log(req.body)
  // méthode upload pour télécharger les photos
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      return res.status(500).json(err)
    } else if (err) {
      return res.status(500).json(err)
    }
    const recetteForm = req.body;
    const photoUrl = `img/${req.file.filename}`

    //Insertion dans la BDD
    console.log(recetteForm)
    connection.query(
      `INSERT INTO recettes(nom_recette, photo_url, description, duree)
            VALUES(
              ${connection.escape(recetteForm.nom)},
              '${photoUrl}',
              ${connection.escape(recetteForm.description)},
               ${recetteForm.duree}
            )`,
      function (err, rows, fields) {
        if (err) {
          res.send({
            message: err
          })
        } else {
          res.send({
            message: 'recette enregistrée'
          })
        }
      }
    );
  })
})

// 4. Création de la fonction updateRecetteMois
function updateRecetteMois(id, recetteMois, res) {
  connection.query(
    `UPDATE recettes
    SET recette_mois = ${recetteMois}
    WHERE id_recette = ${id}`,
    function (err, rows, fields) {
      if (err) {
        res.send({
          message: err
        })
      } else {
        res.send({
          message: 'ok'
        })
      }
    }
  )
}
// 3. MAJ de la jour de la recette du mois, pour laquelle on va créer une fonction updateRecetteMois 
app.put('/recette/:id', (req, res) => {
  if (req.body.recetteMois == false) {
    updateRecetteMois(req.params.id, req.body.recetteMois, res)
  } else {
    connection.query(
      `SELECT COUNT(*) AS count_recette_mois FROM recettes
      WHERE recette_mois = true`,
      function (err, rows, fields) {
        if (err) {
          res.send({
            message: err
          })
        } else {
          const countRecetteMois = rows[0].count_recette_mois
          if (countRecetteMois < 3) {
            updateRecetteMois(req.params.id, req.body.recetteMois, res)
          } else {
            res.send({
              message: 'nombre de recettes du mois atteint (3)'
            })
          }
        }
      }
    )
  }
})

// 5. Suppression d'une recette de la liste
app.delete('/recette/:id', (req, res) => {
  connection.query(
    `DELETE  FROM recettes
    WHERE id_recette = ${req.params.id}`,
    function (err, rows, fields) {
      if (err) {
        res.send({
          message: err
        })
      } else {
        res.send({
          message: 'recette supprimée'
        })
      }
    })
})

// ----------------------------INGREDIENTS------------------------------------//
// 1.On crée un nouvel endpoint pour afficher tous les ingredients
app.get('/ingredients', (req, res) => {

  connection.query(
    'SELECT * FROM ingredients',
    function (err, rows, fields) { // rows est un array d'objets
      if (err) {
        res.send({
          message: err
        })
      } else {
        res.send({
          message: "ok",
          ingredients: rows
        })
      }
    })
})
//2.On fait la requête SQL INSERT INTO pour afficher dans la BDD
app.post('/ingredient', (req, res) => {
  // req.body est un objet en l'esp avec 3 attributs: nom, categorie et vege
  console.log(req.body)
  const ingredient = req.body;
  connection.query(
    `INSERT INTO ingredients(nom, categorie, vegetarien)
            VALUES(
              '${ingredient.nom}',
              '${ingredient.categorie}',
               ${ingredient.vege}
            )`,
    function (err, rows, fields) {
      if (err) {
        res.send({
          message: err
        })
      } else {
        res.send({
          message: 'ingrédient enregistré'
        })
      }
    });
})
// 3. Suppression de l'ingrédient de la liste
app.delete('/ingredient/:id', (req, res) => {
  connection.query(
    `DELETE  FROM ingredients
    WHERE id_ingredient = ${req.params.id}`,
    function (err, rows, fields) {
      if (err) {
        res.send({
          message: err
        })
      } else {
        res.send({
          message: 'ingrédient supprimé'
        })
      }
    })
})

//--------------------VOYAGES---------------------------//

//.1
app.get('/voyages', (req, res) => {

  connection.query(
    'SELECT * FROM voyages',
    function (err, rows, fields) { // rows est un array d'objets
      if (err) {
        res.send({
          message: err
        })
      } else {
        res.send({
          message: "ok",
          voyages: rows
        })
      }
    })
})

// 2. Requete SQL avec la méthode POST
app.post('/voyage', (req, res) => {
  console.log(req.body)
  // méthode upload pour télécharger les photos
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      return res.status(500).json(err)
    } else if (err) {
      return res.status(500).json(err)
    }
    const voyageForm = req.body;
    const photoUrl = `img/${req.file.filename}`

    //Insertion dans la BDD
    console.log(voyageForm)
    console.log(photoUrl);
    connection.query(
      `INSERT INTO voyages(nom_voyage, photo_url, description)
            VALUES(
              ${connection.escape(voyageForm.nom)},
             '${photoUrl}',
              ${connection.escape(voyageForm.description)}
            )`,
      function (err, rows, fields) {
        if (err) {
          res.send({
            message: err
          })
        } else {
          res.send({
            message: 'voyage enregistré'
          })
        }
      }
    );
  })
})

// 4. Création de la fonction updateVoyageMois
function updateVoyageMois(id, voyageMois, res) {
  connection.query(
    `UPDATE voyages
    SET voyage_mois = ${voyageMois}
    WHERE id_voyage = ${id}`,
    function (err, rows, fields) {
      if (err) {
        res.send({
          message: err
        })
      } else {
        res.send({
          message: 'ok'
        })
      }
    }
  )
}
// 3. MAJ de la jour du voyage du mois, pour laquelle on va créer une fonction updateRecetteMois 
app.put('/voyage/:id', (req, res) => {
  if (req.body.voyageMois == false) {
    updateVoyageMois(req.params.id, req.body.voyageMois, res)
  } else {
    connection.query(
      `SELECT COUNT(*) AS count_voyage_mois FROM voyages
      WHERE voyage_mois = true`,
      function (err, rows, fields) {
        if (err) {
          res.send({
            message: err
          })
        } else {
          const countVoyageMois = rows[0].count_voyage_mois
          if (countVoyageMois < 3) {
            updateVoyageMois(req.params.id, req.body.voyageMois, res)
          } else {
            res.send({
              message: 'nombre de voyages du mois atteint (3)'
            })
          }
        }
      }
    )
  }
})

//---------------------CHEFS-------------------------//
//1. 

app.get('/chefs', (req, res) => {

  connection.query(
    'SELECT * FROM  chefs',
    function (err, rows, fields) { // rows est un array d'objets
      if (err) {
        res.send({
          message: err
        })
      } else {
        res.send({
          message: "ok",
          chefs: rows
        })
      }
    })
})


// 2. Requete SQL avec la méthode POST
app.post('/chef', (req, res) => {
  console.log(req.body)
  // méthode upload pour télécharger les photos
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      return res.status(500).json(err)
    } else if (err) {
      return res.status(500).json(err)
    }
    const chefForm = req.body;
    const photoUrl = `img/${req.file.filename}`

    //Insertion dans la BDD
    console.log(chefForm)
    console.log(photoUrl);
    connection.query(
      `INSERT INTO chefs(nom_chef, photo_url, description)
            VALUES(
              ${connection.escape(chefForm.nom)},
             '${photoUrl}',
              ${connection.escape(chefForm.description)}
            )`,
      function (err, rows, fields) {
        if (err) {
          res.send({
            message: err
          })
        } else {
          res.send({
            message: 'chef enregistré'
          })
        }
      }
    );
  })
})

// 4. Création de la fonction updateChefMois
function updateChefMois(id, chefMois, res) {
  connection.query(
    `UPDATE chefs
    SET chef_mois = ${chefMois}
    WHERE id_chef = ${id}`,
    function (err, rows, fields) {
      if (err) {
        res.send({
          message: err
        })
      } else {
        res.send({
          message: 'ok'
        })
      }
    }
  )
}

// 3. MAJ de la jour du chef du mois, pour laquelle on va créer une fonction updateRecetteMois 
app.put('/chef/:id', (req, res) => {
  if (req.body.chefMois == false) {
    updateChefMois(req.params.id, req.body.chefMois, res)
  } else {
    connection.query(
      `SELECT COUNT(*) AS count_chef_mois FROM chefs
      WHERE chef_mois = true`,
      function (err, rows, fields) {
        if (err) {
          res.send({
            message: err
          })
        } else {
          const countChefMois = rows[0].count_chef_mois
          if (countChefMois < 3) {
            updateChefMois(req.params.id, req.body.chefMois, res)
          } else {
            res.send({
              message: 'nombre de chefs du mois atteint (3)'
            })
          }
        }
      }
    )
  }
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

