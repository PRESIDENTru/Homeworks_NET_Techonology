document.addEventListener("DOMContentLoaded", function () {
    showTable('build', list);
    d3.select("#show").on("click", () => {
        showTableButton("build", "show", list);
    });

    drawGraph(list, 'Отрасль', 'max', "dot");

    const labelMax = d3.select('#cb-max').node().closest('label');
    const labelMin = d3.select('#cb-min').node().closest('label');

    d3.select("#cb-max").on("click", () => {
        d3.select(labelMax).classed('invalid', false);
        d3.select(labelMin).classed('invalid', false);
    });
    d3.select("#cb-min").on("click", () => {
        d3.select(labelMax).classed('invalid', false);
        d3.select(labelMin).classed('invalid', false);
    });

    d3.select("#btn-build").on("click", () => {
        const keyX = d3.select('input[name="keyX"]:checked').property('value');

        const cbMax = d3.select('#cb-max').property('checked');
        const cbMin = d3.select('#cb-min').property('checked');
        const chartType = d3.select('#chart-type').property('value');

        if (!cbMax && !cbMin) {
            d3.select(labelMax).classed('invalid', true);
            d3.select(labelMin).classed('invalid', true);
            const svg = d3.select("svg");
            svg.selectAll('*').remove();
            return;
        }
        d3.select(labelMax).classed('invalid', false);
        d3.select(labelMin).classed('invalid', false);

        let mode;
        if (cbMax && cbMin) {
            mode = 'both';
        } else if (cbMax) {
            mode = 'max';
        } else {
            mode = 'min';
        }

        drawGraph(list, keyX, mode, chartType);
    });
});
