import React, { PureComponent } from 'react';
import ReactGA from 'react-ga';
import OracleAssociateImg from '../../../assets/images/oracle-certified-associate-java-se-8-programmer.png';

import styles from '../styles.scss';

class OracleAssociateBadge extends PureComponent {
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
        href="https://www.youracclaim.com/badges/82b8a687-2958-4e07-b34d-9fae29eb9a62/public_url"
        onClick={this.popup}
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          src={OracleAssociateImg}
          alt="Oracle Certified Associate, Java SE 8 Programmer"
          className={styles.badge}
        />
      </a>
    );
  }
}

export default OracleAssociateBadge;
