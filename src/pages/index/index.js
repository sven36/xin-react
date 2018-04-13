//import base&&tool
// import 'whatwg-fetch'
// import 'assets/index.scss'
// import 'tools/polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
// import createHashHistory from 'history/lib/createHashHistory'
import {
    BrowserRouter
} from 'react-router-dom';
import Router from './routers';


// 解决路由切换时页面滚动问题
// https://github.com/webpack/webpack/issues/1949
// const history = createHashHistory();

// history.listen(location => {

//     setTimeout(() => {

//        if (location.action === 'POP') {
//             return;
//         }

//         window.scrollTo(0, 0);

//     });

// });

const rootElement = document.getElementById('root');

ReactDOM.render(
    <BrowserRouter>
        <Router />
    </BrowserRouter>,
    rootElement
)
