// Build Bubble chart from sample data
function buildBubbleChart(sample) {

  let jsonFile = "/static/samples.json";
  d3.json(jsonFile).then(function (data) {
    let sampleData = data["samples"].filter(each => each.id == sample)[0];
    // console.log(sampleData);

    let xAxis = sampleData.otu_ids;
    // console.log(xAxis);
    let yAxis = sampleData.sample_values;
    // console.log(yAxis);
    let markerSize = yAxis;
    // console.log(markerSize);
    let markerColors = xAxis;
    // console.log(markerColors);
    let sampleLabels = sampleData.otu_labels;
    // console.log(sampleLabels);

    let trace1 = {
      x: xAxis,
      y: yAxis,
      text: sampleLabels,
      mode: 'markers',
      marker: {
        color: markerColors,
        size: markerSize
      }
    };

    let bubblePlotData = [trace1];
    // console.log(bubblePlotData);


    let layout = {
      xaxis: { title: `OTU ID for Sample: ${sample}` },
    };

    Plotly.newPlot('bubble', bubblePlotData, layout);
  }
  )
};

// Build Gauge chart from sample data
function buildGaugeChart(sample) {

  let jsonFile = "/static/samples.json";
  d3.json(jsonFile).then(function (data) {
    let sampleData = data["metadata"].filter(each => each.id == sample)[0];
    // console.log(sampleData);

    let gaugePlotData = [
      { 
        type: "indicator",
        mode: "gauge+number",
        value: sampleData.wfreq,
        title: { text: "Washes per Week" },
        gauge: {
          axis: { range: [null, 10], tickwidth: 1}
          }        
      }
    ];
    // console.log(gaugePlotData);
    var layout = { width: 600, height: 500, margin: { t: 0, b: 0 } };

    Plotly.newPlot('gauge', gaugePlotData, layout);
  }
  )
};


// Build bar chart from sample data
function buildBarChart(sample) {

  let jsonFile = "/static/samples.json";
  d3.json(jsonFile).then(function (data) {
    let sampleData = data["samples"].filter(each => each.id == sample)[0];
    // console.log(sampleData);


    let sampleValues = sampleData.sample_values.slice(0, 10).sort((a,z) => a - z);
    // console.log(sampleValues);
    let sampleIds = sampleData.otu_ids.slice(0, 10);
    // console.log(sampleIds);
    let sampleLabels = sampleData.otu_labels.slice(0, 10);
    // console.log(sampleLabels);

    let barPlotData = [{
      x: sampleValues,
      y: sampleIds.map(each => `OTU ${each}`),
      hovertext: sampleLabels,
      type: 'bar',
      orientation: 'h',
      marker: {
        width: 1
      }
    }];

    Plotly.newPlot('bar', barPlotData);
    // console.log(barPlotData);

  })
    .catch(error => (console.log(error)));

};



// Build Demographics Table from Metadata
function buildDemographicsTable(sample) {

  let jsonFile = "/static/samples.json";
  d3.json(jsonFile).then(function (data) {

    // select demographics table
    let sample_metadata = d3.select("#sample-metadata");

    // clear demographics table
    sample_metadata.html("");

    // Finish demographics table
    let metadata = data["metadata"].filter(each => each.id == sample)[0];
    // console.log(metadata);

    // ... get demographics from the id
    // append h4 text for each value
    Object.entries(metadata).forEach(([key, value]) => {
      sample_metadata.append("p").text(`${key}:  ${value}`);
    });
  });
};

function init() {
  // Grab a reference to the dropdown select element
  let sampleSel = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  let jsonFile = "/static/samples.json";

  d3.json(jsonFile).then((data) => {
    data.names.forEach((name) => {
      sampleSel
        .append("option")
        .text(name)
        .property("value", name);
    });

    let sampleNames = data.names

    // Set a default to build the initial plots
    const defaultSample = sampleNames[0];
    buildBubbleChart(defaultSample);
    buildBarChart(defaultSample);
    buildGaugeChart(defaultSample);
    buildDemographicsTable(defaultSample);
    // console.log(defaultSample);
  });
}

// Fetch new data when a different sample is selected from the dropdown
function buildCharts(sample) {
  buildBubbleChart(sample);
  buildBarChart(sample);
  buildGaugeChart(sample);
  buildDemographicsTable(sample);
};

// Initialize the dashboard
init();