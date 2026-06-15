import * as d3 from "d3";
import { useEffect, useMemo, useRef, useState } from "react";

const ChartDraw = (props) => {
    const chartRef = useRef(null);

    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);

    // заносим в состояния ширину и высоту svg-элемента
    useEffect(() => {
        const svg = d3.select(chartRef.current);
        setWidth(parseFloat(svg.style('width')));
        setHeight(parseFloat(svg.style('height')));
    });

    // задаем отступы в svg-элементе
    const margin = {
        top: 10,
        bottom: 60,
        left: 50,
        right: 10
    };

    // вычисляем ширину и высоту области для вывода графиков
    const boundsWidth  = width  - margin.left - margin.right;
    const boundsHeight = height - margin.top  - margin.bottom;

    const mode      = props.mode;       // "max" | "min" | "both"
    const chartType = props.chartType;  // "dot" | "bar" | "line"

    // определяем диапазон оси OY в зависимости от mode
    let domainMin, domainMax;
    if (mode === 'max') {
        domainMin = d3.min(props.data, d => d.values[1]);
        domainMax = d3.max(props.data, d => d.values[1]);
    } else if (mode === 'min') {
        domainMin = d3.min(props.data, d => d.values[0]);
        domainMax = d3.max(props.data, d => d.values[0]);
    } else {
        domainMin = d3.min(props.data, d => d.values[0]);
        domainMax = d3.max(props.data, d => d.values[1]);
    }

    // формируем шкалы для осей
    const scaleX = useMemo(() => {
        return d3
            .scaleBand()
            .domain(props.data.map(d => d.labelX))
            .range([0, boundsWidth]);
    }, [props.data, boundsWidth]);

    const scaleY = useMemo(() => {
        return d3
            .scaleLinear()
            .domain([domainMin * 0.85, domainMax * 1.1])
            .range([boundsHeight, 0]);
    }, [boundsHeight, domainMin, domainMax]);

    useEffect(() => {
        const svg = d3.select(chartRef.current);
        svg.selectAll("*").remove();

        // рисуем оси
        const xAxis = d3.axisBottom(scaleX);
        svg.append("g")
            .attr("transform", `translate(${margin.left}, ${height - margin.bottom})`)
            .call(xAxis)
            .selectAll("text")
            .style("text-anchor", "end")
            .attr("dx", "-.8em")
            .attr("dy", ".15em")
            .attr("transform", d => "rotate(-30)");

        const yAxis = d3.axisLeft(scaleY);
        svg.append("g")
            .attr("transform", `translate(${margin.left}, ${margin.top})`)
            .call(yAxis);

        // рисуем график в зависимости от типа
        const transform  = `translate(${margin.left}, ${margin.top})`;
        const chartHeight = boundsHeight;
        const bw = scaleX.bandwidth();
        const cx = d => scaleX(d.labelX) + bw / 2;

        if (chartType === 'dot') {
            if (mode === 'max' || mode === 'both') {
                svg.selectAll(".dot-max")
                    .data(props.data).enter()
                    .append("circle")
                    .attr("class", "dot-max")
                    .attr("r", 5)
                    .attr("cx", d => cx(d) - (mode === 'both' ? 5 : 0))
                    .attr("cy", d => scaleY(d.values[1]))
                    .attr("transform", transform)
                    .style("fill", "red");
            }
            if (mode === 'min' || mode === 'both') {
                svg.selectAll(".dot-min")
                    .data(props.data).enter()
                    .append("circle")
                    .attr("class", "dot-min")
                    .attr("r", 5)
                    .attr("cx", d => cx(d) + (mode === 'both' ? 5 : 0))
                    .attr("cy", d => scaleY(d.values[0]))
                    .attr("transform", transform)
                    .style("fill", "blue");
            }
        } else if (chartType === 'line') {
            const lineGen = d3.line().curve(d3.curveNatural);

            if (mode === 'max' || mode === 'both') {
                const pathData = props.data.map(d => [cx(d), scaleY(d.values[1])]);
                svg.append("path")
                    .attr("d", lineGen(pathData))
                    .attr("transform", transform)
                    .attr("fill", "none")
                    .attr("stroke", "red")
                    .attr("stroke-width", 2);
            }
            if (mode === 'min' || mode === 'both') {
                const pathData = props.data.map(d => [cx(d), scaleY(d.values[0])]);
                svg.append("path")
                    .attr("d", lineGen(pathData))
                    .attr("transform", transform)
                    .attr("fill", "none")
                    .attr("stroke", "blue")
                    .attr("stroke-width", 2);
            }
        } else {
            // bar
            if (mode === 'max' || mode === 'both') {
                svg.selectAll(".bar-max")
                    .data(props.data).enter()
                    .append("rect")
                    .attr("class", "bar-max")
                    .attr("x", d => scaleX(d.labelX))
                    .attr("y", d => scaleY(d.values[1]))
                    .attr("width", mode === 'both' ? bw / 2 : bw - 4)
                    .attr("height", d => chartHeight - scaleY(d.values[1]))
                    .attr("transform", transform)
                    .style("fill", "red");
            }
            if (mode === 'min' || mode === 'both') {
                svg.selectAll(".bar-min")
                    .data(props.data).enter()
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

    }, [scaleX, scaleY, props.data, mode, chartType]);

    return (
        <svg ref={chartRef}></svg>
    );
};

export default ChartDraw;