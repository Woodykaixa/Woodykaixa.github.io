import React from 'react';
import './App.css';
import {NavBar} from "./NavBar";

function App() {
    let sites = [
        {name: 'baidu', link: 'https://www.baidu.com'},
        {name: 'github', link: 'https://github.com'},
        {name: 'bjutlab', link: 'https://www.bjutlab.cn'},
    ];

    return (
        <div className="App">
            <NavBar items={sites} title="Kaixa's Site"/>
            <div className="MainContent">

            </div>
        </div>
    );
}

export default App;
