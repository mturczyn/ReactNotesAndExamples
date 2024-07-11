import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import { I18nextProvider } from 'react-i18next'
import i18next from 'i18next'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Maps from './Maps'
import VirtualizedList from './VirtualizedList'
import InfiniteScrollList from './InfiniteScroll'
import reportWebVitals from './reportWebVitals'
import { PopperPlayground } from './PopperPlayground'
import { MemoryLeakExample } from './MemoryLeak'
import { SlowComponentTestArea } from './SlowComponent'

i18next.init({
    interpolation: { escapeValue: false }, // React already does escaping
})

const root = ReactDOM.createRoot(document.getElementById('root')!)
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <I18nextProvider i18n={i18next}>
                <Routes>
                    <Route path="/" element={<App />} />
                    <Route path="/maps" element={<Maps />} />
                    <Route
                        path="/infinite-scroll"
                        element={<InfiniteScrollList />}
                    />
                    <Route
                        path="/virtualized-list"
                        element={<VirtualizedList />}
                    />
                    <Route path="/popper" element={<PopperPlayground />} />
                    <Route
                        path="/memory-leak"
                        element={<MemoryLeakExample />}
                    />
                    <Route
                        path="/slow-component"
                        element={<SlowComponentTestArea />}
                    />
                </Routes>
            </I18nextProvider>
        </BrowserRouter>
    </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log)
