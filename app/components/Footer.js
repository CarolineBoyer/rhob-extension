import React, { Component } from 'react';
import classnames from 'classnames';
import style from './Footer.css';


export default class Footer extends Component {

  constructor(props, context) {
    super(props, context);
  }

  render() {
    return (
      <footer className={style.footer}>
      </footer>
    );
  }
}
