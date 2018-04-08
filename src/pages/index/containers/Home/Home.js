import React from 'react';
import './Home.scss';
import { Link } from 'react-router';
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
	}

	componentDidMount() {
		if (!CacheStore.get('HomeState')) {
			request.get(`${URLCONFIG.testUrl}`)
				.then((result) => {
					var _newState = Object.assign({}, this.state);
					var memUrl;
					if (result) {
						_newState.orgList = result;
						CacheStore.set('HomeState', _newState);
					} else {
						_newState._showToast = true;
						_newState._toastMessage = '请求机构信息失败，请返回重新进入~';
					}
					this.setState(_newState);
				})
		}
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
			<div className="body-ml" key="content">
				<HomeLogo />
				<Header title="测试一下" />
				<List>{orgList}</List>
			</div>
		)
	}
};

export default Home;
