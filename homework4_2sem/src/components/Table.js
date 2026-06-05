import TableHead from './TableHead.js';
import TableBody from './TableBody.js';
import Filter from './Filter.js';
import { useState } from "react";
import Sort, { NONE } from './Sorting.js';

/*
   компонент, выводящий на страницу таблицу 
   пропсы:
      data - данные для таблицы в виде массива объектов
*/

const Table = (props) => {
  const showPagination = props.showPagination === false
        ? props.showPagination
        : true;
  const [activePage, setActivePage] = useState("1");
  const changeActive = (event) => {
        setActivePage(event.target.innerHTML);
  };

  const [dataTable, setDataTable] = useState(props.data);
  
  const [sortState, setSortState] = useState({
    sort1: NONE,
    sort2: NONE,
    sort3: NONE,
    desc1: false,
    desc2: false,
    desc3: false
  });
  const [currentData, setCurrentData] = useState(props.data);
  
  // Колонки для сортировки
  const columns = Object.keys(props.data[0]);

  const effectiveAmountRows = showPagination
        ? props.amountRows
        : props.data.length;
  //количество страниц разбиения таблицы
  const n = Math.ceil(dataTable.length / effectiveAmountRows); 
  
  // массив с номерами страниц
  const arr = Array.from({ length: n }, (v, i) => i + 1);

  // Функция применения сортировки
  const applySortToData = (sourceData, s1, s2, s3, d1, d2, d3) => {
    const sortArr = [];
    if (s1 !== NONE) sortArr.push({ column: Number(s1) - 1, direction: d1 });
    if (s2 !== NONE) sortArr.push({ column: Number(s2) - 1, direction: d2 });
    if (s3 !== NONE) sortArr.push({ column: Number(s3) - 1, direction: d3 });
    
    if (sortArr.length === 0) return [...sourceData];
    
    return [...sourceData].sort((a, b) => {
      for (const { column, direction } of sortArr) {
        const key = columns[column];
        const av = a[key];
        const bv = b[key];
        
        let cmp;
        if (typeof av === 'number' && typeof bv === 'number') {
          cmp = av - bv;
        } else {
          cmp = String(av).localeCompare(String(bv), 'ru');
        }
        
        if (cmp !== 0) return direction ? -cmp : cmp;
      }
      return 0;
    });
  };

  // Обработчик сортировки
  const handleSort = (sortedData, isSorted) => {
    setDataTable(sortedData);
    setCurrentData(sortedData);
    setActivePage("1"); // Сбрасываем на первую страницу при сортировке
  };

  // Обновление состояния сортировки
  const handleSortStateChange = (newState) => {
    setSortState(newState);
  };

  const updateDataTable = (value) => {
    // Применяем текущую сортировку к отфильтрованным данным
    const { sort1, sort2, sort3, desc1, desc2, desc3 } = sortState;
    let sortedValue = value;
    if (sort1 !== NONE) {
      sortedValue = applySortToData(value, sort1, sort2, sort3, desc1, desc2, desc3);
    }
    
    setDataTable(sortedValue);
    setCurrentData(sortedValue);
    const newActivePage = Math.ceil(sortedValue.length / effectiveAmountRows);
    setActivePage(newActivePage > 0 ? newActivePage.toString() : "1");
  };

  //формируем совокупность span с номерами страниц
  const pages = arr.map((item, index) =>  
      <span
        key={index}
        className={String(item) === activePage.trim() ? 'page active' : 'page'}
        onClick={changeActive}
      >
        {item}
      </span>
  );

  return (
    <>
      <Sort
        columns={columns}
        onSort={handleSort}
        data={currentData}
        onReset={() => {}}
        sortState={sortState}
        onSortStateChange={handleSortStateChange}
      />
      <h4>Фильтры</h4>
      <Filter 
        filtering={updateDataTable} 
        data={dataTable} 
        fullData={props.data}
      />

      <table>
        <TableHead head={Object.keys(props.data[0])} />
        <TableBody
            body={dataTable}
            amountRows={effectiveAmountRows}
            numPage={showPagination ? activePage : "1"}
        />
      </table>

      {showPagination && (
          <div className="pagination">
              {pages}
          </div>
      )}
    </>
  );  
}

export default Table;