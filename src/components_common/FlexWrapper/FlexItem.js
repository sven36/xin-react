import React from 'react';
import { Link } from 'react-router';

export class SubTitle extends React.Component {
	render() {
		return (
			<div className='wrapper-sub-title' style={this.props.style}>{this.props.children}</div>
		);
	}
}
export class FlexLink extends React.Component {
	static SubTitle = SubTitle;
	render() {
		const { children, path, className, style } = this.props;//extra
		return (
			<Link className={`wrapper-link ${className || ''}`} to={path} style={style ? style : null}>
				{children}
			</Link>
		);
	}

}

export class FlexItem extends React.Component {
	static SubTitle = SubTitle;
	render() {
		const { children, className, style } = this.props;//extra path
		return (
			<div className={className ? className : null} style={style ? style : null}>
				{children}
			</div>
		);
	}

}