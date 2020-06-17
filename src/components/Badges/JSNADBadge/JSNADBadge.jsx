import React, { PureComponent } from 'react';
import ReactGA from 'react-ga';
import JSNADImg from '../../../assets/images/jsnad-openjs-node-js-application-developer.png';

import styles from '../styles.scss';

class JSNADBadge extends PureComponent {
  popup = (event) => {
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
      <a
        href="https://www.youracclaim.com/badges/7a04bd6f-3013-47b9-9cd9-96c8573fc86e/public_url"
        onClick={this.popup}
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          src={JSNADImg}
          alt="JSNAD: OpenJS Node.js Application Developer"
          className={styles.badge}
        />
      </a>
    );
  }
}

export default JSNADBadge;
