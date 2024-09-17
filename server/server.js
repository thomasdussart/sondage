const express = require("express");
const app = express();
const port = 1337;
const fs = require("fs");
const path = require("path");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
var cors = require("cors");

// Chemin du fichier JSON
const jsonFilePath = path.join(__dirname, "/db/categories.json");

app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/data", (req, res) => {
  console.log(typeof req.body.clickOrder, req.body.clickOrder);
  const clickOrderArray = JSON.parse(req.body.clickOrder);
  console.log(clickOrderArray[0]);
  console.log(clickOrderArray[1]);
  console.log(clickOrderArray[2]);
  console.log(clickOrderArray[3]);

  // Lire le fichier JSON existant
  fs.readFile(jsonFilePath, "utf-8", (err, data) => {
    if (err) {
      console.error("Erreur lors de la lecture du fichier JSON:", err);
      return;
    }

    // Parser les données JSON existantes
    let categoryData;
    try {
      categoryData = JSON.parse(data);
    } catch (parseError) {
      console.error("Erreur lors du parsing des données JSON:", parseError);
      return;
    }

    // Parcourir l'ordre des clics et mettre à jour les compteurs
    clickOrderArray.forEach((categoryName, index) => {
      const position = index + 1; // La position (1 = premier, 2 = deuxième, etc.)

      // Créer l'entrée pour la catégorie si elle n'existe pas
      if (!categoryData[categoryName]) {
        categoryData[categoryName] = {
          premier: 0,
          deuxième: 0,
          troisième: 0,
          quatrième: 0,
        };
      }

      // Incrémenter le bon compteur en fonction de la position
      switch (position) {
        case 1:
          categoryData[categoryName].premier++;
          break;
        case 2:
          categoryData[categoryName].deuxième++;
          break;
        case 3:
          categoryData[categoryName].troisième++;
          break;
        case 4:
          categoryData[categoryName].quatrième++;
          break;
      }
    });

    // Écrire à nouveau dans le fichier JSON avec les données mises à jour
    fs.writeFile(jsonFilePath, JSON.stringify(categoryData, null, 2), (err) => {
      if (err) {
        console.error("Erreur lors de l'écriture du fichier JSON:", err);
      } else {
        console.log("Les données ont été mises à jour avec succès.");
      }
    });
  });
});

app.post("/questions-mobilite", (req, res) => {
  let data = JSON.stringify(req.body);
  let sData = data.split("/");
  let aData = Object.values(sData);
  console.log(aData);
  res.send("ok");
});

app.post("/questions-environnement", (req, res) => {
  console.log(req.body);
  res.send("ok");
});

app.post("/questions-culture", (req, res) => {
  console.log(req.body);
  res.send("ok");
});

app.post("/questions-sport", (req, res) => {
  console.log(req.body);
  res.send("ok");
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
