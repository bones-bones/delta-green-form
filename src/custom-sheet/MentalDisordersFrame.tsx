import styled from '@emotion/styled';

import React from 'react';

import { TextArea } from './text-area';

export const MentalDisordersFrame = () => {
    return (
        <>
            <Header>Motivations and Disorders</Header>
            <TextArea />
        </>
    );
};
const Header = styled.h2({ color: 'white' });
