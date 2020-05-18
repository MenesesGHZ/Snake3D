 let statistic_data ={
        "scoreEarned":[],
        "statesCardinality":[],
        "timeStepByEpisode":[],
    },
     graph_el_1 = null,
     graph_el_2 = null,
     graph_el_3 = null,
     displaying_graphs = false;
window.addEventListener('load',()=> {
    let html_el = document.getElementsByTagName('html')[0],
        under_div = document.getElementById('under-div'),
        snake_metrics = document.getElementById('snake-metrics');

    document.getElementById('feature-metrics').addEventListener('click', () => {
        html_el.style.overflowY = "visible";
        under_div.classList.remove('d-none');
        snake_metrics.classList.remove('d-none');
        graph_el_1 = document.getElementById('graph-1');
        graph_el_2 = document.getElementById('graph-2');
        graph_el_3 = document.getElementById('graph-3');
        displaying_graphs = true;
        graph_1();
        graph_2();
        graph_3();
    });

    function graph_1() {
        let trace1 = {
            y: statistic_data["timeStepByEpisode"],
            type: 'scatter'
        };
        let layout = {
            showlegend: false,
            title: "Terminal Time Step of Each Episode",
            yaxis: {title: "Time Step"},
            xaxis: {title: "Episode Step"}
        };

        let data = [trace1];
        Plotly.newPlot('graph-1', data, layout,60);
        statistic_data["timeStepByEpisode"] = [];
    }
    function graph_2(){
        let trace1 = {
            y: statistic_data["statesCardinality"],
            type: 'scatter'
        };
        let layout = {
            showlegend: false,
            title: "Number of States Discovered at Episode",
            yaxis: {title: "Number States"},
            xaxis: {title: "Episode Step"}
        };
        let data = [trace1];
        Plotly.newPlot('graph-2', data, layout,60);
        statistic_data["statesCardinality"] = [];
    }
    function graph_3(){

        var trace1 = {
          y: statistic_data["scoreEarned"],
          type: "scatter",
        };

        var data = [trace1];
        var layout = {barmode: "stack"};
        Plotly.newPlot('graph-3', data, layout,5);
        statistic_data["scoreEarned"] = [];
    }
});

function update_statistic_data() {
        statistic_data["scoreEarned"].push(snake.length-1);
        statistic_data["statesCardinality"].push(Object.keys(policy.Q).length);
        statistic_data["timeStepByEpisode"].push(environment.time_step);
        if (displaying_graphs) {
            Plotly.extendTraces(graph_el_1, {y: [statistic_data["timeStepByEpisode"]]}, [0],41);
            Plotly.extendTraces(graph_el_2, {y: [statistic_data["statesCardinality"]]}, [0],21);
            Plotly.extendTraces(graph_el_3, {y: [statistic_data["scoreEarned"]]}, [0],11);
            statistic_data["timeStepByEpisode"] = [];
            statistic_data["statesCardinality"] = [];
            statistic_data["scoreEarned"] = [];
        }
}



