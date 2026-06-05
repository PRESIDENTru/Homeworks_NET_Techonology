const NONE = '0';

const Sort = (props) => {
    const { columns, onSort, data, onReset, sortState, onSortStateChange } = props;

    const { sort1, sort2, sort3, desc1, desc2, desc3 } = sortState;

    const update = (patch) => {
        onSortStateChange({ sort1, sort2, sort3, desc1, desc2, desc3, ...patch });
    };

    const handleSort1 = (e) => update({ sort1: e.target.value, sort2: NONE, desc2: false, sort3: NONE, desc3: false });
    const handleSort2 = (e) => update({ sort2: e.target.value, sort3: NONE, desc3: false });

    const applySort = (sourceData, s1, s2, s3, d1, d2, d3) => {
        const sortArr = [];
        if (s1 !== NONE) sortArr.push({ column: Number(s1) - 1, direction: d1 });
        if (s2 !== NONE) sortArr.push({ column: Number(s2) - 1, direction: d2 });
        if (s3 !== NONE) sortArr.push({ column: Number(s3) - 1, direction: d3 });
        if (sortArr.length === 0) return [...sourceData];
        return [...sourceData].sort((a, b) => {
            for (const { column, direction } of sortArr) {
                const key = columns[column];
                const av = a[key], bv = b[key];
                let cmp = typeof av === 'number' && typeof bv === 'number'
                    ? av - bv
                    : String(av).localeCompare(String(bv), 'ru');
                if (cmp !== 0) return direction ? -cmp : cmp;
            }
            return 0;
        });
    };

    const handleApplySort = () => {
        onSort(applySort(data, sort1, sort2, sort3, desc1, desc2, desc3), true);
        onReset();
    };

    const handleResetSort = () => {
        update({ sort1: NONE, desc1: false, sort2: NONE, desc2: false, sort3: NONE, desc3: false });
        onSort([...data], false);
        onReset();
    };

    const renderOptions = (currentValue, exclude = []) =>
        columns.map((col, i) => {
            const val = String(i + 1);
            if (exclude.includes(val) && val !== currentValue) return null;
            return <option key={i} value={val}>{col}</option>;
        });

    return (
        <details open>
            <summary><b>Сортировка</b></summary>
            <form id="sortForm">
                <label htmlFor="sort1">Первый уровень:</label><br />
                <select id="sort1" value={sort1} onChange={handleSort1}>
                    <option value={NONE}>Нет</option>
                    {renderOptions(sort1, [sort2, sort3].filter(v => v !== NONE))}
                </select>
                <label>
                    <input type="checkbox" id="sort1Desc" checked={desc1} onChange={e => update({ desc1: e.target.checked })} />
                    {' '}по убыванию?
                </label><br /><br />

                <label htmlFor="sort2">Второй уровень:</label><br />
                <select id="sort2" value={sort2} onChange={handleSort2} disabled={sort1 === NONE}>
                    <option value={NONE}>Нет</option>
                    {renderOptions(sort2, [sort1, sort3].filter(v => v !== NONE))}
                </select>
                <label>
                    <input type="checkbox" id="sort2Desc" checked={desc2} onChange={e => update({ desc2: e.target.checked })} disabled={sort1 === NONE} />
                    {' '}по убыванию?
                </label><br /><br />

                <label htmlFor="sort3">Третий уровень:</label><br />
                <select id="sort3" value={sort3} onChange={e => update({ sort3: e.target.value })} disabled={sort2 === NONE}>
                    <option value={NONE}>Нет</option>
                    {renderOptions(sort3, [sort1, sort2].filter(v => v !== NONE))}
                </select>
                <label>
                    <input type="checkbox" id="sort3Desc" checked={desc3} onChange={e => update({ desc3: e.target.checked })} disabled={sort2 === NONE} />
                    {' '}по убыванию?
                </label><br /><br />

                <input type="button" id="sortBtn" value="Сортировать" onClick={handleApplySort} />
                <input type="button" id="resetSortBtn" value="Сбросить сортировку" onClick={handleResetSort} />
            </form>
        </details>
    );
};

export { NONE };
export default Sort;