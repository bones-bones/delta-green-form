import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import XFiles from './resources/x-files.ttf';
import App from './App';
import { css } from 'emotion';
import { Global } from '@emotion/react';
import { Provider } from 'react-redux';
import { store } from './store';

ReactDOM.render(
    <React.StrictMode>
        <Global
            styles={css`
                @font-face {
                    font-family: 'XFiles';
                    font-style: normal;
                    src: url('${XFiles}');
                }
            `}
        />
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);
