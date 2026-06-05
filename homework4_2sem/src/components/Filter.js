import { useState } from "react";
import Sort from "./Sorting.js";
/*
   компонент, для фильтрации таблицы
   пропсы:
      fullData - полные данные, по которым формировалась таблица при загрузке страницы
      data - данные для фильтрации
	  filtering - функция обновления данных для фильтрации
*/

const Filter = (props) => {
    const handleSubmit = (event) => {        
        event.preventDefault();		

		// создаем словарь со значениями полей формы (текстовые поля)
		const filterField = {
			"Название": event.target["name"].value.toLowerCase(),
            "Отрасль":  event.target["industry"].value.toLowerCase(),
	    };

        const numFields = {
            "Выручка": [
                event.target["revenueMin"].value !== "" ? Number(event.target["revenueMin"].value) : -Infinity,
                event.target["revenueMax"].value !== "" ? Number(event.target["revenueMax"].value) :  Infinity,
            ],
            "Сотрудники": [
                event.target["employeesMin"].value !== "" ? Number(event.target["employeesMin"].value) : -Infinity,
                event.target["employeesMax"].value !== "" ? Number(event.target["employeesMax"].value) :  Infinity,
            ],
            "Основана": [
                event.target["foundedMin"].value !== "" ? Number(event.target["foundedMin"].value) : -Infinity,
                event.target["foundedMax"].value !== "" ? Number(event.target["foundedMax"].value) :  Infinity,
            ],
            "Прибыль": [
                event.target["profitMin"].value !== "" ? Number(event.target["profitMin"].value) : -Infinity,
                event.target["profitMax"].value !== "" ? Number(event.target["profitMax"].value) :  Infinity,
            ],
        };
			
        //фильтруем данные по значениям всех полей формы
        let arr = props.fullData;
        for(const key in  filterField) {
			arr = arr.filter(item => 
			    item[key].toLowerCase().includes(filterField[key]));  
        }  

        for (const key in numFields) {
            const [min, max] = numFields[key];
            arr = arr.filter(item =>
                Number(item[key]) >= min && Number(item[key]) <= max
            );
        }
                
        //передаем родительскому компоненту новое состояние - отфильтрованный массив
        props.filtering(arr);
	};

    const handleReset = (event) => {
        event.preventDefault();
        event.target.form.reset();
        props.filtering(props.fullData);
    };

    return (
        <form onSubmit={handleSubmit}>
            <p>
                <label>Название: </label>
                <input name="name" type="text" />
            </p>
            <p>
                <label>Отрасль: </label>
                <input name="industry" type="text" />
            </p>
            <p>
                <label>Выручка от: </label>
                <input name="revenueMin" type="number" />
                <label> до: </label>
                <input name="revenueMax" type="number" />
            </p>
            <p>
                <label>Сотрудники от: </label>
                <input name="employeesMin" type="number" />
                <label> до: </label>
                <input name="employeesMax" type="number" />
            </p>
            <p>
                <label>Год основания от: </label>
                <input name="foundedMin" type="number" />
                <label> до: </label>
                <input name="foundedMax" type="number" />
            </p>
            <p>
                <label>Прибыль от: </label>
                <input name="profitMin" type="number" />
                <label> до: </label>
                <input name="profitMax" type="number" />
            </p>
            <p>
                <button type="submit">Фильтровать</button>
                <button type="button" onClick={handleReset}>Очистить фильтр</button>
            </p>
        </form>        
    )
}

export default Filter;