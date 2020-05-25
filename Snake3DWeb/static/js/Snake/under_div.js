let  graph_el_1 = null,
     graph_el_2 = null,
     graph_el_3 = null,
     displaying_graphs = false;
window.addEventListener('load',()=> {
    let html_el = document.getElementsByTagName('html')[0],
        under_div = document.getElementById('under-div'),
        snake_metrics = document.getElementById('snake-metrics'),
        snake_theory = document.getElementById('snake-theory');


    function graph_1() {
        let trace1 = {
            x:[],
            y: [],
            type: 'scatter'
        };
        let layout = {
            showlegend: false,
            title: "Terminal Time Step of Each Episode",
            yaxis: {title: "Time Step"},
            xaxis: {title: "Episode Step"}
        };

        let data = [trace1];
        Plotly.newPlot('graph-1', data, layout);
    }
    function graph_2(){
        let trace1 = {
            x:[],
            y: [],
            type: 'scatter'
        };
        let layout = {
            showlegend: false,
            title: "Number of States Discovered at Episode",
            yaxis: {title: "Number States"},
            xaxis: {title: "Episode Step"}
        };
        let data = [trace1];
        Plotly.newPlot('graph-2', data, layout);
    }
    function graph_3(){

        var trace1 = {
          x:[],
          y: [],
          type: "scatter",
        };
         let layout = {
            showlegend: false,
            title: "Max Reward at Episode",
            yaxis: {title: "Max Reward"},
            xaxis: {title: "Episode Step"}
        };

        var data = [trace1];
        Plotly.newPlot('graph-3', data);
    }

    document.getElementById('feature-metrics').addEventListener('click', () => {
            html_el.style.overflowY = "visible";
            snake_theory.classList.add('d-none');
            snake_metrics.classList.remove('d-none');
            under_div.classList.remove('d-none');
            graph_el_1 = document.getElementById('graph-1');
            graph_el_2 = document.getElementById('graph-2');
            graph_el_3 = document.getElementById('graph-3');
            displaying_graphs = true;
            graph_1();
            graph_2();
            graph_3();
        });
    document.getElementById('metric-input-step').addEventListener('input',(element)=>{
        metric_step = element.currentTarget.value;
    });

    document.getElementById("theory-div").addEventListener('click', () => {
            html_el.style.overflowY = "visible";
            under_div.classList.remove('d-none');
            snake_metrics.classList.add('d-none');
            snake_theory.classList.remove('d-none');
        });

});


let metric_step = 4;
function update_statistic_data() {
        if (displaying_graphs && environment.time_step % metric_step === 0) {
            Plotly.extendTraces(graph_el_1, {x:[[environment.episode_step]], y: [[environment.time_step]]}, [0],41);
            Plotly.extendTraces(graph_el_2, {x:[[environment.episode_step]], y: [[Object.keys(policy.Q).length]]}, [0],21);
            Plotly.extendTraces(graph_el_3, {x:[[environment.episode_step]], y: [[snake.length-1]]}, [0],11);
        }
}





