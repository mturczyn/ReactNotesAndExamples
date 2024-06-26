import React from 'react'
import App from './App'
import { I18nextProvider } from 'react-i18next'
import i18next from 'i18next'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Maps from './Maps'
import VirtualizedList from './VirtualizedList'
import InfiniteScrollList from './InfiniteScroll'
import { root } from '.'

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
                </Routes>
            </I18nextProvider>
        </BrowserRouter>
    </React.StrictMode>
)
