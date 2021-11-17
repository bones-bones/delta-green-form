import styled from '@emotion/styled';
import React from 'react';

type Props = {
    selected?: boolean;
    children?: React.ReactNode;
    onClick: () => void;
};

export const Tab = ({ children, selected, onClick }: Props) => {
    return (
        <TabElement onClick={onClick} selected={!!selected}>
            {children}
        </TabElement>
    );
};

const TabElement = styled.button(({ selected }: { selected: boolean }) => ({
    transform: 'perspective(11px) rotateX(1deg)',
    borderLeft: '3px solid green',
    borderRight: '3px solid green',
    borderTop: '3px solid green',
    borderBottom: selected ? 'transparent' : '3px solid green',
    color: 'white',
    width: '33%',
    backgroundColor: selected ? '#557755' : '#002200',
}));
