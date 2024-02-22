import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { I18nextProvider } from 'react-i18next'
import i18next from 'i18next'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Maps from './Maps'

i18next.init({
    interpolation: { escapeValue: false }, // React already does escaping
})

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <I18nextProvider i18n={i18next}>
                <Routes>
                    <Route path="/" element={<App />} />
                    <Route path="/maps" element={<Maps />} />
                </Routes>
            </I18nextProvider>
        </BrowserRouter>
    </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
