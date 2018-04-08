import React from 'react'
// import { Link } from 'react-router'
import './FooterBar.scss';

const FooterBar = (props) => {

	var getClass = function (item) {
		return 'lm-ui-footer-nav-item flex-item item-' + item + (props.active === item ? ' active' : '');
	};

	return (
		<footer className="lm-ui-footer-nav lm-ui-flex-box">
			<a href="/index?ddl=true" className={ getClass('index') }>
				<em>贷款</em>
			</a>
			<a href="/vip" className={ getClass('vip') }>
				<em>VIP会员</em>
			</a>
			<a href="/find" className={ getClass('find') }>
				<em style={{"position":"relative"}}>
					<span className="red-dot"></span>发现
				</em>
			</a>
			<a href="/center" className={ getClass('center') }>
				<em>我的</em>
			</a>
		</footer>

    )
};

export default FooterBar