Test __Markdown__ *file*

![logo](logo192.png)

> Talk is cheap, show me the code.  —— Linus Torvalds

Code of App.tsx
``` typescript jsx
import React from 'react';
import './App.css';
import {NavBar} from "./NavBar";
import {MarkdownReader} from "./MarkdownReader";

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
                <MarkdownReader/>
            </div>
        </div>
    );
}

export default App;

```

## Code of App.css
```css
.App {
    text-align: center;
}

.App-logo {
    height: 40vmin;
    pointer-events: none;
}

@media (prefers-reduced-motion: no-preference) {
    .App-logo {
        animation: App-logo-spin infinite 20s linear;
    }
}

.App-header {
    background-color: white;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: calc(10px + 2vmin);
    color: #282c34;
}

.App-link {
    color: #61dafb;
}

@keyframes App-logo-spin {
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
}

.MainContent {
    margin: 0 4rem;
    padding: 0 15px;
}

@media (max-width: 768px) {
    .MainContent {
        margin: 0;
    }
}
```

Here is a script label

<script>
fetch('https://www.baidu.com').then(res=> res.text()).then(res=>{
    console.log(res);
})
</script>

<code style="color:red;">hello</code>