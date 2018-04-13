import React from 'react';
import Item from './ListItem';
import './List.scss';

export default class List extends React.Component {
    static Item = Item;
    constructor(props) {
        super(props);
        this.state = {
            showState: false
        }
    }
    wrapperClick(e) {
        e.preventDefault();
    }

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