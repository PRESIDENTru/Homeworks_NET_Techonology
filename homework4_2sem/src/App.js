import './CSS/App.css';
import companiesData from './data.js';
import Table from './components/Table.js';
import { Component } from 'react';
import Sort from './components/Sorting.js';

function App() {
    return (
        <div className="App">
            <Table data={companiesData} amountRows="15" showPagination={true}/>
        </div>
    );
}

export default App;