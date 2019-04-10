import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';

import styles from './CookieNotice.scss';

class CookieNotice extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      dismissing: false,
    };
  }

  handleDismiss = () => {
    this.setState({
      dismissing: true,
    });
  }

  handleDismissEnd = () => {
    if (localStorage) {
      localStorage.setItem('noticeDelivered', true);
    }
  }

  render() {
    const { dismissing } = this.state;

    return (
      <div
        className={`${styles.notice}${dismissing ? ` ${styles['notice--fade']}` : ''}`}
        onTransitionEnd={this.handleDismissEnd}
      >
        <button
          onClick={this.handleDismiss}
          className={styles.notice__dismiss}
          type="button"
        >
          <i className="material-icons">close</i>
        </button>
        This website uses Google Analytics in order to collect anonymous usage data.
        You can find out more in my
        {' '}
        <Link to="/privacy" className={styles.notice__link}>privacy policy.</Link>
        {' '}
        By using this website, you consent to the use of
        statistical information according to the privacy policy.
        <button
          onClick={this.handleDismiss}
          className={styles.notice__accept}
          type="button"
        >
          Accept
        </button>
      </div>
    );
  }
}

export default CookieNotice;
