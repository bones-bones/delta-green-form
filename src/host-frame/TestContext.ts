import { createContext } from 'react';

export const TestContext = createContext({
    myValue: 'test',
    setMyValue: () => {
        //
    },
});
