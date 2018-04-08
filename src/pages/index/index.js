//import base&&tool
import 'whatwg-fetch'
import 'assets/index.scss'
import 'tools/polyfill'
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
import ActivityArea from './containers/ActivityArea/ActivityArea'
import HighArea from './containers/HighArea/HighArea'


// 解决路由切换时页面滚动问题
// https://github.com/webpack/webpack/issues/1949
const history = createHashHistory();
const bizzObj = {
	high:"/high",
    new: "/area/new",
    rate: "/area/rate",
    type1: "/area/type1",
    type3: "/area/type3",
    type5: "/area/type5",
    type9: "/area/type9",
    type10: "/area/type10",
    type11: "/area/type11",
    type12: "/area/type12",
    type13: "/area/type13",
    type14: "/area/type14"
}
var _bizz=window.bizz;
//购买会员返回后根据bizz决定返回哪个页面
if(_bizz && bizzObj[_bizz] ){
	history.push(bizzObj[_bizz]);
}

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
		{/* ActivityArea  new新品入驻专区 rate 低利率专区
		专区类型：(1, "机构更多"), (2, "低利率专区"), (3, "上班族"), (4, "小额极速贷"), (5, "信用卡贷"), (6, "新品入驻"), (7, "为你推荐机构")
        (8, "高通过率"), (9,"高额度专区"), (10,"秒审批"), (11,"身份证+手机"), (12,"不查征信"), (13,"仅需芝麻分"), (14,"不分黑白户");*/}
		<Route path="/area/:id" component={ActivityArea}></Route>
		{/* 高放款率专区 单独逻辑比较多故摘出 (8, "高通过率") */}
		<Route path="/high" component={HighArea}></Route>
		<Redirect from="*" to="/"></Redirect>
	</Router>,

    rootElement

)
