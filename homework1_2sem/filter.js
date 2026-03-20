const correspond = {
    "Название":        "structure",
    "Отрасль":         "category",
    "Выручка (₽ млрд)": ["revenueFrom", "revenueTo"],
    "Сотрудники":      ["employeesFrom", "employeesTo"],
    "Год основания":   ["yearFrom", "yearTo"],
    "Прибыль (₽ млрд)": ["profitFrom", "profitTo"]
};

/* Считывает форму и возвращает словарь { id_поля: значение } */
const dataFilter = (dataForm) => {
    let dictFilter = {};

    for (const item of dataForm.elements) {
        let valInput = item.value;

        if (item.type === "text") {
            valInput = valInput.toLowerCase();
        }

        if (item.type === "number") {
            if (item.value === "") {
                valInput = item.id.includes("From") ? -Infinity : Infinity;
            } else {
                valInput = Number(item.value);
            }
        }

        dictFilter[item.id] = valInput;
    }
    return dictFilter;
};

/* Фильтрует массив данных и перерисовывает таблицу */
const filterTable = (data, idTable, dataForm) => {
    const datafilter = dataFilter(dataForm);

    let tableFilter = data.filter(item => {
        let result = true;

        Object.entries(item).forEach(([key, val]) => {
            if (typeof val === "string") {
                const fieldId = correspond[key];
                if (fieldId && datafilter[fieldId] !== undefined) {
                    result &&= val.toLowerCase().includes(datafilter[fieldId]);
                }
            } else if (typeof val === "number") {
                const range = correspond[key];
                if (Array.isArray(range)) {
                    result &&= val >= datafilter[range[0]] && val <= datafilter[range[1]];
                }
            }
        });

        return result;
    });

    clearTable(idTable);
    createTable(tableFilter, idTable);
};

/* Сбрасывает форму и показывает все данные */
const clearFilter = (idTable, data, dataForm) => {
    for (const item of dataForm.elements) {
        if (item.type !== "button") {
            item.value = "";
        }
    }
    clearTable(idTable);
    createTable(data, idTable);
};

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("Найти").addEventListener("click", () => {
        filterTable(list, "table", document.getElementById("filter"));
    });

    document.getElementById("Очистить").addEventListener("click", () => {
        clearFilter("table", list, document.getElementById("filter"));
        resetSort();
    });
});
