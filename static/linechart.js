initdropdown(); //calls function to fill dropdown object
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
    d3.json("/main").then(data => {
        var names = data.map(a => a.NAME);
        var display = d3.select("#selDataset");
        names.forEach((data) => {
            display.append("option").text(data).property("value", data);
});
})
}
//end function initdropdown
function optionChanged(id){
    metadata(id);
    createChart(id);
    createBubbles(id);
}
function metadata(sampleid){
    console.log(d3.json("static/data/nfl-dui2.json"))
    d3.json("static/data/nfl-dui2.json").then(function(data){
        console.log(data)
        var metadata = data.metadata;
        var filterdata = data.filter(row => row.NAME == sampleid);
        console.log(sampleid)
        var result = filterdata[0];
        var display = d3.select("#sample-metadata");
        display.html("");
        Object.entries(result).forEach(([key, value]) => {
            display.append("h5").text(`${key}: ${value}`);
        })
    })
}

var month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    var dui = [];
    for (var i = 0; i <= 12; i++) {
      dui[i] = 0
    }
    console.log("results.length")
    console.log(results.length)
    for (var i = 0; i < results.length; i++) {
      m = results[i].Month
      dui[m] += 1
    }
    console.log(month, "= ", dui)
    var line_trace = {
      x: month,
      y: dui,
      type: 'scatter'
    };
    var line_layout = {
      title: `NFL Monthly DUI in ${selected_yr}`,
    };
    var data = [line_trace];
    Plotly.newPlot('line', data, line_layout);