import styled from '@emotion/styled';

import React, { useState } from 'react';



export const NumericInput = styled.input({
    backgroundColor: 'green',
    boxSizing: 'border-box',
    ':valid': {
        backgroundColor: 'transparent',
        border: '1px solid transparent',
    },
    color: 'white',
    fontSize: '16px',
    border: '1px solid green',
    borderRadius: '5px',
    textAlign: 'center',
});