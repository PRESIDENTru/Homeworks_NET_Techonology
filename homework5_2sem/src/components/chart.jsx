import { useState } from "react";
import ChartDraw from "./chartDraw";
import * as d3 from "d3";

const Chart = (props) => {

    const [ox, setOx] = useState("Отрасль");
    const [oy, setOy] = useState([true, false]);
    const [error, setError] = useState("");
    const [chartType, setChartType] = useState("dot");
    const [shouldRender, setShouldRender] = useState(true);

    const handleOy = () => {
        setError("");
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const maxChecked = event.target["oy"][0].checked;
        const minChecked = event.target["oy"][1].checked;
        const selectedChartType = event.target["chartType"].value;

        if (!maxChecked && !minChecked) {
            setError("Ошибка: выберите хотя бы одно значение для оси OY (Максимальную или Минимальную выручку)");
            setShouldRender(false);
            return;
        }

        setShouldRender(true);
        setError("");
        setOx(event.target["ox"].value);
        setOy([maxChecked, minChecked]);
        setChartType(selectedChartType);
    };

    const createArrGraph = (data, key) => {
        const groupObj = d3.group(data, d => d[key]);
        let arrGraph = [];
        for (let entry of groupObj) {
            let minMax = d3.extent(entry[1].map(d => d["Выручка"]));
            arrGraph.push({ labelX: entry[0], values: minMax });
        }
        return arrGraph;
    };

    const sortDataByYear = (data) => {
        if (ox === "Основана") {
            return [...data].sort((a, b) => parseInt(a.labelX) - parseInt(b.labelX));
        }
        return data;
    };

    const graphData = createArrGraph(props.data, ox);
    const sortedData = sortDataByYear(graphData);

    const getMode = () => {
        const [showMax, showMin] = oy;
        if (showMax && showMin) return "both";
        if (showMax) return "max";
        if (showMin) return "min";
        return "max";
    };

    const mode = getMode();

    return (
        <>
            <h4>Визуализация</h4>
            {error && <div className="error">{error}</div>}
            <form onSubmit={handleSubmit}>

                <p>Значение по оси OX:</p>
                <div>
                    <input type="radio" name="ox" value="Отрасль" defaultChecked={ox === "Отрасль"} />
                    Отрасль
                    <br />
                    <input type="radio" name="ox" value="Основана" />
                    Год основания
                </div>

                <p>Значение по оси OY (Выручка ₽ млрд):</p>
                <div>
                    <input type="checkbox" name="oy" onChange={handleOy} defaultChecked={oy[0] === true} />
                    Максимальная выручка
                    <br />
                    <input type="checkbox" name="oy" onChange={handleOy} />
                    Минимальная выручка
                </div>

                <p><strong>Тип диаграммы:</strong></p>
                <div>
                    <select name="chartType" defaultValue={chartType}>
                        <option value="dot">Точечная диаграмма</option>
                        <option value="bar">Гистограмма</option>
                        <option value="line">График</option>
                    </select>
                </div>

                <p>
                    <button type="submit">Построить</button>
                </p>
            </form>

            {!error && shouldRender && (
                <ChartDraw
                    data={sortedData}
                    mode={mode}
                    chartType={chartType}
                />
            )}
        </>
    );
};

export default Chart;