import React, { PureComponent } from 'react';
import smoothscroll from 'smoothscroll-polyfill';
import 'picturefill';
import ReactGA from 'react-ga';

import SunIcon from '../Icons/SunIcon';

import styles from './Header.scss';

smoothscroll.polyfill();

class Header extends PureComponent {
  handleScrollToTarget = (event) => {
    event.preventDefault();
    const target = event.target.getAttribute('href');

    ReactGA.event({
      category: 'Click',
      action: 'Header',
      label: 'Hire Me',
    });

    document.querySelector(target).scrollIntoView({
      behavior: 'smooth',
    });
  }

  render() {
    return (
      <header
        className={styles.header}
      >
        <section className={styles.cover}>
          <h1 className={styles.cover__title}>Mauro Colella</h1>
          <a href="#footer" onClick={this.handleScrollToTarget} className={styles.hireme}>
            Hire Me
            {' '}
            <SunIcon className={styles.hireme__icon} />
          </a>
        </section>
      </header>
    );
  }
}

export default Header;
