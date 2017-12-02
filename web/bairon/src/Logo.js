import React, { Component } from 'react';
import logo from './img/logo.svg';

class Logo extends Component {
  render() {
    return (
      <div className="Logo">
        <img alt="bairon" className="Logo-img" src={logo}/>
        <p className="Logo-slogan">some catchy slogan</p>
        <div className="Logo-gradient"></div>
      </div>
    );
  }
}

export default Logo;
