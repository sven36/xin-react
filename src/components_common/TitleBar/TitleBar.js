import React from 'react'
import './TitleBar.scss'

export default function TitleBar(props) {
    var classnames=props.className ? 'lm-ui-cells-title '+props.className:'lm-ui-cells-title';
    return (
        <h3 className={classnames} style={props.style}>{props.title}</h3>
    )
}