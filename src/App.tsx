import React from 'react';
import logo from './logo.svg';
import './App.css';
import styled from '@emotion/styled';

function App() {
    return (
        <Page className="App">
            <Title />
            <ProfessionalData />
            <StatisticalData />
            <PsychologicalData />
            <ApplicableSkillSets />
        </Page>
    );
}

export default App;

const Page = styled.div({ display: 'grid',
gridTemplateColumns:'',
gridTemplateRows:''
 });

const Title = styled.div({ gridColumn: 1, gridRow: 1 });
const ProfessionalData = styled.div({ gridColumn: 1, gridRow: 2 });
const StatisticalData = styled.div({ gridColumn: 1, gridRow: 3 });
const PsychologicalData = styled.div({ gridColumn: 1, gridRow: 3 });
const ApplicableSkillSets = styled.div({ gridColumn: 1, gridRow: 4 });
