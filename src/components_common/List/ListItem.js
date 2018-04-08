import React from 'react';
// import { Link } from 'react-router';

export class Brief extends React.Component{
    render() {
      return (
        <div className="lm-ui-desc-detail" style={this.props.style}>{this.props.children}</div>
      );
    }
  }

export default class ListItem extends React.Component {
    static Brief = Brief;
    render() {
        const { children, thumb, arrow, path, extra, title} = this.props;//activeStyle disabled
        return (
            <a href={path ? path : 'javascript:;'} className="lm-ui-cell" title={title}>
                {thumb ? <span className="lm-ui-cell-hd">
                    {typeof thumb === 'string' ? <img className="lm-ui-desc-header" alt={title} src={thumb} /> : thumb}
                </span> : null}
                <div className="lm-ui-cell-bd">
                    {children}
                </div>
                {extra && <div className="lm-ui-cell-ft"><span>{extra}</span></div>}
                {arrow && <div className="lm-ui-cell-ft"><i className={'lm-ui-icon-arrow-' + arrow}></i></div>}
            </a>
        );
    }
}