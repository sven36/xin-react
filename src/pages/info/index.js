import React from 'react';
import ReactDOM from 'react-dom';
import {
    BrowserRouter
} from 'react-router-dom';
import Test from './containers/Test/Test'


const rootElement = document.getElementById('root');

ReactDOM.render(
    <BrowserRouter>
        <Test/>
    </BrowserRouter>,
    rootElement
)