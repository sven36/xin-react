import React from 'react';
import './JoinVipLayer.scss';

export default function JoinVipLayer(props) {
    return <div className="guide-content">
        <p className="guide-privilege">VIP会员专属特权</p>
        <div className="guide-list">
            <p className="guide-item guide-item-bank"></p>
            <p className="guide-item guide-item-org"></p>
            <p className="guide-item guide-item-service"></p>
            <p className="guide-item guide-item-list"></p>
            <p className="guide-item guide-item-monery"></p>
        </div>
    </div>
}