import React from 'react';
import './ActivityArea.scss';
import Header from 'commons/Header/Header';
import List from 'commons/List/List';
import TitleBar from 'commons/TitleBar/TitleBar';
import FlexWrapper from 'commons/FlexWrapper/FlexWrapper';
import FilterBar from 'commons/FilterBar/FilterBar';
import Button from 'lm-button';
import Toast from 'lm-toast';
import request from 'api/request';
import {URLCONFIG} from 'config';
import CacheStore from 'api/store';

const Item = List.Item;
const Brief = Item.Brief;
// const FlexItem = FlexWrapper.FlexItem;
// const SubTitle = FlexItem.SubTitle;

const bizzObj = {
    new: ["new", 6, "新品入驻专区"],
    rate: ["rate", 2, "低利率专区"],
    type1: ["type1", 1, "机构更多专区"],
    type3: ["type3", 3, "上班族专区"],
    type5: ["type5", 5, "信用卡专区"],
    type9: ["type9", 9, "高额度专区"],
    type10: ["type10", 10, "秒审批专区"],
    type11: ["type11", 11, "身份证+手机专区"],
    type12: ["type12", 12, "不查征信专区"],
    type13: ["type13", 13, "仅需芝麻分专区"],
    type14: ["type14", 14, "不分黑白户专区"]
}

export default class ActivityArea extends React.Component {
    constructor(props){
        super(props);
        //专区类型：(1, "机构更多"), (2, "低利率专区"), (3, "上班族"), (4, "小额极速贷"), (5, "信用卡贷"), (6, "新品入驻"), (7, "为你推荐机构")
        //(8, "高通过率"), (9,"高额度专区"), (10,"秒审批"), (11,"身份证+手机"), (12,"不查征信"), (13,"仅需芝麻分"), (14,"不分黑白户");
        // this.state.type = bizzObj[id][1];
        //默认放款率排序
        // this.state.sort = 2;
        const id = this.props.params.id;
        var isApp = window.appOpt === 'true' || false;
        var isMember = CacheStore.get('isMember');
        var memberUrl = CacheStore.get('memberUrl') ? this.setMemberUrl(CacheStore.get('memberUrl')) : '';
        this.state = {
            //1是会员 0非会员
            isMember: isMember ? isMember : 0,
            isApp: isApp,
            memberUrl: memberUrl,
            type: bizzObj[id][1],
            sort: 2,
            //如果返回机构列表为空 显示暂无推荐
            noRecommend: false,
            _showToast: false,
            _toastMessage: '请求机构信息失败，请返回重新进入~',
            orgList: null
        }

        this.buyVip = this.buyVip.bind(this);
        this.toastClose = this.toastClose.bind(this);
        this.getOrgList = this.getOrgList.bind(this);
        this.setMemberUrl = this.setMemberUrl.bind(this);
        this.ajaxDate = this.ajaxDate.bind(this);
    }
    setMemberUrl(url) {
        const id = this.props.params.id;
        url = url + '&bizz=' + bizzObj[id][0];
        return url;
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
    componentWillMount() {
        //如果是在APP中 调用WBAPP.setTitle("页面标题");改变Title
        if (this.state.isApp) {
            var id = this.props.params.id;
            var title = bizzObj[id][2] || '58贷款';
            window.WBAPP && window.WBAPP.setTitle(title);
        }
    }
    componentDidMount(){
        this.ajaxDate();
    }
    ajaxDate(_val) {
        var sort=this.state.sort;
		if(_val && _val==='综合排序'){
			sort=1;
		}
		request.get(`${URLCONFIG.sortAjaxUrl}`, { type: this.state.type, sort:sort })
			.then((result) => {
				var _newState = Object.assign({}, this.state);
				if (result.code === 0) {
                    _newState.isMember = result.data.chaojiVip;
                    _newState.isApp = result.data.appOpt;
                    if (!this.state.memberUrl) {
                        _newState.memberUrl = this.setMemberUrl(result.data.memberUrl);
                    }
                    _newState.orgList = result.data.orgList;
                    if (!result.data.orgList || result.data.orgList.length === 0) {
                        _newState.noRecommend = true;
                    }

                } else {
					_newState._showToast = true;
					_newState._toastMessage = '请求机构信息失败，请返回重新进入~';
				}
				this.setState(_newState);
			})
	}
    toastClose() {
        this.setState({ _showToast: false });
    }

    getOrgList(orgList) {
		return orgList.map((item, index) => {
			var successRate = null;
			var numRate = null;
			var acountNum = null;
			// var icon = null;
            var startTime = null;
            if (this.state.isMember && item.successRate) {
				successRate = <span className="ml-5">{item.successRate}%</span>;
			}
			if (item.numRate) {
				numRate = <span className="ml-5">{item.numRate}</span>;
			}
			if (item.acountNum) {
				acountNum = <span className="ml-5">{item.acountNum}</span>;
            }
            if(this.props.params.id==='new' && item.startTime){
                //新品入驻专区 有上线时间字段
                startTime =<span className="ml-5">{item.startTime}</span>
            }
			return <Item arrow="right" thumb={item.orgLogo} key={"_org_"+index} path={item.url}>
				{this.state.isMember ? item.orgName :'极速无抵押现金贷'}{item.label ? <span className="org-tags">{item.label}</span> : null}
				<Brief>{item.descIndex}</Brief>
                {startTime ? <Brief>{'上线时间'}{startTime}</Brief> : null}
				<Brief>{successRate ? '放款率' : null}{successRate}{numRate ? '费率' : null}{numRate}{acountNum ? '额度' : null}{acountNum}</Brief>
			</Item>
		});
	}
    render(){
        const id = this.props.params.id;// ActivityArea high高放款率专区 new新品入驻专区 rate 低利率专区
        var Banner,title;
        var contentList= this.state.orgList ? this.getOrgList(this.state.orgList) : null;
        switch (id) {
            case 'new':
                title="新品入驻专区";
                Banner = <FlexWrapper key="_banner_1" shouldComponentUpdate={false} className="top-banner-common new-product-top">
                        <h3>新品入驻专区</h3>
                        <ul className="top-content">
                            <li>
                                <span><b>5</b>家</span>
                                <span>最近上线</span>
                            </li>
                            <li>
                                <span><b>30</b>天</span>
                                <span>保留时间</span>
                            </li>
                            <li>
                                <span><b>随时提醒</b></span>
                                <span>短信微信</span>
                            </li>
                        </ul>
                </FlexWrapper>;
                break;
            case 'rate':
                title="低利率专区";
                Banner = <FlexWrapper key="_banner_2" shouldComponentUpdate={false} className="top-banner-common low-rate-top">
                        <h3>低利率专区</h3>
                        <p>包含银行低息贷、消费金融机构贷款等</p>
                        <p>利率均在0.1%以下</p>
                </FlexWrapper>;
                break;
            default:
                title = bizzObj[id][2] || '我的贷款';
                Banner=null;
                break;
        }
        return(
            <div>
                { this.state.isApp ? null : <Header title={title} /> }
                {Banner}
                <div className="filter-wrapper">
                    {this.state.noRecommend ? <div className="no-recommend">暂无推荐</div> : <TitleBar key="$tbar_4" className="title-ml" title={"为您推荐"} />}
                    {this.state.isMember && !this.state.noRecommend ? <FilterBar key="$fbar_0" initValue="放款率" items={['放款率', '综合排序']} ajaxDate={this.ajaxDate} /> : null}
                </div>

                {contentList ? <List  isApp={this.state.isApp} memberUrl={this.state.memberUrl}  isMember={this.state.isMember}>{contentList}</List> : null}
                
                {!this.state.isMember ? <Button content="开通会员查看更多"
                    className="btn-height"
                    position="fixed"
                    type="white-blue"
                    handle={this.buyVip} /> : null}
                {this.state._showToast ? <Toast
                    showState={true}
                    toastType={'Fail'}
                    message={this.state._toastMessage}
                    onRequestClose={this.toastClose}
                    opacity={0}
                />:null}
            </div>
        );
    }
}