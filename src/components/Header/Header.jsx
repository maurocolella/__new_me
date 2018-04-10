import React, { Component } from 'react';
import smoothscroll from 'smoothscroll-polyfill';
import SunIcon from '../Icons/SunIcon';
import styles from './Header.scss';
import coverImage from '../../assets/images/blue-peaks.jpg?sizes[]=480,sizes[]=640,sizes[]=800,sizes=1280';

smoothscroll.polyfill();

export default class Header extends Component {
  static scrollTo(event) {
    event.preventDefault();
    const target = event.target.getAttribute('href');

    document.querySelector(target).scrollIntoView({
      behavior: 'smooth',
    });
  }

  render() {
    return (
      <header
        className={styles.header}
      >
        <img
          className={styles.coverImage}
          src={coverImage.src}
          srcSet={coverImage.srcSet}
          alt=""
        />
        <section className={styles.cover}>
          <h1 className={styles.cover__title}>Mauro Colella</h1>
          <a href="#footer" onClick={this.constructor.scrollTo} className={styles.hireme}>
            Hire Me <SunIcon className={styles.hireme__icon} />
          </a>
        </section>
      </header>
    );
  }
}
