import React from 'react';
import ReactDom from 'react-dom';
import App from './App'
import { SnackbarProvider } from 'notistack';
import Slide from '@material-ui/core/Slide';

ReactDom.render(
    <React.StrictMode>
        <SnackbarProvider
            maxSnack={3}
            anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
            }}
            TransitionComponent={Slide}>
            <App />
        </SnackbarProvider>
    </React.StrictMode>,
    document.getElementById('app')
)