import React, { PureComponent } from 'react';
import ReactGA from 'react-ga';
import AWSArchitectAssociateImg from '../../../assets/images/AWS-Certified_Solutions-Architect_Associate.png';

import styles from '../styles.scss';

class AWSArchitectAssociateBadge extends PureComponent {
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
        href="https://www.certmetrics.com/amazon/public/badge.aspx?i=1&t=c&d=2019-09-02&ci=AWS00594118"
        onClick={this.popup}
      >
        <img
          src={AWSArchitectAssociateImg}
          alt="AWS Certified Solutions Architect Associate"
          className={styles.badge}
        />
      </a>
    );
  }
}

export default AWSArchitectAssociateBadge;
