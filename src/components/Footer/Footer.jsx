import React, { PureComponent } from 'react';

import styles from './Footer.scss';
import SunIcon from '../Icons/SunIcon';
import TOCButton from '../TOCButton';

export default class Footer extends PureComponent {
  render() {
    return (
      <footer id="footer" className={styles.footer}>
        <section className={styles.cover}>
          <a href="#footer" className={styles.hireme}>
            Hire Me <SunIcon className={styles.hireme__icon} />
          </a>
        </section>
        <TOCButton />
      </footer>
    );
  }
}
