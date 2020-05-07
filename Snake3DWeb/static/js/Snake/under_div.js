window.addEventListener('load',()=>{
    let html_el = document.getElementsByTagName('html')[0],
        under_div = document.getElementById('under-div'),
        snake_metrics = document.getElementById('snake-metrics');
    document.getElementById('feature-metrics').addEventListener('click',()=>{
       html_el.style.overflowY = "visible";
       under_div.classList.remove('d-none');
       snake_metrics.classList.remove('d-none');
       graph_1();
       graph_2();
    });




});


function graph_1(){
var x1 = [];
var x2 = [];
var y1 = [];
var y2 = [];
for (var i = 1; i < 500; i++)
{
  k = Math.random();
  x1.push(k*5);
  x2.push(k*10);
  y1.push(k);
  y2.push(k*2);
}
var trace1 = {
  x: x1,
  y: y1,
  name: 'AI Snake',
  autobinx: false,
  histnorm: "count",
  marker: {
    color: "rgba(255, 100, 102, 0.7)",
     line: {
      color:  "rgba(255, 100, 102, 1)",
      width: 1
    }
  },
  opacity: 0.5,
  type: "histogram",
  xbins: {
    end: 2.8,
    size: 0.06,
    start: .5
  }
};
var trace2 = {
  x: x2,
  y: y2,
  autobinx: false,
  marker: {
          color: "rgba(100, 200, 102, 0.7)",
           line: {
            color:  "rgba(100, 200, 102, 1)",
            width: 1
    }
       },
  name: "User Snake",
  opacity: 0.75,
  type: "histogram",
  xbins: {
    end: 4,
    size: 0.06,
    start: -3.2

  }
};
var data = [trace1, trace2];
var layout = {
  bargap: 0.05,
  bargroupgap: 0.2,
  barmode: "overlay",
  title: "Snake Behavior",
  xaxis: {title: "Time Step"},
  yaxis: {title: "Pr"}
};
Plotly.newPlot('graph-1', data, layout);
}



function graph_2(){
    function random_date(start, end, mul)
  {
    return new Date(start.getTime() + mul * (end.getTime() - start.getTime()));
  }

function date_list(y1,m1,d1,y2,m2,d2,count)
  {
    var a =[];
    for(i=0;i<count;i++)
    {
      a.push(random_date(new Date(y1, m1, d1), new Date(y2,m2,d2),i));
    }
      return a;
  }

function random_number(num , mul)
  {
     var value = [ ];
     for(i=0;i<=num;i++)
      {
        var rand = Math.random() * mul;
        value.push(rand);
      }
     return value;
  }

var trace1 = {
  x: date_list(2001,01,01,2001,02,01,50),
  y: random_number(50,20),
  line: {width: 0},
  marker: {color: "444"},
  mode: "lines",
  name: "Lower Bound",
  type: "scatter"
};

var trace2 = {
  x: date_list(2001,01,01,2001,02,01,50),
  y: random_number(50,21),
  fill: "tonexty",
  fillcolor: "rgba(68, 68, 68, 0.3)",
  line: {color: "rgb(31, 119, 180)"},
  mode: "lines",
  name: "Measurement",
  type: "scatter"
};

var trace3 = {
  x: date_list(2001,01,01,2001,02,01,50),
  y: random_number(50,22),
  fill: "tonexty",
  fillcolor: "rgba(68, 68, 68, 0.3)",
  line: {width: 0},
  marker: {color: "444"},
  mode: "lines",
  name: "Upper Bound",
  type: "scatter"
}

var data = [trace1, trace2, trace3];
var layout = {
  showlegend: false,
  title: "Error Rate Graph",
  yaxis: {title: "ER"}
};
Plotly.newPlot('graph-2', data, layout,{staticPlot: true});
}


