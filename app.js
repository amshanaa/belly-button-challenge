let url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"


function init() {
    let dropdownMenu = d3.select("#selDataset");
    d3.json(url).then((data) => {
        console.log(data);
        let names = data.names
        names.forEach((name) => {
            dropdownMenu
                .append("option")
                .text(name)
                .property("value", name);
        });
        meta_table(names[0])
        visualstuff(names[0])
    });



}
init();
function optionChanged(newsample) {

    meta_table(newsample);
    visualstuff(newsample)
}


function meta_table(x) {

    d3.json(url).then((data) => {
        console.log(data);
        let metadatanames = data.metadata
        let metaArray = metadatanames.filter(samplestuff => samplestuff.id == x)[0];
        let meta_tag = d3.select("#sample-metadata");
        meta_tag.html("")

        Object.entries(metaArray).forEach(([key, value]) => {

            // const [key, value] = entry;
            console.log(key, value);
            meta_tag
                .append("h5")
                .text(`${key}: ${value}`)

        });

    });

}

function visualstuff(x) {

    d3.json(url).then((data) => {
        console.log(data);
        let metadatanames = data.metadata
        let samplenames = data.samples
        let metaArray = metadatanames.filter(samplestuff => samplestuff.id == x)[0]
        let sampleArray = samplenames.filter(samplestuff => samplestuff.id == x)[0]

        let otu_ids = sampleArray.otu_ids
        let otu_labels = sampleArray.otu_labels
        let sample_values = sampleArray.sample_values

        let yticks = otu_ids.slice(0, 10).map(otu => `OTU: ${otu}`).reverse()
        let xticks = sample_values.slice(0, 10).reverse()
        let text_val = otu_labels.slice(0, 10).reverse()



        var data = [{
            type: 'bar',
            y: yticks,
            x: xticks,             //sample_values.slice(0, 10).reverse(),
            text: text_val,   //.slice(0, 10).reverse(),
            orientation: 'h'
        }];

        Plotly.newPlot('bar', data);

        var trace1 = {
            x: [1, 2, 3, 4],
            y: [10, 11, 12, 13],
            mode: 'markers',
            marker: {
              size: [40, 60, 80, 100]
            }
          };
          
          var data = [trace1];
          
          var layout = {
            title: 'Marker Size',
            showlegend: false,
            height: 600,
            width: 600
          };
          
          Plotly.newPlot('bubble', data, layout);
          

    });

    var data = [
        {
            domain: { x: [0, 1], y: [0, 1] },
            value: 270,
            title: { text: "Speed" },
            type: "indicator",
            mode: "gauge+number"
        }
    ];
    
    var layout = { width: 600, height: 500, margin: { t: 0, b: 0 } };
    Plotly.newPlot('gauge', data, layout);



}




