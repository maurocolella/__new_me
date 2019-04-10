import React, { PureComponent } from 'react';
import smoothscroll from 'smoothscroll-polyfill';
import 'picturefill';
import ReactGA from 'react-ga';

import SunIcon from '../Icons/SunIcon';
// eslint-disable-next-line import/no-unresolved
import coverImage from '../../assets/images/blue-peaks.jpg?sizes[]=480,sizes[]=640,sizes[]=800,sizes[]=1280,sizes[]=1600';

import styles from './Header.scss';

smoothscroll.polyfill();

class Header extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      scrollOffset: 0,
      parallaxSpeed: 0.05,
    };
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll = () => {
    const { scrollOffset } = this.state;
    const scrollTop = document.body.scrollTop || document.documentElement.scrollTop;

    if (scrollTop !== scrollOffset) {
      this.setState({
        scrollOffset: scrollTop,
      });
    }
  }

  handleScrollToTarget = (event) => {
    event.preventDefault();
    const target = event.target.getAttribute('href');

    ReactGA.event({
      category: 'Click',
      action: 'Header',
      label: 'Hire Me',
    });

    document.querySelector(target).scrollIntoView({
      behavior: 'smooth',
    });
  }


  render() {
    const { scrollOffset, parallaxSpeed } = this.state;

    return (
      <header
        className={styles.header}
      >
        <img
          className={styles.coverImage}
          src={coverImage.src}
          srcSet={coverImage.srcSet}
          alt=""
          style={{
            transform: `translate3d(-50%,-${50 - (scrollOffset * parallaxSpeed)}%,0)`,
          }}
        />
        <section className={styles.cover}>
          <h1 className={styles.cover__title}>Mauro Colella</h1>
          <a href="#footer" onClick={this.handleScrollToTarget} className={styles.hireme}>
            Hire Me
            {' '}
            <SunIcon className={styles.hireme__icon} />
          </a>
        </section>
      </header>
    );
  }
}

export default Header;
