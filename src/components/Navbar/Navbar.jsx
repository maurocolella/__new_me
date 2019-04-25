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

    this.state = {
      sticky: false,
      top: 0,
    };
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
    this.setState({
      top: parseInt(this.constructor.getComputedStyle(this.navbar.current, 'top'), 10),
    });
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
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

  render() {
    const { sticky } = this.state;

    return (
      <nav
        className={`${styles.navbar}${sticky ? ` ${styles['navbar--sticky']}` : ''}`}
        ref={this.navbar}
      >
        <ProgressIndicator />
        <ul className={`${styles.nav}${sticky ? ` ${styles['nav--sticky']}` : ''}`}>
          <li className={styles.nav__item}>
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
          <li className={styles.nav__item}>
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
          <li className={styles.nav__item}>
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
          <li className={styles.nav__item}>
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
        </ul>
      </nav>
    );
  }
}

export default Navbar;
