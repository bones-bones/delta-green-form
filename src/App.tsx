import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { HostFrame } from './host-frame';
import { CustomSheet } from './custom-sheet';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<CustomSheet />} />
                <Route path="/host" element={<HostFrame />}></Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
