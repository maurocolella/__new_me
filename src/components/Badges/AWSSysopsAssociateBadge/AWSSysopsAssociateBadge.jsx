import React, { PureComponent } from 'react';
import ReactGA from 'react-ga';
import AWSSysopsAssociateImg from '../../../assets/images/AWS-Certified_Sysops-Administrator_Associate.png';

import styles from '../styles.scss';

class AWSSysopsAssociateBadge extends PureComponent {
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
        href="https://www.certmetrics.com/amazon/public/badge.aspx?i=3&t=c&d=2020-01-29&ci=AWS00594118"
        onClick={this.popup}
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          src={AWSSysopsAssociateImg}
          alt="AWS Certified Sysops Administrator Associate"
          className={styles.badge}
        />
      </a>
    );
  }
}

export default AWSSysopsAssociateBadge;
