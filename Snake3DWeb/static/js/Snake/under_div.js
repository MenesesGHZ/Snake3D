 let statistic_data ={
        "snakeLength":1,
        "statesCardinality":0,
        "timeStepByEpisode":[],
    },
  graph_el_1 = document.getElementById('graph-1');
window.addEventListener('load',()=> {
    let html_el = document.getElementsByTagName('html')[0],
        under_div = document.getElementById('under-div'),
        snake_metrics = document.getElementById('snake-metrics');

    document.getElementById('feature-metrics').addEventListener('click', () => {
        html_el.style.overflowY = "visible";
        under_div.classList.remove('d-none');
        snake_metrics.classList.remove('d-none');
        graph_1();
        //graph_2();
    });

function graph_1(){
    let x_data = []
    for(let i=1;i<=statistic_data["timeStepByEpisode"].length;i++){
        x_data.push(i);
    }
    let trace1 = {
      x: x_data,
      y: statistic_data["timeStepByEpisode"],
      type: 'scatter'
    };
    let layout = {
      showlegend: false,
      title: "Terminal Time Step in Each Episode",
      yaxis: {title: "Time Step"},
      xaxis: {title: "Episode Step"}
    };

    let data = [trace1];
    Plotly.newPlot('graph-1', data);
}

function update_graph(graph_name) {
    if(graph_name === "graph-1"){
        Plotly.addTraces(graph_el_1, {x: statistic_data["timeStepByEpisode"].length});

        /*var update = {
            'y': statistic_data["timeStepByEpisode"]
        };
        Plotly.relayout(graph_1, update)

         */
    }
}

setInterval(()=>{update_graph('graph-1') },5000)


});




function update_statistic_data(){
    statistic_data["snakeLength"] = snake.length;
    statistic_data["statesCardinality"] = Object.keys(policy.Q).length;
    statistic_data["timeStepByEpisode"].push(environment.time_step);
}




