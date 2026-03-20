const createTable = (data, idTable) => {
    const table = document.getElementById(idTable);
    const header = Object.keys(data[0]);

    const headerRow = createHeaderRow(header);
    table.append(headerRow);

    const bodyRows = createBodyRows(data);
    table.append(bodyRows);
};

const createBodyRows = (data) => {
    let tbody = document.createElement('tbody');
    data.forEach(i => {
        let tr = document.createElement('tr');
        Object.values(i).forEach(v => {
            let td = document.createElement('td');
            td.innerHTML = v;
            tr.appendChild(td);
        });
        tbody.appendChild(tr);
    })
    return tbody;
};

const createHeaderRow = (headers) => {
    const tr = document.createElement('tr');
    headers.forEach(header => {
        const th = document.createElement('th');
        th.innerHTML = header;
        tr.append(th);
    });
    return tr;
};

const clearTable = (idTable) => {
    const table = document.getElementById(idTable);
    if (table) {
        while(table.firstChild) {
            table.removeChild(table.firstChild)
        }
    }
}