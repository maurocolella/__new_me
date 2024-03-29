import React, { PureComponent } from 'react';
import ReactGA from 'react-ga';
import { Link } from 'react-router-dom';
import moment from 'moment';

import SunIcon from '../Icons/SunIcon';
import TOCButton from '../TOCButton';
import TwitterIcon from '../Icons/Social/TwitterIcon';
import FacebookIcon from '../Icons/Social/FacebookIcon';
import LinkedinIcon from '../Icons/Social/LinkedinIcon';

import globalStyles from '../../assets/styles/page.scss';
import styles from './Footer.scss';

class Footer extends PureComponent {
  static popup(event) {
    event.preventDefault();
    event.stopPropagation();
    const url = event.currentTarget.getAttribute('href');
    const urlHash = btoa(url);

    const cookiesAccepted = localStorage ? localStorage.getItem('cookiesAccepted') : false;
    if (cookiesAccepted) {
      ReactGA.outboundLink(
        {
          label: url,
        },
        () => {},
      );
    }

    window.open(url, urlHash);
  }

  render() {
    return (
      <footer id="footer" className={styles.footer}>
        <section className={styles.cover}>
          <div className={styles.banner}>
            <ul
              className={`${globalStyles.flatList} ${styles.footnotes__group}`}
            >
              <li className={styles.footnotes__note}>
                <a
                  href="https://twitter.com/nvisionmedia"
                  className={styles.footnotes__link}
                  onClick={this.constructor.popup}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <TwitterIcon className={styles.footnotes__icon} />
                </a>
              </li>
              <li className={styles.footnotes__note}>
                <a
                  href="https://www.linkedin.com/in/mauro-colella-8783042/"
                  className={styles.footnotes__link}
                  onClick={this.constructor.popup}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <LinkedinIcon
                    className={styles.footnotes__icon}
                    style={{ width: '54px' }}
                  />
                </a>
              </li>
              <li className={styles.footnotes__note}>
                <a
                  href="https://www.facebook.com/nvisionweb/"
                  className={styles.footnotes__link}
                  onClick={this.constructor.popup}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FacebookIcon className={styles.footnotes__icon} />
                </a>
              </li>
            </ul>
            <ul
              className={`${globalStyles.flatList} ${styles.footnotes__group}`}
            >
              <li>
                <a
                  href="https://www.upwork.com/freelancers/~014e1ddeddccaea1da"
                  className={styles.hireme}
                  onClick={this.constructor.popup}
                >
                  Hire Me
                  {' '}
                  <SunIcon className={styles.hireme__icon} />
                </a>
              </li>
            </ul>
          </div>
          <div className={styles.footnotes}>
            <ul
              className={`${globalStyles.flatList} ${styles.footnotes__group}`}
            >
              <li className={styles.footnotes__note}>
                <small>
                  Copyright &copy; 2017-
                  {moment().year()}
                </small>
              </li>
            </ul>
            <ul
              className={`${globalStyles.flatList} ${styles.footnotes__group}`}
            >
              <li className={styles.footnotes__note}>
                <small>
                  <Link
                    to="/privacy"
                    className={styles.footnotes__link}
                  >
                    privacy
                  </Link>
                </small>
              </li>
              <li className={styles.footnotes__note}>
                <small>
                  <a
                    href="https://github.com/maurocolella/__new_me"
                    className={styles.footnotes__link}
                    onClick={this.constructor.popup}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    source code
                  </a>
                </small>
              </li>
              <li className={styles.footnotes__note}>
                <small>
                  <a
                    href="https://maurocolella.github.io/"
                    className={styles.footnotes__link}
                    onClick={this.constructor.popup}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    metrics
                  </a>
                </small>
              </li>
            </ul>
          </div>
        </section>
        <TOCButton />
      </footer>
    );
  }
}

export default Footer;
