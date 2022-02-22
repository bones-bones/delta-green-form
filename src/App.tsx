import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { CustomSheet } from './custom-sheet';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<CustomSheet />} />
                
            </Routes>
        </BrowserRouter>
    );
}

export default App;
