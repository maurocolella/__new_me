import React, { PureComponent } from 'react';
import ReactGA from 'react-ga';
import AWSDeveloperAssociateImg from '../../../assets/images/AWS-Certified_Developer_Associate.png';

import styles from '../styles.scss';

class AWSDeveloperAssociateBadge extends PureComponent {
  popup = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const url = event.currentTarget.getAttribute('href');
    const urlHash = btoa(url);

    const cookiesAccepted = localStorage ? localStorage.getItem('cookiesAccepted') : false;
    if (!cookiesAccepted) {
      return;
    }
    ReactGA.outboundLink(
      {
        label: url,
      },
      () => {},
    );

    window.open(url, urlHash);
  }

  render() {
    return (
      <a
        href="https://www.certmetrics.com/amazon/public/badge.aspx?i=2&t=c&d=2019-08-16&ci=AWS00594118"
        onClick={this.popup}
      >
        <img
          src={AWSDeveloperAssociateImg}
          alt="AWS Certified Developer Associate"
          className={styles.badge}
        />
      </a>
    );
  }
}

export default AWSDeveloperAssociateBadge;
