import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './CookieNotice.scss';

class CookieNotice extends Component {
  static handleDismissEnd() {
    if (localStorage) {
      localStorage.setItem('noticeDelivered', true);
    }
  }

  constructor(props) {
    super(props);
    this.handleDismiss = this.handleDismiss.bind(this);

    this.state = {
      dismissing: false,
    };
  }

  handleDismiss() {
    this.setState({
      dismissing: true,
    });
  }

  render() {
    const { dismissing } = this.state;

    return (
      <div
        className={`${styles.notice}${dismissing ? ` ${styles['notice--fade']}` : ''}`}
        onTransitionEnd={this.constructor.handleDismissEnd}
      >
        <button
          onClick={this.handleDismiss}
          className={styles.notice__dismiss}
        >
          <i className="material-icons">close</i>
        </button>
        This website uses Google Analytics (cookies) in order to collect anonymous usage data. You can find out more about these cookies in my <Link to="/privacy" className={styles.notice__link}>privacy policy.</Link>

      </div>
    );
  }
}

export default CookieNotice;
