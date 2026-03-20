document.addEventListener("DOMContentLoaded", function () {
    createTable(list, "table");

    setSortSelects(correspond, document.getElementById("sort"));

    document.getElementById("fieldsFirst").addEventListener("change", function () {
        changeNextSelect(this, "fieldsSecond");
    });

    document.getElementById("fieldsSecond").addEventListener("change", function () {
        changeNextSelect(this, "fieldsThird");
    });

    document.getElementById("sortButton").addEventListener("click", () => {
        sortTable("table", document.getElementById("sort"));
    });

    document.getElementById("clearSort").addEventListener("click", () => {
        resetSort();
        clearFilter("table", list, document.getElementById("filter"));
    });
});

const createOption = (str, val) => {
    const item = document.createElement("option");
    item.text = str;
    item.value = val;
    return item;
};

const setSortSelect = (arr, sortSelect) => {
    sortSelect.append(createOption("Нет", 0));
    arr.forEach((item, index) => {
        sortSelect.append(createOption(item, index + 1));
    });
};

const setSortSelects = (data, dataForm) => {
    const head = Object.keys(data);

    const allSelect = dataForm.getElementsByTagName('select');
    
    let flag = true;
    
    for(const item of allSelect){
        setSortSelect(head, item);
        if (flag) {
            flag = false;
        } else {
            item.disabled = true;
        }
    }
};


const changeNextSelect = (curSelect, nextSelectId) => {
    const nextSelect = document.getElementById(nextSelectId);
    console.log(curSelect)
    
    nextSelect.disabled = false;
    
    nextSelect.innerHTML = curSelect.innerHTML;
    if (+curSelect.value != 0) {
        for (let i = 0; i < nextSelect.options.length; i++) {
            if (nextSelect.options[i].value === curSelect.value) {
                nextSelect.remove(i);
                break;
            }
        }
    } else {
        console.log(curSelect.id)
        if (curSelect.id === "fieldsFirst") {
            resetSort()
        }
        nextSelect.disabled = true;
    }
}
