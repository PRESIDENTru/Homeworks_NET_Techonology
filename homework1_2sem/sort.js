const createSortArr = (data) => {
    let sortArr = [];

    const sortSelects = data.getElementsByTagName("select");

    for (const item of sortSelects) {
        const keySort = item.value;
        if (keySort == 0) {
            break;
        }

        const desc = document.getElementById(item.id + "Desc").checked;
        sortArr.push({ column: keySort - 1, direction: desc });
    }
    return sortArr;
};

const sortTable = (idTable, formData) => {
    const sortArr = createSortArr(formData);

    if (sortArr.length === 0) {
        clearTable(idTable);
        createTable(list, idTable);
        return;
    }

    const table = document.getElementById(idTable);
    let rowData = Array.from(table.rows);
    const headerRow = rowData.shift(); 

    rowData.sort((first, second) => {
    for (let { column, direction } of sortArr) {
        const firstCell = first.cells[column].innerHTML;
        const secondCell = second.cells[column].innerHTML;

        let cmp;
        if (column === 2 || column === 3 || column === 4 || column === 5) {
            cmp = +firstCell - +secondCell;
        } else {
            cmp = firstCell.localeCompare(secondCell);
        }

        if (cmp !== 0) return direction ? -cmp : cmp;
    }
        return 0;
    });

    table.innerHTML = "";
    table.append(headerRow);
    const tbody = document.createElement("tbody");
    rowData.forEach(row => tbody.append(row));
    table.append(tbody);
};

const resetSort = () => {
    const selects = document.querySelectorAll("#sort select");
    selects.forEach((sel, index) => {
        sel.value = 0;
        if (index > 0) sel.disabled = true;
    });

    document.querySelectorAll("#sort input[type='checkbox']").forEach(checkbox => {
        checkbox.checked = false;
    });

    clearTable("table");
    createTable(list, "table");
};
