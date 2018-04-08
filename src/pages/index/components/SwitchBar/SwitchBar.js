import React from 'react';
import './SwitchBar.scss';
import { Link } from 'react-router';

export default class SwitchBar extends React.Component {

    shouldComponentUpdate() {
        if (this.props.shouldComponentUpdate === false) {
            return false;
        } else {
            return true;
        }
    }

    renderTab(tab, index) {
        var item = null;
        if (tab.useLink) {
            item = <Link to={tab.path}>{tab.title}</Link>;
        } else if (tab.path) {
            item = <a href={tab.path}>{tab.title}</a>;
        }
        else {
            item = <span>{tab.title}</span>;
        }
        return <li key={`_tab${index}`} className={tab.className ? tab.className : ''} onClick={tab.onClick || null}>
            {item}
        </li>;
    }
    render() {
        const { className, tabs = [], } = this.props;
        const Tabs = tabs.map((tab, index) => {
            return this.renderTab(tab, index);
        });
        return (
                <ul className={`switch-bar ${className || ''}`}>
                    {Tabs}
                </ul>
        );
    }
}
