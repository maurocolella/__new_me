import React, { Component } from 'react';
import smoothscroll from 'smoothscroll-polyfill';
import ReactGA from 'react-ga';

import ScrollUpIcon from '../Icons/ScrollUpIcon';

import styles from './TOCButton.scss';

smoothscroll.polyfill();

class TOCButton extends Component {
  constructor(props) {
    super(props);

    this.state = {
      display: false,
    };
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll = () => {
    const { display } = this.state;
    const scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
    const scrolled = scrollTop !== 0;

    if (scrolled !== display) {
      this.setState({
        display: scrolled,
      });
    }
  }

  handleScrollToTop = (event) => {
    event.preventDefault();

    ReactGA.event({
      category: 'Click',
      action: 'TOC',
      label: 'Top of Content',
    });

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
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

export default TOCButton;
