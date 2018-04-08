import React from 'react';
import './HighArea.scss';
import Header from 'commons/Header/Header';
import WhiteSpace from 'commons/WhiteSpace/WhiteSpace';
import List from 'commons/List/List';
import TitleBar from 'commons/TitleBar/TitleBar';
import FlexWrapper from 'commons/FlexWrapper/FlexWrapper';
// import FilterBar from 'commons/FilterBar/FilterBar';
import Button from 'lm-button';
import Toast from 'lm-toast';
import request from 'api/request';
import {URLCONFIG} from 'config';
import CacheStore from 'api/store';

const Item = List.Item;
const Brief = Item.Brief;
// const FlexItem = FlexWrapper.FlexItem;
// const SubTitle = FlexItem.SubTitle;

export default class HighArea extends React.Component {
    constructor(props) {
        super(props);
        //专区类型：(1, "机构更多"), (2, "低利率专区"), (3, "上班族"), (4, "小额极速贷"), (5, "信用卡贷"), (6, "新品入驻"), (7, "为你推荐机构")
        //(8, "高通过率"), (9,"高额度专区"), (10,"秒审批"), (11,"身份证+手机"), (12,"不查征信"), (13,"仅需芝麻分"), (14,"不分黑白户");
        // this.state.type = bizzObj[id][1];
        //默认放款率排序
        // this.state.sort = 2;
        var isApp = window.appOpt === 'true' || false;
        var isMember = CacheStore.get('isMember');
        var memberUrl = CacheStore.get('memberUrl') ? CacheStore.get('memberUrl') + '&bizz=high': '';
        this.state = {
            //1是会员 0非会员
            isMember: isMember ? isMember : 0,
            isApp: isApp,
            memberUrl: memberUrl,
            type: 8,
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
        this.ajaxDate = this.ajaxDate.bind(this);

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
            window.WBAPP && window.WBAPP.setTitle('高放款率专区');
        }
    }
    componentDidMount() {
        this.ajaxDate();
    }
    ajaxDate(_val) {
        var sort = this.state.sort;
        if (_val && _val === '综合排序') {
            sort = 1;
        }
        request.get(`${URLCONFIG.sortAjaxUrl}`, { type: this.state.type, sort: sort })
            .then((result) => {
                var _newState = Object.assign({}, this.state);
                var memUrl;
                if (result.code === 0) {
                    _newState.isMember = result.data.chaojiVip;
                    _newState.isApp = result.data.appOpt;
                    if(!this.state.memberUrl){
                        if(result.data.memberUrl.indexOf('?') > 0){
                            memUrl =result.data.memberUrl+ '&bizz=high';
                        }else{
                            memUrl =result.data.memberUrl+ '?bizz=high';
                        }
                        _newState.memberUrl = memUrl;
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
            var icon = null;
            if (this.state.isMember && item.successRate) {
                successRate = <span className="ml-5">{item.successRate}%</span>;
            }
            if (item.numRate) {
                numRate = <span className="ml-5">{item.numRate}</span>;
            }
            if (item.acountNum) {
                acountNum = <span className="ml-5">{item.acountNum}</span>;
            }
            if (this.state.isMember && this.state.type === 8 && index < 3) {
                //会员时 高放款率专区 列表右上角有个icon
                icon = <i className="high-right-icon">{index + 1}</i>;
            }
            return <Item arrow="right" thumb={item.orgLogo} key={"_org_" + index} path={item.url}>
                {this.state.isMember ? item.orgName : '极速无抵押现金贷'}{item.label ? <span className="org-tags">{item.label}</span> : null}{icon}
                <Brief>{item.descIndex}</Brief>
                <Brief>{successRate ? '放款率' : null}{successRate}{numRate ? '费率' : null}{numRate}{acountNum ? '额度' : null}{acountNum}</Brief>
            </Item>
        });
    }
    render() {
        var noVipContent = null;
        var contentChilds = null;
        var contentList = null;
        if (!this.state.isMember && this.state.orgList) {
            contentChilds = this.state.orgList.map((item, index) => {
                if (index < 3) {
                    var materila = item.applyMaterial && JSON.parse(item.applyMaterial);
                    return <div key={`_no-vip_${index}`}>
                        <ul>
                            <li><p>{item.successRate}%</p><p>近一月放款率</p></li>
                            <li><p>{materila && materila[0]}</p><p>{materila && materila[1]}</p></li>
                        </ul>
                        <div className="btn-vip">
                            <Button content="立即申请"  handle={this.buyVip}  />
                        </div>
                        <WhiteSpace />
                    </div>;
                }
            });
            noVipContent = <div className="high-pass-no-vip">
                {contentChilds}
            </div>;
        }
        if (this.state.isMember) {
            contentList = this.state.orgList && this.getOrgList(this.state.orgList);
        }
        return (
            <div>
                { this.state.isApp ? null : <Header title={"高放款率专区"} /> }
                <FlexWrapper key="_banner_0" className="top-banner-common high-pass-top">
                        <h3>高放款率专区</h3>
                        <p>独家披露真实的贷款成功率等数据</p>
                        <p>最高放款率可达{this.state.orgList && this.state.orgList.length > 0  ? this.state.orgList[0].successRate + '%' : '33%'}</p>
                </FlexWrapper>
                {!this.state.noRecommend ?<TitleBar key="$tbar_4" className="title-ml" title={this.state.isMember ? "为您推荐" : "排行榜"} /> :<div className="no-recommend">暂无推荐</div>}
                {contentList ? <List  isApp={this.state.isApp} memberUrl={this.state.memberUrl}  isMember={this.state.isMember}>{contentList}</List> : null}
                {noVipContent}
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
                /> : null}
            </div>

        );
    }
}
