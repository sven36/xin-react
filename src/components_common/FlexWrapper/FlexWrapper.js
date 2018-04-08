import React from 'react';
import './FlexWrapper.scss';
import {FlexItem,FlexLink} from './FlexItem';

export default class FlexWrapper extends React.Component {
    static FlexItem=FlexItem;
    static FlexLink=FlexLink;

    shouldComponentUpdate() {
        if (this.props.shouldComponentUpdate === false) {
            return false;
        } else {
            return true;
        }
    }

    render() {
        const { children,className,onClick } = this.props;
        return (
            <div className={`flex-wrapper ${className || ''}`} onClick={onClick}>
                    {children ? children : null}
            </div>
        );
    }
}