import React from 'react';
import Item from './ListItem';
import './List.scss';
import request from '../../api/request';

export default class List extends React.Component {
    static Item = Item;
    constructor(props) {
        super(props);
        this.state = {
            showState: false
        }
        this.wrapperClick = this.wrapperClick.bind(this);
        this.pageTransfer = this.pageTransfer.bind(this);
        this.fomatLoadUrl = this.fomatLoadUrl.bind(this);
        this.btnCancelCbFun = this.btnCancelCbFun.bind(this);
        this.btnOkCbFun = this.btnOkCbFun.bind(this);
    }
    btnOkCbFun(e) {
        e.preventDefault();
        e.stopPropagation();
        var url = this.props.memberUrl || '';
        this.pageTransfer(url, '会员中心');
        var _newState = Object.assign({}, this.state);
        _newState.showState = false;
        this.setState(_newState);
    }
    btnCancelCbFun(e) {
        e.preventDefault();
        e.stopPropagation();
        var _newState = Object.assign({}, this.state);
        _newState.showState = false;
        this.setState(_newState);
    }
    wrapperClick(e) {
        e.preventDefault();
        this.props.listClick && this.props.listClick(e);
        if (!this.props.isMember) {
            if (this.props.isApp) {
                window.WBAPP && window.WBAPP._nativeBridge({
                    action: 'pagetrans',
                    tradeline: 'core',
                    content: {
                        pagetype: 'link',
                        url: this.props.memberUrl,
                        title: '会员中心'
                    }
                });
            } else {
                window.location.href = this.props.memberUrl;
            }
            return;
        }
        var _t = e.target;
        while (_t && _t.nodeName.toLowerCase() !== 'a') {
            _t = _t.parentNode;
        }
        if (_t) {
            var url = _t && _t.href;
            var title = _t.title || '58贷款';
            request.get(url).then(
                (data) => {
                    if (data.error_no === 0) {
                        this.pageTransfer(data.result.redirectUrl, title);
                    } else if (data.error_no === -1 && data.error_msg === '用户未登录!') {
                        window.location.reload(); // 未登录直接刷新页面，交由后端处理
                    } else {
                        var _newState = Object.assign({}, this.state);
                        _newState.showState = true;
                        this.setState(_newState);
                        // __self.addClass('places-full');
                        // __self.removeClass('app_page_load');
                    }
                }
            )
        }
    }
    pageTransfer(url, title) {
        if (this.props.isApp) {
            var _url = this.fomatLoadUrl(url);
            window.WBAPP && window.WBAPP._nativeBridge({
                action: 'pagetrans',
                tradeline: 'core',
                content: {
                    pagetype: 'link',
                    url: _url,
                    title: title
                }
            });

        } else {
            window.location.href = url;
        }
    }
    /**
 * app下页面跳转之前对url进行处理
 * 因为不带协议的话跳转会失败
 */
    fomatLoadUrl(url) {
        var _origin = window.location.origin;
        var _protocol = window.location.protocol;
        if (url.indexOf('//') === 0) {
            return _protocol + ':' + url;
        } else if (url.indexOf('http:') !== 0 && url.indexOf('https:') !== 0) {
            return _origin + url;
        }
        return url;
    }
    render() {
        const { children } = this.props;
        return (
            <div className="lm-ui-cells" onClick={this.wrapperClick}>
                {children ? children : null}
            </div>
        );
    }
}