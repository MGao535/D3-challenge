// @TODO: YOUR CODE HERE!
let svgWidth = 700;
let svgHeight = 500;

let margin = {
	top: 20,
	right: 40,
	bottom: 60,
	left: 100
};

let width = svgWidth - margin.left - margin.right;
let height = svgHeight - margin.top - margin.bottom;

// Create an SVG wrapper, append an SVG group that will hold our chart, and shift the latter by left and top margins.
var graph = d3.select("#scatter")
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight);

var chartGroup = graph.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Import Data
d3.csv("assets/data/data.csv").then(function(data) {

	data.forEach((data) => {
		data.poverty = +data.poverty;
		data.smokes = +data.smokes;
	});

	let xScale = d3.scaleLinear()
		.domain([d3.min(data, d => d.smokes), d3.max(data, d => d.smokes)])
		.range([0, width]);

	let yScale = d3.scaleLinear()
		.domain([d3.min(data, d => d.smokes), d3.max(data, d => d.smokes)])
		.range([height, 0]);

	let bottomAxis = d3.axisBottom(xScale);
	let leftAxis = d3.axisLeft(yScale);

	chartGroup.append("g")
		.attr("transform", `translate(0, ${height})`)
		.call(bottomAxis);

	chartGroup.append("g");
		.call(leftAxis);

	let circlesGroup = chartGroup.selectAll("circle")
		.data(data)
		.enter()
		.append("circle")
		.attr("x", d => xScale(d.poverty))
		.attr("y", d => yScale(d.smokes))
		.attr("fill", "white")
		.style("opacity", "0.8")
		.attr("text-anchor", "middle")
		.text((abbrev) => return abbrev.abbr);

	chartGroup.append("text")
		.attr("transform", "rotate(-90)")
		.attr("y", 0 - margin.left + 40)
		.attr("x", 0 - (height/2))
		.attr("dy", "1em")
		.text("smokers (%)");

	chartGroup.append("text")
		.attr("transform", `translate(${width/2}, ${height + margin.top + 30}`)
		.attr("class", "axisText")
		.text("Poverty Rate (%)");
	}).catch((error) => console.log(error));