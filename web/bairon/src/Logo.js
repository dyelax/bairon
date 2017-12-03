import React, { Component } from 'react';
import logo from './img/logo.svg';

class Logo extends Component {
  render() {
    return (
      <div className="Logo">
        <img alt="bairon" className="Logo-img" src={logo}/>
        <p className="Logo-slogan">ai poetry companion</p>
        <div className="Logo-gradient"></div>
      </div>
    );
  }
}

export default Logo;
