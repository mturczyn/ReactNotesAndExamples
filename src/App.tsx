import logo from './logo.svg'
import './App.css'
import WeatherApp from './MultiLanguage/WeatherApp'
import { Link } from 'react-router-dom'
import { useState } from 'react'

function App() {
    const [showModal, setShowModal] = useState(false)

    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>
                    Edit <code>src/App.jsx</code> and save to reload.
                </p>
                <a
                    href="https://reactjss.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Learn React
                </a>
                <Link to="/maps">Go to maps</Link>
                <Link to="/infinite-scroll">Go to infinite scroll</Link>
                <Link to="/virtualized-list">Go to virtualized list</Link>
                <p>Show custom modal centered within the viewport</p>
                <button onClick={() => setShowModal(true)}>Show modal</button>
                <div
                    style={{
                        display: showModal ? 'block' : 'none',
                        position: 'fixed',
                        inset: '0px',
                        width: '50rem',
                        height: '35rem',
                        color: 'black',
                        maxWidth: '100vw',
                        maxHeight: '100vh',
                        margin: 'auto',
                        background: 'lightblue',
                    }}
                >
                    <h1 style={{ marginBottom: 0 }}>Modal</h1>
                    <button onClick={() => setShowModal(false)}>
                        Hide modal
                    </button>
                    <p>
                        Achieved by applying following CSS-in-JS to modal
                        container element.
                    </p>
                    <pre>
                        <code
                            style={{
                                margin: '1ch',
                                display: 'block',
                                background: '#DDD',
                                padding: '1ch',
                            }}
                        >
                            {`style={{
    display: showModal ? 'block' : 'none', 
    position: 'fixed', 
    inset: '0px', 
    width: '12rem', 
    height: '5rem', 
    maxWidth: '100vw',
    maxHeight: '100dvh', 
    margin: 'auto', 
    background: 'lightblue', 
}}`}
                        </code>
                    </pre>
                </div>
                <WeatherApp />
            </header>
        </div>
    )
}

export default App
