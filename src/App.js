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
                    Edit <code>src/App.js</code> and save to reload.
                </p>
                <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Learn React
                </a>
                <Link to="/maps">Go to maps</Link>
                <Link to="/virtualized-list">Go to virtualized list</Link>
                <p>Show custom modal centered within the viewport</p>
                <button onClick={() => setShowModal(!showModal)}>
                    Show modal
                </button>
                <div
                    style={{
                        display: showModal ? 'block' : 'none',
                        position: 'fixed',
                        inset: '0px',
                        width: '12rem',
                        height: '5rem',
                        maxWidth: '100vw',
                        maxHeight: '100dvh',
                        margin: 'auto',
                        background: 'lightblue',
                    }}
                >
                    THIS IS CUSTOM MODAL
                </div>
                <WeatherApp />
            </header>
        </div>
    )
}

export default App
