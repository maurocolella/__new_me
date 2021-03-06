import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import smoothscroll from 'smoothscroll-polyfill';
import ReactGA from 'react-ga';
import { withScrolling } from '../../lib/ScrollContext';

import ScrollUpIcon from '../Icons/ScrollUpIcon';

import styles from './TOCButton.scss';

smoothscroll.polyfill();

class TOCButton extends PureComponent {
  static propTypes = {
    scrollTop: PropTypes.number.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      display: false,
    };
  }

  componentDidMount() {
    this.timer = setInterval(() => { this.updateDisplay(); }, 30);
  }

  updateDisplay = () => {
    const { display } = this.state;
    const { scrollTop } = this.props;
    const scrolled = scrollTop !== 0;

    if (scrolled !== display) {
      this.setState({
        display: scrolled,
      });
    }
  }

  handleScrollToTop = (event) => {
    event.preventDefault();

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });

    const cookiesAccepted = localStorage ? localStorage.getItem('cookiesAccepted') : false;
    if (!cookiesAccepted) {
      return;
    }
    ReactGA.event({
      category: 'Click',
      action: 'TOC',
      label: 'Top of Content',
    });
  }

  render() {
    const { display } = this.state;

    return (
      <div
        className={`${styles.button}${display ? ` ${styles['button--visible']}` : ''}`}
      >
        <button
          className={styles.button__button}
          onClick={this.handleScrollToTop}
          type="button"
        >
          <ScrollUpIcon className={styles.button__icon} />
        </button>
      </div>
    );
  }
}

export default withScrolling(TOCButton);
