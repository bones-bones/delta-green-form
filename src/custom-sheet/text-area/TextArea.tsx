import styled from '@emotion/styled';

import React from 'react';

export const TextArea = (props: React.HTMLProps<HTMLTextAreaElement>) => {
    return <StyledTextArea {...props} placeholder={' '} />;
};

const StyledTextArea = styled.textarea({
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
