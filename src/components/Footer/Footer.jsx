import React, { PureComponent } from 'react';
import ReactGA from 'react-ga';
import { Link } from 'react-router-dom';
import moment from 'moment';

import globalStyles from '../../assets/styles/page.scss';
import styles from './Footer.scss';
import SunIcon from '../Icons/SunIcon';
import TOCButton from '../TOCButton';
import TwitterIcon from '../Icons/Social/TwitterIcon';
import FacebookIcon from '../Icons/Social/FacebookIcon';
import LinkedinIcon from '../Icons/Social/LinkedinIcon';

export default class Footer extends PureComponent {
  static hash(val) {
    let hash = 0;
    let i = 0;
    let char = null;
    if (val.length === 0) return hash;
    for (i = 0; i < val.length; i += 1) {
      char = val.charCodeAt(i);
      hash = ((hash << 5) - hash) + char; /* eslint-disable-line */
      hash &= hash; /* eslint-disable-line */
    }
    return hash;
  }

  constructor(props) {
    super(props);
    this.popup = this.popup.bind(this);
  }

  popup(event) {
    event.preventDefault();
    event.stopPropagation();
    const url = event.currentTarget.getAttribute('href');
    const hash = this.constructor.hash(url);

    ReactGA.outboundLink(
      {
        label: url,
      },
      () => {},
    );

    window.open(url, hash);
  }

  render() {
    return (
      <footer id="footer" className={styles.footer}>
        <section className={styles.cover}>
          <div className={styles.banner}>
            <a
              href="https://www.upwork.com/freelancers/~014e1ddeddccaea1da"
              className={styles.hireme}
              onClick={this.popup}
            >
              Hire Me <SunIcon className={styles.hireme__icon} />
            </a>
          </div>
          <div className={styles.footnotes}>
            <ul
              className={`${globalStyles.flatList} ${styles.footnotes__group}`}
            >
              <li className={styles.footnotes__note}>
                <a
                  href="https://twitter.com/nvisionmedia"
                  className={styles.footnotes__link}
                  onClick={this.popup}
                >
                  <TwitterIcon className={styles.footnotes__icon} />
                </a>
              </li>
              <li className={styles.footnotes__note}>
                <a
                  href="https://www.linkedin.com/in/mauro-colella-8783042/"
                  className={styles.footnotes__link}
                  onClick={this.popup}
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
                  onClick={this.popup}
                >
                  <FacebookIcon className={styles.footnotes__icon} />
                </a>
              </li>
            </ul>
            <ul
              className={`${globalStyles.flatList} ${styles.footnotes__group}`}
            >
              <li className={styles.footnotes__note}>
                <small>
                  Copyright &copy; 2017-{moment().year()}
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
                    onClick={this.popup}
                  >
                    source code
                  </a>
                </small>
              </li>
              <li className={styles.footnotes__note}>
                <small>
                  <a
                    href="https://api.mauro-colella.com"
                    className={styles.footnotes__link}
                    onClick={this.popup}
                  >
                    api
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
