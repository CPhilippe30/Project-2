// Use d3.json() to fetch data from JSON file
d3.json("static/data/nfl-dui2.json").then((duiData) => {
    function filterDuiData(dui) {
      return dui.Year ===2001;
    }
  
    // Use filter() to pass the function as its argument
    var filteredDui = duiData.filter(filterDuiData);
  
    // Filtering Dui.
    console.log(filteredDui);
  
    var teams = filteredDui.map(category =>  category.TEAM);
  
    var category = filteredDui.map(category => category.Severity);
  
    // Filtered metascores.
    console.log(category);
  
    // Create your trace.
    var trace = {
      x: teams,
      y: category,
      type: "bar"
    };
  
    // Create the data array for our plot
    var data = [trace];
  
    // Define the plot layout
    var layout = {
      title: "Teams with highest DUI Arrested.",
      xaxis: { teams: "Team" },
      yaxis: { category: "Metascore (Dui) Arrested"}
    };
  
    // Plot the chart to a div tag with id "bar-plot"
    Plotly.newPlot("bar-plot", data, layout);
  });