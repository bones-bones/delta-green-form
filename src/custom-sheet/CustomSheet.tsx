import styled from '@emotion/styled';

import React, { useState } from 'react';
import { BondsFrame } from '../bonds';
import { InventoryFrame } from '../inventory';
import { Notifications } from '../notifications';
import { SkillsFrame } from '../skills';
import { DerivedFrame } from './DerivedFrame';
import { Placard } from './Placard';
import { StatFrame } from './StatFrame';
import { Tab } from './Tab';

const tabs = ['Stats', 'Bonds', 'Inventory'];

export const CustomSheet = () => {
    const [activeTab, setActiveTab] = useState(0);
    return (
        <Background>
            <Placard />
            <Notifications />
            <Panel>
                <Tabs>
                    {tabs.map((entry, i) => (
                        <Tab
                            selected={i === activeTab}
                            key={entry}
                            onClick={() => {
                                setActiveTab(i);
                            }}
                        >
                            {entry}
                        </Tab>
                    ))}
                </Tabs>
                <Frame>{renderTab(activeTab)}</Frame>
            </Panel>
        </Background>
    );
};

const renderTab = (tabId: number) => {
    switch (tabId) {
        case 2: {
            return <InventoryFrame />;
        }
        case 1: {
            return <BondsFrame />;
        }
        case 0: {
            return (
                <>
                    <TopFrame>
                        <StatFrame />
                        <DerivedFrame />
                    </TopFrame>
                    <SkillsFrame />
                </>
            );
        }
    }
};

const TopFrame = styled.div({
    display: 'flex',
    justifyContent: 'space-around',
});

const Background = styled.div({
    backgroundColor: '#002200',
    height: '100vh',
    width: '100vw',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
});

const Panel = styled.div({
    height: '75%',
    width: '94%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
});

const Tabs = styled.div({
    height: '6%',
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
});

const Frame = styled.div({
    borderLeft: '3px solid green',
    borderRight: '3px solid green',
    borderBottom: '3px solid green',
    height: '94%',
    width: '100%',
    overflowY: 'auto',
    '::-webkit-scrollbar': {
        border: '1px solid green',
        color: 'green',
    },
    '::-webkit-scrollbar-thumb': {
        '-webkit-appearance': 'none',
        width: '15px',
        height: '15px',
        backgroundColor: 'green',
        color: 'green',
    },
});
