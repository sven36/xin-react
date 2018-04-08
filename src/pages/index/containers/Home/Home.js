import React from 'react';
import './Home.scss';
import { Link } from 'react-router';
// import createHashHistory from 'history/lib/createHashHistory'
import Header from 'commons/Header/Header';
import List from 'commons/List/List';
import TitleBar from 'commons/TitleBar/TitleBar';
import FooterBar from 'commons/FooterBar/FooterBar';
import FilterBar from 'commons/FilterBar/FilterBar';
import request from 'api/request';
import { URLCONFIG } from 'config';
import CacheStore from 'api/store';

const Item = List.Item;
const Brief = Item.Brief;
// const SubTitle = FlexItem.SubTitle;
// const FilterItem = FilterBar.FilterItem;
// const history = createHashHistory();

class Home extends React.Component {
	constructor() {
		super();
		var initState = {
			isLoading: true,
			isApp: window.appOpt === 'true' ? true : false,
			_showDialog: window.topUpSuccess && window.topUpSuccess == 1 ? 1 : 0
		}
		var cacheState = CacheStore.get('HomeState');
		if (cacheState) {//首页弹了一次窗 点击子页面再返回时不应再弹窗;
			cacheState._showDialog = 0;
		}
		this.state = cacheState || initState;
		this.ajaxDate = this.ajaxDate.bind(this);

	}

	componentDidMount() {
		if (!CacheStore.get('HomeState')) {
		}
	}

	ajaxDate(_val) {
		// request.get(`${URLCONFIG.sortAjaxUrl}`, { type: '7', sort: sort })
		// 	.then((result) => {
		// 		var _newState = Object.assign({}, this.state);
		// 		if (result.code === 0) {
		// 			_newState.orgList = result.data.orgList;
		// 		} else {
		// 			_newState._showToast = true;
		// 			_newState._toastMessage = '请求机构信息失败，请返回重新进入~';
		// 		}
		// 		this.setState(_newState);
		// 	})
	}

	getOrgList(orgList) {
		return orgList.map((item, index) => {
			var successRate = null;
			var numRate = null;
			var acountNum = null;
			if (this.state.isMember && item.successRate) {
				successRate = <span className="ml-5">{item.successRate}%</span>;
			}
			if (item.numRate) {
				numRate = <span className="ml-5">{item.numRate}</span>;
			}
			if (item.acountNum) {
				acountNum = <span className="ml-5">{item.acountNum}</span>;
			}
			return <Item arrow="right" thumb={item.orgLogo} key={"_org_" + index} path={item.url} title={item.orgName}>
				{item.orgName}{item.label ? <span className="org-tags">{item.label}</span> : null}
				<Brief>{item.descIndex}</Brief>
				<Brief>{successRate ? '放款率' : null}{successRate}{numRate ? '费率' : null}{numRate}{acountNum ? '额度' : null}{acountNum}</Brief>
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
				{this.state.isApp ? null : <Header title="我的会员" />}
				{/* <FooterBar active="vip" /> */}
			</div>
		)
	}
};

export default Home;
