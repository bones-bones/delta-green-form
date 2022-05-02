import styled from '@emotion/styled';

import React from 'react';

export const StyledButton = styled.button({
    backgroundColor: '#002200',
    color: 'white',
    border: 'none',
});

export const AddRowButton = (props: any) => (
    <StyledButton {...props}>+ Add Row</StyledButton>
);
