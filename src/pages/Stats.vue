<template>
  <div>
    <h1>Statistiques par Catégorie</h1>

    <!-- Boucle pour afficher un graphique par catégorie -->
    <div v-for="(categoryData, categoryName, index) in dataChart" :key="index">
      <h2>{{ categoryName }}</h2>
      <category-chart
        :chart-data="categoryData"
        :category-name="categoryName"
      />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import CategoryChart from "../components/CategoryChart.vue";

export default {
  components: {
    CategoryChart,
  },
  data() {
    return {
      dataChart: {},
    };
  },
  mounted() {
    // Récupérer les données de l'API pour /data
    axios.get("/data").then((response) => {
      this.dataChart = response.data;
    });
  },
};
</script>
