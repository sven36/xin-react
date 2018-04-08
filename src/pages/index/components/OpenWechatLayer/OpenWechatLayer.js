import React from 'react';
import './OpenWechatLayer.scss';
import img from './img/open-wechat.png';

export default function OpenWechatLayer(props) {
    return (
        <div className="open-app-content">
            <p>微信搜索并关注<span>“58金融会员”<span>,</span></span></p>
            <p>微信公众号,可实时接收新机构</p><p>以及优惠活动提醒</p>
            <img src={img} width="100%" height="auto" alt="微信搜索并关注58金融会员" />
        </div>
    );
}
