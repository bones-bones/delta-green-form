import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ConnectionConsumer } from './ConnectionConsumer';
import { CustomSheet } from './custom-sheet';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<CustomSheet />} />
                <Route path="/cc" element={<ConnectionConsumer />}></Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
