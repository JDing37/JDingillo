// script.js
const width = 500;
const height = 500;
const numRows = 10;
const numCols = 10;
const colors = ["#ffffcc", "#a1dab4", "#41b6c4", "#225ea8"];

const svg = d3.select("#heatmapContainer")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

function generateHeatMap() {
    const cellWidth = width / numCols;
    const cellHeight = height / numRows;

    const data = [];
    for (let row = 0; row < numRows; row++) {
        for (let col = 0; col < numCols; col++) {
            data.push({ row, col });
        }
    }

    const cells = svg.selectAll(".heatmap-cell")
        .data(data)
        .enter()
        .append("rect")
        .attr("class", "heatmap-cell")
        .attr("x", d => d.col * cellWidth)
        .attr("y", d => d.row * cellHeight)
        .attr("width", cellWidth)
        .attr("height", cellHeight)
        .style("fill", colors[0]);
}

function animateHeatMap() {
    svg.selectAll(".heatmap-cell")
        .transition()
        .duration(1000) // Animation duration per cell (1 second)
        .style("fill", function () {
            const randomIndex = Math.floor(Math.random() * colors.length);
            return colors[randomIndex];
        })
        .on("end", animateHeatMap); // Repeat animation for each cell
}

generateHeatMap();
animateHeatMap();


