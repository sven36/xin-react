import React from 'react';
import './FilterBar.scss';

export default class FilterBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filterStyle: { display: 'none' },
            _barClass: '',
            _liClass: '',
            _toggle: 'hide',
            _initValue: this.props.initValue,
        }
        this.filterTrigger = this.filterTrigger.bind(this);
        this.itemTrigger = this.itemTrigger.bind(this);
        this.touchMove = this.touchMove.bind(this);
        this.bodyClick = this.bodyClick.bind(this);
    }
    touchMove(e) {
        e.preventDefault();
    }
    bodyClick(e) {
        e.preventDefault();
    }
    componentWillUnmount(){
        document.body.removeEventListener('touchmove', this.touchMove);
        document.body.removeEventListener('click', this.bodyClick);
    }

    filterTrigger(e) {
        //重复点击filter
        var _newState = Object.assign({}, this.state);
        if (this.state.filterStyle.display === 'block') {
            document.body.removeEventListener('touchmove', this.touchMove);
            document.body.removeEventListener('click', this.bodyClick);
            _newState.filterStyle = { top: '0', display: 'none' };
            _newState._barClass = 'selected';
            this.setState(_newState);
            return;
        }
        //防止滚动穿透
        document.body.addEventListener('touchmove', this.touchMove);
        document.body.addEventListener('click', this.bodyClick);
        var _currentT = e.currentTarget;
        var _obj = _currentT.getBoundingClientRect();
        var _pos = {
            // left: _obj.left + window.pageXOffset,
            top: _obj.top + window.pageYOffset,
            // width: Math.round(_obj.width),
            height: Math.round(_obj.height)
        }
        var _filterTop = _pos.top + _pos.height - window.pageYOffset + 5;
        _newState.filterStyle = { top: _filterTop, display: 'block' };
        _newState._barClass = 'active';
        this.setState(_newState);
    }
    itemTrigger(e) {
        document.body.removeEventListener('touchmove', this.touchMove);
        document.body.removeEventListener('click', this.bodyClick);
        var _t = e.target;
        if (_t && _t.nodeName.toLowerCase() === 'a') {
            var _val = _t.textContent;
            var _newState = Object.assign({}, this.state);
            if (_newState._initValue !== _val) {
                _newState._initValue = _val;
                this.props.ajaxDate(_val);
            }
            _newState.filterStyle = { display: 'none' };
            _newState._barClass = 'selected';
            this.setState(_newState);
        } else {//如果点击的阴影 阻止就可以
            e.preventDefault();
        }
    }
    renderItem(t, i) {
        var item = <a href='javascript:;'>{t}</a>;
        return <li key={'t_$' + i} className={this.state._initValue !== t ? '' : 'active'}>
            {item}
        </li>;
    }
    render() {
        const { items = [] } = this.props;//children
        const _childs = items.map((t, i) => {
            return this.renderItem(t, i);
        });
        return (
            <div className="lm-ui-filter-origin" >
                <a href="javascript:;" className={this.state._barClass} onClick={this.filterTrigger}>
                    <em>{this.state._initValue}</em>
                    <i className="icon-filter"></i>
                </a>
                <div className="lm-ui-filter-layer" style={this.state.filterStyle} onClick={this.itemTrigger} onTouchMove={this.touchMove}>
                    <ul>
                        {_childs}
                    </ul>
                </div>
            </div>
        );
    }
}