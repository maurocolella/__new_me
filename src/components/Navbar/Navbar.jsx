import React, { PureComponent } from 'react';

import NavItem from '../NavItem';
import ProgressIndicator from '../ProgressIndicator';

import styles from './Navbar.scss';

class Navbar extends PureComponent {
  static getComputedStyle(el, prop) {
    const { getComputedStyle } = window;

    // In one fell swoop
    return (
      // If we have getComputedStyle
      getComputedStyle
        // Query it
        // TODO: From CSS-Query notes, we might need (node, null) for FF
        ? getComputedStyle(el)

        // Otherwise, we are in IE and use currentStyle
        : el.currentStyle
    )[
      // Switch to camelCase for CSSOM
      // DEV: Grabbed from jQuery
      // https://github.com/jquery/jquery/blob/1.9-stable/src/css.js#L191-L194
      // https://github.com/jquery/jquery/blob/1.9-stable/src/core.js#L593-L597
      prop.replace(/-(\w)/gi, (word, letter) => {
        letter.toUpperCase();
      })
    ];
  }

  constructor(props) {
    super(props);
    this.navbar = React.createRef();
    this.posIndicator = React.createRef();

    this.state = {
      sticky: false,
      top: 0,
      indicatorLeft: 0,
      indicatorWidth: 0,
      indicatorVisible: false,
    };
  }

  componentDidMount() {
    const navActiveRef = this.navbar.current;
    window.addEventListener('scroll', this.handleScroll);
    window.addEventListener('resize', this.handleResize);
    this.setState({
      top: parseInt(this.constructor.getComputedStyle(this.navbar.current, 'top'), 10),
      indicatorWidth: (navActiveRef && navActiveRef.offsetWidth) / 4,
    });
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
    window.removeEventListener('resize', this.handleResize);
  }

  handleScroll = () => {
    const { sticky, top } = this.state;

    const scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
    const clientRect = this.navbar.current.getBoundingClientRect();
    const isOffScreen = scrollTop > top && clientRect.top < 0;

    if (scrollTop <= top && sticky) {
      this.setState({
        sticky: false,
      });
      return;
    }

    if (isOffScreen && !sticky) {
      this.setState({
        sticky: true,
      });
    }
  }

  handleResize = () => {
    const navActiveRef = this.navbar.current;
    this.setState({
      indicatorWidth: (navActiveRef && navActiveRef.offsetWidth) / 4,
    });
  }

  handleMouseOver = (event) => {
    const navActiveRef = this.navbar.current;
    this.setState({
      indicatorLeft: event.currentTarget.offsetLeft,
      indicatorWidth: (navActiveRef && navActiveRef.offsetWidth) / 4,
      indicatorVisible: true,
    });
  }

  handleMouseOut = () => {
    this.setState({
      indicatorVisible: false,
    });
  }

  render() {
    const {
      sticky,
      indicatorLeft,
      indicatorWidth,
      indicatorVisible,
    } = this.state;

    return (
      <nav
        className={`${styles.navbar}${sticky ? ` ${styles['navbar--sticky']}` : ''}`}
        ref={this.navbar}
        onMouseLeave={this.handleMouseOut}
        onBlur={this.handleMouseOut}
      >
        <ProgressIndicator />
        <ul className={`${styles.nav}${sticky ? ` ${styles['nav--sticky']}` : ''}`}>
          <li
            className={styles.nav__item}
            onMouseOver={this.handleMouseOver}
            onFocus={this.handleMouseOver}
          >
            <NavItem
              activeClassName={styles['nav__link--active']}
              className={`${styles.nav__link}${sticky ? ` ${styles['nav__link--sticky']}` : ''}`}
              to="/about"
              hoverClassName={styles['nav__link--hover']}
            >
              <i
                className={`material-icons ${styles.nav__icon} ${styles['nav__icon--person']}`}
              />
              <span className={styles.nav__label}>About</span>
            </NavItem>
          </li>
          <li
            className={styles.nav__item}
            onMouseOver={this.handleMouseOver}
            onFocus={this.handleMouseOver}
          >
            <NavItem
              activeClassName={styles['nav__link--active']}
              className={`${styles.nav__link}${sticky ? ` ${styles['nav__link--sticky']}` : ''}`}
              to="/skills"
              hoverClassName={styles['nav__link--hover']}
            >
              <i
                className={`material-icons ${styles.nav__icon} ${styles['nav__icon--phonelink']}`}
              />
              <span className={styles.nav__label}>Skills</span>
            </NavItem>
          </li>
          <li
            className={styles.nav__item}
            onMouseOver={this.handleMouseOver}
            onFocus={this.handleMouseOver}
          >
            <NavItem
              activeClassName={styles['nav__link--active']}
              className={`${styles.nav__link}${sticky ? ` ${styles['nav__link--sticky']}` : ''}`}
              to="/work"
              hoverClassName={styles['nav__link--hover']}
            >
              <i
                className={`material-icons ${styles.nav__icon} ${styles['nav__icon--business']}`}
              />
              <span className={styles.nav__label}>Work</span>
            </NavItem>
          </li>
          <li
            className={styles.nav__item}
            onMouseOver={this.handleMouseOver}
            onFocus={this.handleMouseOver}
          >
            <NavItem
              activeClassName={styles['nav__link--active']}
              className={`${styles.nav__link}${sticky ? ` ${styles['nav__link--sticky']}` : ''}`}
              to="/resume"
              hoverClassName={styles['nav__link--hover']}
            >
              <i
                className={`material-icons ${styles.nav__icon} ${styles['nav__icon--reorder']}`}
              />
              <span className={styles.nav__label}>Resume</span>
            </NavItem>
          </li>
          <span
            className={styles.nav__indicator}
            style={{
              width: indicatorWidth,
              left: indicatorLeft,
              height: indicatorVisible ? '3px' : 0,
            }}
          />
        </ul>
      </nav>
    );
  }
}

export default Navbar;
