import React from 'react';
import './Header.scss';
import {hashHistory} from 'react-router';

export default class Header extends React.Component {
    back = () => {
        if(this.props.back){
            this.props.back();
        }else{
           hashHistory.go(-1);
        }
    }
    
   onLeftClick = () => {
       if(!this.props.blankLeft){
           this.back();
       }
   }
    render() {
        return (
            <section className="lm-ui-top-nav">
                <a href="javascript:void(0);" onClick={this.onLeftClick}></a>
                <h1>{this.props.title}</h1>
            </section>
        );
    }
}