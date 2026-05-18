// создание таблицы
const showTable = (idTable, data) => {
    const table = d3.select("#" + idTable);

    const rows = table
        .selectAll("tr")
        .data(data)
        .enter()
        .append('tr')
        .style("display", "");

    const cells = rows
        .selectAll("td")
        .data(d => Object.values(d))
        .enter()
        .append("td")
        .text(d => d);

    const head = table
        .insert("tr", "tr")
        .selectAll("th")
        .data(d => Object.keys(data[0]))
        .enter()
        .append("th")
        .text(d => d);
};

const showTableButton = (idTable, idButton, data) => {
    const button = d3.select("#" + idButton);

    if (button.text() == "Скрыть таблицу") {
        clearTable(idTable);
        button.text(d => "Показать таблицу");
    } else {
        showTable(idTable, data);
        button.text(d => "Скрыть таблицу");
    }
};

const clearTable = (idTable) => {
    const table = d3.select("#" + idTable);
    if (!table.empty()) {
        table.selectAll("*").remove();
    }
};
