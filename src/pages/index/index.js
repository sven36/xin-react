//import base&&tool
// import 'whatwg-fetch'
// import 'assets/index.scss'
// import 'tools/polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import createHashHistory from 'history/lib/createHashHistory'
import { 
		Route,
		Router,
		Redirect } from 'react-router';
// import containers IndexRedirect,
// import App from './containers/App'
import Home from './containers/Home/Home'


// 解决路由切换时页面滚动问题
// https://github.com/webpack/webpack/issues/1949
const history = createHashHistory();

history.listen(location => {

    setTimeout(() => {

       if (location.action === 'POP') {
            return;
        }

        window.scrollTo(0, 0);

    });

});

const rootElement = document.getElementById('root');

ReactDOM.render(

	<Router history={history}>
		<Route path="/" component={Home}></Route>
		<Redirect from="*" to="/"></Redirect>
	</Router>,

    rootElement

)
