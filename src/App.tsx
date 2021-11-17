import React from 'react';
import styled from '@emotion/styled';
import { StatisticalData } from './statistical-data';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { CustomSheet } from './custom-sheet';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<CustomSheet />} />
                <Route
                    path="deltaGreen"
                    element={
                        <Page className="App">
                            <Title>DG Statsheet</Title>
                            <ProfessionalData />
                            <StatisticalData />
                            <PsychologicalData />
                            <ApplicableSkillSets />
                        </Page>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
}

export default App;

const Page = styled.div({
    display: 'grid',
    gridTemplateColumns: '50vw 50vw',
    gridTemplateRows: '7vh 15vh 32vh 46vh',
});

const Title = styled.div({
    gridColumnStart: 1,
    gridColumnEnd: 3,
    gridRow: 1,
    backgroundColor: 'black',
    color: 'white',
});
const ProfessionalData = styled.div({
    gridColumnStart: 1,
    gridColumnEnd: 3,
    gridRow: 2,
    backgroundColor: 'red',
});
const PsychologicalData = styled.div({
    gridColumn: 2,
    gridRow: 3,
    backgroundColor: 'green',
});
const ApplicableSkillSets = styled.div({
    gridColumnStart: 1,
    gridColumnEnd: 3,
    gridRow: 4,
    backgroundColor: 'yellow',
});
