<template>
  <div>
    <canvas ref="canvas"></canvas>
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted, watch } from "vue";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";

// Enregistrer les composants de Chart.js
ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

export default {
  props: {
    chartData: {
      type: Object,
      required: true,
    },
    categoryName: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const canvas = ref(null); // Référence pour le canvas HTML
    let chartInstance = null; // Instance du graphique

    // Fonction pour créer le graphique
    const createChart = () => {
      console.log("Creating chart for category:", props.categoryName);

      // Extraire les labels et les valeurs
      const labels = Object.keys(props.chartData);
      const values = Object.values(props.chartData);

      // Configuration du graphique
      const data = {
        labels: labels, // "premier", "deuxième", etc.
        datasets: [
          {
            label: props.categoryName,
            backgroundColor: "#42A5F5",
            data: values, // Valeurs associées
          },
        ],
      };

      const options = {
        responsive: true,
        plugins: {
          legend: {
            position: "top",
          },
          title: {
            display: true,
            text: props.categoryName,
          },
        },
      };

      // Si un graphique existe déjà, le détruire avant d'en créer un nouveau
      if (chartInstance) {
        console.log(
          "Destroying previous chart instance for category:",
          props.categoryName
        );
        chartInstance.destroy();
      }

      // Créer une nouvelle instance de graphique et la stocker
      chartInstance = new ChartJS(canvas.value, {
        type: "bar",
        data: data,
        options: options,
      });
    };

    // Regarder les changements dans les props et ne recréer le graphique que si les données changent
    watch(
      () => props.chartData,
      (newData, oldData) => {
        console.log("Chart data updated for category:", props.categoryName);
        createChart(); // Recréer le graphique si les données changent
      },
      { deep: true, immediate: true }
    );

    // Nettoyage de l'instance du graphique lorsqu'il est démonté
    onUnmounted(() => {
      if (chartInstance) {
        console.log(
          "Destroying chart on unmount for category:",
          props.categoryName
        );
        chartInstance.destroy();
      }
    });

    return {
      canvas,
    };
  },
};
</script>
