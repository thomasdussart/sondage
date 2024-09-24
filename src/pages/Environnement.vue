<template>
  <v-responsive>
    <!-- Affichage de la question actuelle -->

    <div class="container">
      <!-- Boucle sur les options -->
      <div class="half one" @click="handleOptionClick(0)" style="color: white">
        {{ currentQuestion.options[0] }}
      </div>
      <div class="separation"></div>
      <h2 class="text-center circle">OU</h2>

      <div class="half two" @click="handleOptionClick(1)" style="color: white">
        {{ currentQuestion.options[1] }}
      </div>
    </div>
  </v-responsive>
</template>

<script>
import Swal from "sweetalert2";
import axios from "axios";
export default {
  data() {
    return {
      questions: [
        {
          options: [
            "Organiser une journée de ramassage de déchets dans les rues de Hannut",
            "Créer un jardin communautaire avec des plantations locales",
          ],
        },
        {
          options: [
            //prettier-ignore
            "Lancer un défi \"nettoyage du quartier\" avec récompenses pour le groupe qui ramasse le plus de déchets",
            "Organiser des ateliers de bricolage pour fabriquer des objets utiles à partir de matériaux recyclés",
          ],
        },
        {
          options: [
            "Organiser une journée de troc de fournitures scolaires pour échanger des objets non utilisés",
            "Créer une boîte à livres verte où les élèves peuvent déposer et prendre des livres gratuitement, en valorisant le recyclage de livres",
          ],
        },
      ],
      currentQuestionIndex: 0,
    };
  },
  computed: {
    currentQuestion() {
      return this.questions[this.currentQuestionIndex];
    },
  },
  methods: {
    handleOptionClick(index) {
      if (this.currentQuestionIndex < this.questions.length - 1) {
        if (index === 0) {
          console.log(this.currentQuestion.options[0]);
          axios.post("https://sondage-server.vercel.app/questions", {
            reponse: this.currentQuestion.options[0],
            category: "Environnement",
          });
        }
        if (index === 1) {
          console.log(this.currentQuestion.options[1]);
          axios.post("https://sondage-server.vercel.app/questions", {
            reponse: this.currentQuestion.options[1],
            category: "Environnement",
          });
        }
        this.currentQuestionIndex++;
      } else {
        if (index === 0) {
          console.log(this.currentQuestion.options[0]);
          axios.post("https://sondage-server.vercel.app/questions", {
            reponse: this.currentQuestion.options[0],
            category: "Environnement",
          });
        }
        if (index === 1) {
          console.log(this.currentQuestion.options[1]);
          axios.post("https://sondage-server.vercel.app/questions", {
            reponse: this.currentQuestion.options[1],
            category: "Environnement",
          });
        }

        this.markCategoryComplete();
      }
    },
    markCategoryComplete() {
      // Récupère les catégories complétées du localStorage
      const completedCategories =
        JSON.parse(localStorage.getItem("completedCategories")) || [];

      // Marquer la catégorie 'Mobilité' comme complétée
      if (!completedCategories.includes("Environnement")) {
        completedCategories.push("Environnement");
      }

      // Sauvegarder dans le localStorage
      localStorage.setItem(
        "completedCategories",
        JSON.stringify(completedCategories)
      );

      console.log("Catégories complétées après ajout:", completedCategories);

      // Rediriger vers la page d'accueil
      this.$router.push("/");
    },
  },
};
</script>

<!-- <style scoped>
h2 {
  margin-bottom: 20px;
}

.v-col {
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.v-btn {
  justify-content: center;
  align-items: center;
}
</style> -->
<style scoped>
/* Container principal qui contient les deux moitiés et le séparateur */
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;

  height: 100vh; /* Prendre toute la hauteur de l'écran */
  width: 100%; /* Prendre toute la largeur de l'écran */
  margin: 0; /* Retirer les marges par défaut */
  padding: 0; /* Retirer les padding par défaut */
  border: 5px black solid; /* Bordure noire */
}

.separation {
  height: 30px;
  background-color: black;
}

.circle {
  position: absolute;
  top: 50%; /* Positionner au milieu verticalement */
  left: 50%; /* Positionner au milieu horizontalement */
  transform: translate(-50%, -50%); /* Centrer exactement avec translate */
  width: 150px;
  height: 150px;
  background-color: black; /* Couleur de fond noire */
  border-radius: 50%; /* Créer un cercle */
  display: flex;
  justify-content: center; /* Centrer horizontalement le texte */
  align-items: center; /* Centrer verticalement le texte */
  color: white; /* Couleur du texte en blanc */
  font-size: 2rem; /* Taille du texte */
  font-weight: bold; /* Texte en gras */
  text-transform: uppercase; /* Majuscules */
  z-index: 1; /* Placer au-dessus des autres éléments */
}

/* Chaque moitié (YES et NO) */
.half {
  display: flex;
  justify-content: center; /* Centrer horizontalement */
  align-items: center; /* Centrer verticalement */
  flex: 1; /* Prendre la moitié de la hauteur de l'écran */
  color: white; /* Couleur du texte en blanc */
  font-size: 5rem; /* Taille du texte */
  font-weight: bold; /* Texte en gras */
  text-align: center;
}

.one {
  padding: 10px 40px;
  border-radius: 10px;
  font-size: 3rem;
  text-decoration: none;
  /* Ici on modifie la couleur et le fond de notre petit bouton */
  background-color: #3498db;
  text-shadow: 0px -2px #2980b9;
  transition: all 0.1s;
  -webkit-transition: all 0.1s;
  cursor: pointer;
}

.one:active {
  transform: translate(0px, 5px);
  -webkit-transform: translate(0px, 5px);
  border-bottom: 1px solid;
}

.two {
  /* Couleur rouge */
  padding: 10px 40px;
  border-radius: 10px;
  text-decoration: none;
  font-size: 3rem;
  background-color: #d0021b;
  text-shadow: 0px -2px #c22020;
  transition: all 0.1s;
  -webkit-transition: all 0.1s;
  cursor: pointer;
}

.two:active {
  transform: translate(0px, -5px);
  -webkit-transform: translate(0px, -5px);
  border-bottom: 1px solid;
}

/* Le séparateur entre les deux moitiés avec le texte OR */
.separator {
  background-color: black; /* Fond noir */
  color: white; /* Texte en blanc */
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80px; /* Hauteur du séparateur */
  font-size: 2rem; /* Taille du texte OR */
  font-weight: bold; /* Texte en gras */
  text-transform: uppercase; /* Texte en majuscules */
}
</style>
