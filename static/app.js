
function createChart(sampleid){
    d3.json("static/data/nfl-dui2.json").then(function(data){
/*
Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs 
found in that individual.
*/
        console.log(data)//displays data
        var samples = data.samples;
        var filterdata = samples.filter(row => row.id == sampleid);
        var result = filterdata[0]
        var sample_values = result.sample_values
        var otu_ids = result.otu_ids
        console.log(otu_ids)
        var data = [{
            x:sample_values.slice(0, 10).reverse(), 
            y:otu_ids.slice(0, 10).reverse(),
            type:"bar",
            orientation:"h",
            ylabels: otu_ids,
            xlabels: sample_values,
            transform: "rotate(-90)"
        }];
        var layout = {
            title: "NFL DUI Arrests",
            xaxis: { title: "" },
            yaxis: { title: "" }
          };
    Plotly.newPlot("bar", data, layout);
    })
}
function initdropdown(){
    console.log('initdropdown')
    d3.json("/main").then(data => {
        console.log(data)
        var names = data.map(a => a.YEARS);
        var display = d3.select("#selDataset");
        names.forEach((data) => {
            display.append("option").text(data).property("value", data);
            
        });

    })

}
initdropdown(); //calls function to fill dropdown object

//end function initdropdown
function optionChanged(id){
    metadata(id);
    createChart(id);
    createBubbles(id);
}

function metadata(sampleid){
    console.log(d3.json('/static/data/nfl-dui2.json'))
    d3.json("/static/data/nfl-dui2.json").then(function(data){
        console.log(data)
        var metadata = data.metadata;
        var filterdata = data.filter(row => row.YEARS == sampleid);
        console.log(sampleid)
        var result = filterdata[0];
        var display = d3.select("#sample-metadata");
        display.html("");
        Object.entries(result).forEach(([key, value]) => {
            display.append("h5").text(`${key}: ${value}`);
        })
    })
}// metadata
/*
This function displays a meter graph to display the average severity that year based on the 0-5 scale
- the severity ranges from 0-found asleep behind the wheel to 5-manslaughter
*/
// function gaugeChart(id){
//     d3.json("/static/data/nfl-dui.json").then(function(data){
       
//         console.log(data)
//         var metadata = data.metadata;
//         var filterdata = metadata.filter(row => row.id == id);
//         var result = filterdata[0];
//        // var wfreq = result.wfreq;
//         var data = [{
//             domain = {'x': [0, 1], 'y': [0, 1]},
//             title = {'text': "NFL DUI Speedometer", 'font': {'size': 24}},
//             delta = {'reference': 400, 'increasing': {'color': "RebeccaPurple"}},
              
//           type: "indicator",
//           mode: "gauge",
//           value: wfreq,
//           gauge: {
//             axis: { range: [null, 5], tickwidth: 1, tickcolor: "darkblue" },
//             bar: { color: "darkblue" },
//             bgcolor: "white",
//             borderwidth: 2,
//             bordercolor: "green",
//             steps: [
//               { range: [0, 1], color: "rgba(0,128,128,.05)" },
//               { range: [1, 2], color: "rgba(0,128,128,.1)"  },
//               { range: [2, 3], color: "rgba(0,128,128,.15)" },
//               { range: [3, 4], color: "rgba(0,128,128,.20)" },
//               { range: [4, 5], color: "rgba(0,128,128,.25)" }
//             ],//end steps
//             title: 'Auto-Resize',
//                 font: {
//                     size: 16
//                 },
//             threshold: {
//               line: { color: "red", width: 4 },
//               thickness: 0.75,
//               value: wfreq
//             }//end threshold
//           }//end gauge
//         }]; //data
      
//       var layout = {
//         width: 500,
//         height: 400,
//         font: { color: "darkblue", family: "Arial" },
//         title: { text: "NFL DUI Arrests", font: { size: 24 }}
      
//       };//end layout
      
//       Plotly.newPlot('gauge', data, layout);
//     })//end d3
// }//end function










