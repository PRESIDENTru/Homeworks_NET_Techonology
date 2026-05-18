// Входные данные:
//   data - исходный массив (list)
//   dataForm - поле, по которому осуществляется группировка

function createArrGraph(data, dataForm) {

    const groupObj = d3.group(data, d => d[dataForm]);

    let arrGraph = [];
    for (let entry of groupObj) {
        const minMax = d3.extent(entry[1].map(d => d['Выручка (₽ млрд)']));
        arrGraph.push({ labelX: entry[0], values: minMax });
    }

    if (dataForm === 'Год основания') {
        arrGraph.sort((a, b) => +a.labelX - +b.labelX);
    }

    return arrGraph;
}

function drawGraph(data, keyX, mode, chartType) {
    let arrGraph = createArrGraph(data, keyX);

    const svg = d3.select("svg");
    svg.selectAll('*').remove();

    const attr_area = {
        width: parseFloat(svg.style('width')),
        height: parseFloat(svg.style('height')),
        marginX: 50,
        marginY: 50
    };

    const [scX, scY] = createAxis(svg, arrGraph, attr_area, mode);

    createChart(svg, arrGraph, scX, scY, attr_area, mode, chartType);
}

function createAxis(svg, data, attr_area, mode) {
    let domainMin, domainMax;
    if (mode === 'max') {
        domainMin = d3.min(data, d => d.values[1]);
        domainMax = d3.max(data, d => d.values[1]);
    } else if (mode === 'min') {
        domainMin = d3.min(data, d => d.values[0]);
        domainMax = d3.max(data, d => d.values[0]);
    } else {
        domainMin = d3.min(data, d => d.values[0]);
        domainMax = d3.max(data, d => d.values[1]);
    }

    const scaleX = d3.scaleBand()
        .domain(data.map(d => d.labelX))
        .range([0, attr_area.width - 2 * attr_area.marginX]);

    const scaleY = d3.scaleLinear()
        .domain([domainMin * 0.85, domainMax * 1.1])
        .range([attr_area.height - 2 * attr_area.marginY, 0]);

    const axisX = d3.axisBottom(scaleX);
    const axisY = d3.axisLeft(scaleY);

    svg.append("g")
        .attr("transform", `translate(${attr_area.marginX}, ${attr_area.height - attr_area.marginY})`)
        .call(axisX)
        .selectAll("text")
        .style("text-anchor", "end")
        .attr("dx", "-.8em")
        .attr("dy", ".15em")
        .attr("transform", d => "rotate(-45)");

    svg.append("g")
        .attr("transform", `translate(${attr_area.marginX}, ${attr_area.marginY})`)
        .call(axisY);

    return [scaleX, scaleY];
}

function createChart(svg, data, scaleX, scaleY, attr_area, mode, chartType) {
    if (chartType === 'dot') {
        createDot(svg, data, scaleX, scaleY, attr_area, mode);
    } else if (chartType === 'line') {
        createLine(svg, data, scaleX, scaleY, attr_area, mode);
    } else {
        createBar(svg, data, scaleX, scaleY, attr_area, mode);
    }
}

function createLine(svg, data, scaleX, scaleY, attr_area, mode) {
    const transform = `translate(${attr_area.marginX}, ${attr_area.marginY})`;
    const cx = d => scaleX(d.labelX) + scaleX.bandwidth() / 2;

    const lineGen = d3.line().curve(d3.curveNatural);

    if (mode === 'max' || mode === 'both') {
        const pathData = data.map(d => [cx(d), scaleY(d.values[1])]);
        svg.append("path")
            .attr("d", lineGen(pathData))
            .attr("transform", transform)
            .attr("fill", "none")
            .attr("stroke", "red")
            .attr("stroke-width", 2);

    }

    if (mode === 'min' || mode === 'both') {
        const pathData = data.map(d => [cx(d), scaleY(d.values[0])]);
        svg.append("path")
            .attr("d", lineGen(pathData))
            .attr("transform", transform)
            .attr("fill", "none")
            .attr("stroke", "blue")
            .attr("stroke-width", 2);

    }
}

function createDot(svg, data, scaleX, scaleY, attr_area, mode) {
    const r = 4;
    const transform = `translate(${attr_area.marginX}, ${attr_area.marginY})`;
    const transform2 = `translate(${attr_area.marginX + 10}, ${attr_area.marginY})`;
    const cx = d => scaleX(d.labelX) + scaleX.bandwidth() / 2;

    if (mode === 'max' || mode === 'both') {
        svg.selectAll(".dot-max")
            .data(data).enter()
            .append("circle")
            .attr("class", "dot-max")
            .attr("r", r)
            .attr("cx", cx)
            .attr("cy", d => scaleY(d.values[1]))
            .attr("transform", transform)
            .style("fill", "red");
    }

    if (mode === 'min' || mode === 'both') {
        svg.selectAll(".dot-min")
            .data(data).enter()
            .append("circle")
            .attr("class", "dot-min")
            .attr("r", r)
            .attr("cx", cx)
            .attr("cy", d => scaleY(d.values[0]))
            .attr("transform", transform2)
            .style("fill", "blue");
    }
}

function createBar(svg, data, scaleX, scaleY, attr_area, mode) {
    const transform = `translate(${attr_area.marginX}, ${attr_area.marginY})`;
    const transform2 = `translate(${attr_area.marginX}, ${attr_area.marginY})`;

    const chartHeight = attr_area.height - 2 * attr_area.marginY;
    const bw = scaleX.bandwidth();

    if (mode === 'max' || mode === 'both') {
        svg.selectAll(".bar-max")
            .data(data).enter()
            .append("rect")
            .attr("class", "bar-max")
            .attr("x", d => scaleX(d.labelX) + (mode === 'both' ? 0 : 0))
            .attr("y", d => scaleY(d.values[1]))
            .attr("width", mode === 'both' ? bw / 2 : bw - 4)
            .attr("height", d => chartHeight - scaleY(d.values[1]))
            .attr("transform", transform2)
            .style("fill", "red");
    }

    if (mode === 'min' || mode === 'both') {
        svg.selectAll(".bar-min")
            .data(data).enter()
            .append("rect")
            .attr("class", "bar-min")
            .attr("x", d => scaleX(d.labelX) + (mode === 'both' ? bw / 2 : 0))
            .attr("y", d => scaleY(d.values[0]))
            .attr("width", mode === 'both' ? bw / 2 - 2 : bw - 4)
            .attr("height", d => chartHeight - scaleY(d.values[0]))
            .attr("transform", transform)
            .style("fill", "blue");
    }
}