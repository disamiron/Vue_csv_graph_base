import PieChart from "./PieChart.js";

var results = [];
let childsByID = {};
d3.csv("./base/base.csv").then(function(data) {
    data.forEach(child => childsByID[child.rid] = child); //new
    results.push(data);
});



var app = new Vue({
    el: '#app',
    data() {
        return {
            fullBase: results,
            graphName : "Выберите учащегося для получения информации об успехах",
            graphInfo : "",
            graphKey : 0,
            chartOptions: {
                hoverBorderWidth: 10
            },
            chartData: {
                hoverBackgroundColor: "red",
                hoverBorderWidth: 10,
                labels: ["Математика", "Информатика", "Физика", "История", "Рисование", "Английский"],
                datasets: [
                    {
                    label: "Data One",
                    backgroundColor: ["#20B2AA", "#3CB371", "#FA8072", "#FFFF00", "#8A2BE2", "#F4A460"],
                    data: []
                    }
                ]
            }
        };
      },
    methods: {
        showGraph: function(e) {
            var childId = e.path[1].id;
            let child = childsByID[childId];
            let chartDataSet = app.chartData.datasets[0].data;

            app.graphName = child.child_name+" "+child.child_surname+".";
            app.graphInfo = `Школа № ${child.school_id}, ${child.classnum} класс.`;  
            for (let i = 0; i < 6; i++){
                chartDataSet[i] = +child[i+1];
            }
            app.graphKey += 1;
        }
    },
    components: {
        PieChart
    }
  })

