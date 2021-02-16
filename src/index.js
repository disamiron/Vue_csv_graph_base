import PieChart from "./PieChart.js";

var results = [];
d3.csv("./base/base.csv").then(function(data) {
    results.push(data)
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
            for (let i = 0; i < app.fullBase[0].length; i++) {
                if(app.fullBase[0][i]["rid"]==childId){
                    app.graphName = app.fullBase[0][i]["child_name"]+" "+app.fullBase[0][i]["child_surname"] + ".";
                    app.graphInfo = "Школа №" + app.fullBase[0][i]["school_id"]+", "+app.fullBase[0][i]["classnum"] +" класс.";
                    app.chartData.datasets[0]["data"][0] = +app.fullBase[0][i][1];
                    app.chartData.datasets[0]["data"][1] = +app.fullBase[0][i][2];
                    app.chartData.datasets[0]["data"][2] = +app.fullBase[0][i][3];
                    app.chartData.datasets[0]["data"][3] = +app.fullBase[0][i][4];
                    app.chartData.datasets[0]["data"][4] = +app.fullBase[0][i][5];
                    app.chartData.datasets[0]["data"][5] = +app.fullBase[0][i][6];
                    app.graphKey=app.graphKey+1;
                }
            }
        }
    },
    components: {
        PieChart
    }
  })

