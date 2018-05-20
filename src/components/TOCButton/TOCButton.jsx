import React, { Component } from 'react';
import smoothscroll from 'smoothscroll-polyfill';
import ScrollUpIcon from '../Icons/ScrollUpIcon';
import styles from './TOCButton.scss';

smoothscroll.polyfill();

export default class TOCButton extends Component {
  static scrollToTop(event) {
    event.preventDefault();

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }

  constructor(props) {
    super(props);
    this.handleScroll = this.handleScroll.bind(this);

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

  handleScroll() {
    const { display } = this.state;
    const scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
    const scrolled = scrollTop !== 0;

    if (scrolled !== display) {
      this.setState({
        display: scrolled,
      });
    }
  }

  render() {
    const { display } = this.state;

    return (
      <div
        className={`${styles.button}${display ? ` ${styles['button--visible']}` : ''}`}
      >
        <button
          className={styles.button__button}
          onClick={this.constructor.scrollToTop}
        >
          <ScrollUpIcon className={styles.button__icon} />
        </button>
      </div>
    );
  }
}
