const express = require("express");
const fs = require("fs");
const app = express();
const port = 5000;

// Configurer le moteur de vue EJS
app.set("view engine", "ejs");

// Page d'accueil avec tous les liens pour tester les alarmes
app.get("/", (req, res) => {
  res.render("alarm", {
    message:
      "Bienvenue sur la page de test des alarmes AWS CloudWatch. Cliquez sur une alarme pour la tester.",
  });
});

// Simuler une utilisation CPU élevée
app.get("/cpu-utilization", (req, res) => {
  const startTime = Date.now();
  let sum = 0;

  while (Date.now() - startTime < 5000) {
    sum += Math.random();
  }

  console.log("Simulation de l'utilisation CPU élevée.");
  res.render("alarm", {
    message:
      "Alarme : CPU Utilization - Simulation d'une forte utilisation CPU terminée.",
  });
});

// Simuler un trafic réseau entrant
app.get("/network-in", (req, res) => {
  fs.readFile("path/to/large/file", (err) => {
    if (err) {
      console.error("Erreur de lecture du fichier :", err);
      return res.status(500).render("alarm", {
        message: "Erreur de simulation du trafic réseau entrant.",
      });
    }

    console.log("Simulation d'un trafic réseau entrant.");
    res.render("alarm", {
      message: "Alarme : Network In - Simulation d'un trafic entrant terminée.",
    });
  });
});

// Simuler un trafic réseau sortant
app.get("/network-out", (req, res) => {
  fs.writeFile("path/to/output/file", "Données simulées...", (err) => {
    if (err) {
      console.error("Erreur d'écriture du fichier :", err);
      return res.status(500).render("alarm", {
        message: "Erreur de simulation du trafic réseau sortant.",
      });
    }

    console.log("Simulation d'un trafic réseau sortant.");
    res.render("alarm", {
      message:
        "Alarme : Network Out - Simulation d'un trafic sortant terminée.",
    });
  });
});

// Simuler un échec de vérification d'état
app.get("/status-check-failed", (req, res) => {
  console.log("Simulation d'un échec de vérification d'état.");
  res.status(500).render("alarm", {
    message:
      "Alarme : Status Check Failed - Simulation d'un échec de vérification d'état.",
  });
});

// Simuler des opérations de lecture EBS
app.get("/ebs-read-ops", (req, res) => {
  fs.readFile("path/to/ebs/read/file", (err) => {
    if (err) {
      console.error("Erreur de lecture EBS :", err);
      return res.status(500).render("alarm", {
        message: "Erreur de simulation des opérations de lecture EBS.",
      });
    }

    console.log("Simulation d'opérations de lecture EBS.");
    res.render("alarm", {
      message:
        "Alarme : EBS Read Ops - Simulation des opérations de lecture terminée.",
    });
  });
});

// Simuler des opérations d'écriture EBS
app.get("/ebs-write-ops", (req, res) => {
  fs.writeFile("path/to/ebs/write/file", "Données écrites...", (err) => {
    if (err) {
      console.error("Erreur d'écriture EBS :", err);
      return res.status(500).render("alarm", {
        message: "Erreur de simulation des opérations d'écriture EBS.",
      });
    }

    console.log("Simulation d'opérations d'écriture EBS.");
    res.render("alarm", {
      message:
        "Alarme : EBS Write Ops - Simulation des opérations d'écriture terminée.",
    });
  });
});

// Démarrer le serveur
app.listen(port, () => {
  console.log(`Serveur en cours d'exécution sur http://localhost:${port}`);
});

module.exports = app;
