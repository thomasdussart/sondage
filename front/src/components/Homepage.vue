<template>
  <v-responsive>
    <div class="homepage">
      <div class="centered-row">
        <v-card
          :disabled="completedCategories.includes('Mobilité')"
          :class="{ 'grey-out': completedCategories.includes('Mobilité') }"
          color="red"
          @click="handleCategoryClick('Mobilité')"
          class="card d-flex justify-center align-center"
        >
          Mobilité
        </v-card>
        <v-card
          :disabled="completedCategories.includes('Environnement')"
          :class="{ 'grey-out': completedCategories.includes('Environnement') }"
          color="blue"
          @click="handleCategoryClick('Environnement')"
          class="card d-flex justify-center align-center"
          >Environnement</v-card
        >
      </div>
      <div class="centered-row">
        <v-card
          :disabled="completedCategories.includes('Culture')"
          :class="{ 'grey-out': completedCategories.includes('Culture') }"
          color="green"
          @click="handleCategoryClick('Culture')"
          class="card d-flex justify-center align-center"
          >Culture</v-card
        >
        <v-card
          :disabled="completedCategories.includes('Sport')"
          :class="{ 'grey-out': completedCategories.includes('Sport') }"
          color="yellow"
          @click="handleCategoryClick('Sport')"
          class="card d-flex justify-center align-center"
          >Sport</v-card
        >
      </div>
      <v-btn v-if="restart?.length === 46" @click="handleRestart"
        >Redémarrer</v-btn
      >
    </div>
  </v-responsive>
</template>

<script setup>
import axios from "axios";
import { ref, onMounted } from "vue";

localStorage.setItem("reponses", "");
let restart = localStorage?.getItem("completedCategories");
const completedCategories = ref([]);

// Fonction pour rediriger vers la catégorie choisie
const handleCategoryClick = (category) => {
  // Redirection basée sur la catégorie
  switch (category) {
    case "Mobilité":
      window.location.href = "/mobilite";
      break;
    case "Environnement":
      window.location.href = "/environnement";
      break;
    case "Culture":
      window.location.href = "/culture";
      break;
    case "Sport":
      window.location.href = "/sport";
      break;
    default:
      break;
  }
};

const handleRestart = () => {
  let clickOrder = localStorage.getItem("completedCategories");
  let reponses = localStorage.getItem("reponses");
  console.log("reponses", reponses);
  console.log("Redémarrage du questionnaire", clickOrder);
  axios
    .post(
      "http://localhost:1337/data",
      {
        clickOrder: clickOrder,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    .then(() => {
      console.log("Données envoyées au serveur");
    });
  localStorage.removeItem("completedCategories");
  completedCategories.value = [];
  window.location.href = "/";
};

// Récupérer les catégories complétées du localStorage
onMounted(() => {
  const savedCategories =
    JSON.parse(localStorage.getItem("completedCategories")) || [];
  console.log("Catégories complétées récupérées:", savedCategories); // Vérification des données
  completedCategories.value = [...savedCategories]; // Clonage pour s'assurer que Vue détecte le changement
});
</script>

<style>
.homepage {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  padding: 10px;
}

.centered-row {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-bottom: 20px;
}

.card {
  width: 400px;
  height: 200px;
  border-radius: 20px;
}

/* Catégories grisées */
.grey-out {
  background-color: grey;
  pointer-events: none;
  opacity: 0.6;
}
</style>
