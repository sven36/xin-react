import React from 'react';
import './Home.scss';
import { Link } from 'react-router-dom';
import Header from 'commons/Header/Header';
import List from 'commons/List/List';
import HomeLogo from '../../components/HomeLogo';
import request from 'api/request';
import { URLCONFIG } from 'config';
import CacheStore from 'api/store';

const Item = List.Item;
const Brief = Item.Brief;

class Home extends React.Component {
	constructor() {
		super();
		var initState = {
			isLoading: true,
		}
		var cacheState = CacheStore.get('HomeState');
		if (cacheState) {
			cacheState._showDialog = 0;
		}
		this.state = cacheState || initState;
		this.onClick = this.onClick.bind(this);
	}
	componentWillMount() {
		console.log('Home componentWillMount');
	}

	componentDidMount() {
		console.log('Home componentDidMount');
		if (!CacheStore.get('HomeState')) {
			// request.get(`${URLCONFIG.testUrl}`)
			// 	.then((result) => {
			// 		var _newState = Object.assign({}, this.state);
			// 		var memUrl;
			// 		if (result) {
			// 			_newState.orgList = result;
			// 			CacheStore.set('HomeState', _newState);
			// 		} else {
			// 			_newState._showToast = true;
			// 			_newState._toastMessage = '请求机构信息失败，请返回重新进入~';
			// 		}
			// 		this.setState(_newState);
			// 	})
		}
	}
	onClick() {
		alert('clicked');
	}
	getOrgList(orgList) {
		return orgList.map((item, index) => {
			return <Item key={"_org_" + index}>
				{item.title}
			</Item>
		});
	}

	render() {
		var orgList = null;
		if (this.state.orgList) {
			orgList = this.getOrgList(this.state.orgList);
		}
		return (
			<div className="body-ml" key="content" onClick={this.onClick}>
				<HomeLogo />
				<Header title="测试一下" />
				<Link to="/homeDetail">Client Router homeDetail</Link>
				<List>{orgList}</List>
			</div>
		)
	}
};

export default Home;
