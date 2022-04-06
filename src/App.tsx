import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { HostFrame } from './host-frame';
import { DataChannelWrapperProvider } from './host-frame/DataChannelContext';
import { CustomSheet } from './custom-sheet';

function App() {
    return (
        <>
            <DataChannelWrapperProvider>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<CustomSheet />} />
                        <Route path="/host" element={<HostFrame />}></Route>
                    </Routes>
                </BrowserRouter>
            </DataChannelWrapperProvider>
        </>
    );
}

export default App;
