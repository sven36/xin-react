import React from 'react';
import './Home.scss';
import { Link } from 'react-router';
// import createHashHistory from 'history/lib/createHashHistory'
import Header from  'commons/Header/Header';
import WhiteSpace from 'commons/WhiteSpace/WhiteSpace';
import List from 'commons/List/List';
import TitleBar from 'commons/TitleBar/TitleBar';
import FlexWrapper from 'commons/FlexWrapper/FlexWrapper';
import FooterBar from 'commons/FooterBar/FooterBar';
import FilterBar from 'commons/FilterBar/FilterBar';
import SwitchBar from '../../components/SwitchBar/SwitchBar';
import OpenWechatLayer from '../../components/OpenWechatLayer/OpenWechatLayer';
import Toast from 'lm-toast';
import Dialog from 'lm-dialog';
import request from 'api/request';
import {URLCONFIG} from 'config';
import Loading from 'lm-loading';
import CacheStore from 'api/store';

const Item = List.Item;
const Brief = Item.Brief;
const FlexItem = FlexWrapper.FlexItem;
const FlexLink = FlexWrapper.FlexLink;
// const SubTitle = FlexItem.SubTitle;
// const FilterItem = FilterBar.FilterItem;
// const history = createHashHistory();

class Home extends React.Component {
	constructor(){
		super();
		var initState = {
			isLoading: true,
			isApp: window.appOpt === 'true' ? true : false,
			_showDialog: window.topUpSuccess && window.topUpSuccess == 1 ? 1 : 0
		}
		var cacheState =CacheStore.get('HomeState');
		if(cacheState){//首页弹了一次窗 点击子页面再返回时不应再弹窗;
			cacheState._showDialog =0;
		}
		this.state = cacheState || initState;
		window.WBAPP && window.WBAPP.setTitle('58贷款');
		// this.state = {
		// 	//1是会员 0非会员
		// 	isMember: 1,
		// 	//会员的过期时间
		// 	expire_time: '',
		// 	orgList: null,
		// 	maxSuccessRate: '',
		// 	memberUrl: '',
		// 	isLoading: true,
		// 	isApp: true,
		// 	_showToast: false,
		// 	_showDialog: false,
		// 	topUpSuccess: 0,
		// 	_toastMessage: '请求机构信息失败，请返回重新进入~'
		// } 
		this.buyVip = this.buyVip.bind(this);
		this.ajaxDate = this.ajaxDate.bind(this);
		this.getOrgList = this.getOrgList.bind(this);
		this.toastClose = this.toastClose.bind(this);
		this.btnCancelCbFun = this.btnCancelCbFun.bind(this);
		this.btnOkCbFun = this.btnOkCbFun.bind(this);
		this.goDirect = this.goDirect.bind(this);
	}

	componentDidMount() {
		if (!CacheStore.get('HomeState')) {
			request.get(`${URLCONFIG.vipInfoUrl}`)
				.then((result) => {
					var _newState = Object.assign({}, this.state);
					var memUrl;
					if (result && result.code === 0) {
						_newState.isMember = result.data.is_member;
						_newState.isApp = result.data.appOpt;
						_newState.expire_time = result.data.expire_time;
						_newState.maxSuccessRate = result.data.maxSuccessRate;
						if(result.data.memberUrl){
							if(result.data.memberUrl.indexOf('?') > 0){
								memUrl =result.data.memberUrl+ '&bizz=wddk';
							}else{
								memUrl =result.data.memberUrl+ '?bizz=wddk';
							}
						}
						_newState.memberUrl = memUrl;

						//微信弹窗
						// _newState._showDialog = _newState.topUpSuccess == 1 ? true : false;
						_newState.orgList = result.data.orgList;
						_newState.isLoading = false;

						CacheStore.set('isMember', result.data.is_member);
						CacheStore.set('memberUrl', result.data.memberUrl);
						CacheStore.set('HomeState', _newState);
					} else {
						_newState._showToast = true;
						_newState._toastMessage = '请求机构信息失败，请返回重新进入~';
					}
					this.setState(_newState);
				})
		}
	}
	goDirect() {
		//跳转到直连信贷员专区
		var url = URLCONFIG.iconDirectUrl;
		if (this.state.isApp) {
			window.WBAPP && window.WBAPP._nativeBridge({
				action: 'pagetrans',
				tradeline: 'core',
				content: {
					pagetype: 'link',
					url: url,
					title: '直联信贷员'
				}
			});
		} else {
			window.location.href = url;
		}
	}

	buyVip() {
		if (this.state.isApp) {
			window.WBAPP && window.WBAPP._nativeBridge({
				action: 'pagetrans',
				tradeline: 'core',
				content: {
					pagetype: 'link',
					url: this.state.memberUrl,
					title: '会员中心'
				}
			});
		} else {
			window.location.href = this.state.memberUrl || URLCONFIG.memberUrl;
		}
	}
	ajaxDate(_val) {
		var sort=2;
		if(_val==='综合排序'){
			sort=1;
		}
		request.get(`${URLCONFIG.sortAjaxUrl}`, { type: '7', sort: sort })
			.then((result) => {
				var _newState = Object.assign({}, this.state);
				if (result.code=== 0) {
					_newState.orgList = result.data.orgList;
				} else {
					_newState._showToast = true;
					_newState._toastMessage = '请求机构信息失败，请返回重新进入~';
				}
				this.setState(_newState);
			})
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
			return <Item arrow="right" thumb={item.orgLogo} key={"_org_"+index} path={item.url} title={item.orgName}>
				{item.orgName}{item.label ? <span className="org-tags">{item.label}</span> : null}
				<Brief>{item.descIndex}</Brief>
				<Brief>{successRate ? '放款率' : null}{successRate}{numRate ? '费率' : null}{numRate}{acountNum ? '额度' : null}{acountNum}</Brief>
			</Item>
		});
	}
	
    toastClose(){
		this.setState({ _showToast: false });
	}
	btnOkCbFun(e) {
        e.preventDefault();
		e.stopPropagation();
		if (window && !window.openWechatCallback) {
            window.openWechatCallback =function () {};
		}
		if(this.state.isApp){
			window.WBAPP.openThirdApp("weixin://", "openWechatCallback");
		}
        this.setState({ _showDialog: false });
    }
    btnCancelCbFun(e) {
        e.preventDefault();
        e.stopPropagation();
        this.setState({ _showDialog: false });
    }

	render() {
		if(this.state.isLoading){
			return <Loading
			isShow={true} key="loading" />;
		}

		var orgList=null;
		if(this.state.orgList){
			orgList=this.getOrgList(this.state.orgList);
		}

		return (
			<div className="body-ml" key="content">
				{ this.state.isApp ? null : <Header title="我的会员" /> }
				<section className="vip-top">
					<FlexWrapper key="_wrapper_0" className="vip-user"  onClick={this.buyVip}>
						<FlexItem>
							<span className={!this.state.isMember ? 'vip-no' : 'vip-yes'}>{!this.state.isMember ? '开通VIP会员' : '尊贵的会员'}</span>
							{!this.state.isMember ? null : <span style={{ fontSize: 12, color: '#8f7c57' }}>{this.state.expire_time + '到期'}</span>}
						</FlexItem>
						<FlexItem>
							<button>{!this.state.isMember ? '立即开通' : '立即续费'}</button>
						</FlexItem>
					</FlexWrapper>
					{/* <SwitchBar tabs={[
						{ title: '精选特权', className: 'vip-privilege' },
						{ title: '会员俱乐部', className: 'vip-club' },
						{ title: '达人攻略', className: 'vip-strategy' }]}
						className="switch-title"
						shouldComponentUpdate={false}
						key="$bar_0">
					</SwitchBar> */}
					<FlexWrapper className="switch-content">
						<FlexItem className="switch-content-left">
							<Link to='/high'>
								<p>高通过率</p>
								<p><b>{this.state.maxSuccessRate}%</b></p>
								<p>绝对真实贷款数据</p>
							</Link>
						</FlexItem>
						<FlexItem className="switch-content-right">
							<Link to='/area/new'>
								<p>新品入驻</p>
								<p>新增<b>5</b>家</p>
								<p>首次上市,即时提醒</p>
							</Link>
						</FlexItem>
					</FlexWrapper>
				</section>


				<section className="vip-section">
					<TitleBar key="$tbar_1" title="专享分类" />
					<SwitchBar tabs={[
						{ title: '低利率专区', className: 'icon-rates', path: { pathname: '/area/rate'}, useLink: true },
						{ title: '高额度专区', className: 'icon-high', path: { pathname: '/area/type9'}, useLink: true },
						{ title: '机构更多', className: 'icon-more', path: { pathname: '/area/type1'}, useLink: true },
						{ title: '直联信贷员', className: 'icon-direct',onClick:this.goDirect }]}
						className="vip-area"
						shouldComponentUpdate={false}
						key="$bar_1">
					</SwitchBar>
				</section>

				<section className="vip-application">
					<TitleBar key="$tbar_2" title="特色申请" />
					<FlexWrapper className="special-application" shouldComponentUpdate={false}>
						<FlexLink path={{ pathname: '/area/type10'}}><span><b>10</b>分钟内出额度</span><span>秒审批</span></FlexLink>
						<FlexLink path={{ pathname: '/area/type11'}}><span><b>3000</b>元及以下</span><span>身份证+手机</span></FlexLink>
						<FlexLink path={{ pathname: '/area/type12'}}><span><b>1000-5000</b>元</span><span>不查征信</span></FlexLink>
						<FlexLink path={{ pathname: '/area/type13'}}><span><b>3000-10000</b>元</span><span>仅需芝麻分</span></FlexLink>
					</FlexWrapper>
					<FlexWrapper className="application-content" shouldComponentUpdate={false}>
						<FlexLink path={{ pathname: '/area/type5'}}><span>有信用卡</span><span>5000-3万</span></FlexLink>
						<FlexLink path={{ pathname: '/area/type3'}}><span>上班族</span><span>5000-20万</span></FlexLink>
						<FlexLink path={{ pathname: '/area/type14'}}><span>不分黑白户</span><span>1000-1万</span></FlexLink>
					</FlexWrapper>
					<WhiteSpace />
				</section>

				<section className="vip-recommend">
					<div className="filter-wrapper">
						<TitleBar key="$tbar_3" className="title-ml" title="为您推荐" />
						{this.state.isMember ? <FilterBar key="$fbar_0" initValue="放款率" items={['放款率', '综合排序']} ajaxDate={this.ajaxDate} /> : null}
					</div>
					{orgList ? <List isApp={this.state.isApp} memberUrl={this.state.memberUrl} isMember={this.state.isMember}>{orgList}</List> : null}
				</section>

				{this.state._showToast ? <Toast
                    showState={true}
                    toastType={'Fail'}
                    message={this.state._toastMessage}
                    onRequestClose={this.toastClose}
                    opacity={0}
				/>:null}
				{
					this.state._showDialog ? <Dialog
						showState={true}
						title={'贷款提示'}
						btnOkText="立即前往微信"
						btnOkCbFun={this.btnOkCbFun}
						btnCancelCbFun={this.btnCancelCbFun}>
						<OpenWechatLayer /> </Dialog> : false
				}
				<FooterBar active="vip"/>
			</div>
		)
	}
};

export default Home;
