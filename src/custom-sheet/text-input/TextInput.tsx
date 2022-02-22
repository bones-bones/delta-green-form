import styled from '@emotion/styled';

import React, { forwardRef, } from 'react';

export const TextInput = forwardRef(
    (props: React.HTMLProps<HTMLInputElement>, ref: any) => {
        return <StyledInput ref={ref} {...props} type="text" placeholder=" " />;
    }
);

TextInput.displayName = 'TextInput';
const StyledInput = styled.input({
    ':placeholder-shown': {
        border: '1px solid green',
        backgroundColor: 'green',
    },

    boxSizing: 'border-box',

    backgroundColor: 'transparent',
    border: '1px solid transparent',

    color: 'white',
    fontSize: '16px',
    borderRadius: '5px',
});
