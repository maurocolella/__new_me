import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import styles from './Navbar.scss';

export default class Navbar extends Component {
  static getComputedStyle(el, prop) {
    const { getComputedStyle } = window;

    // In one fell swoop
    return (
      // If we have getComputedStyle
      getComputedStyle ?
        // Query it
        // TODO: From CSS-Query notes, we might need (node, null) for FF
        getComputedStyle(el) :

        // Otherwise, we are in IE and use currentStyle
        el.currentStyle
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
    this.handleScroll = this.handleScroll.bind(this);
    this.navbar = React.createRef();

    this.state = {
      sticky: false,
      top: 0,
    };
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
    this.setState({ /* eslint-disable-line */
      top: parseInt(this.constructor.getComputedStyle(this.navbar.current, 'top'), 10),
    });
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll() {
    const { sticky, top } = this.state;

    const scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
    const clientRect = this.navbar.current.getBoundingClientRect();
    const isOffScreen = scrollTop > top && clientRect.top < 0;

    if (scrollTop <= top) {
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
        className={styles.navbar}
        ref={this.navbar}
        style={sticky ? { position: 'fixed', top: '0px' } : null}
      >
        <ul className={styles.nav}>
          <li className={styles.nav__item}>
            <NavLink
              activeClassName={styles['nav__link--active']}
              className={styles.nav__link}
              to="/about"
            >
              About
            </NavLink>
          </li>
          <li className={styles.nav__item}>
            <NavLink
              activeClassName={styles['nav__link--active']}
              className={styles.nav__link}
              to="/skills"
            >
              Skills
            </NavLink>
          </li>
          <li className={styles.nav__item}>
            <NavLink
              activeClassName={styles['nav__link--active']}
              className={styles.nav__link}
              to="/work"
            >
              Work
            </NavLink>
          </li>
          <li className={styles.nav__item}>
            <NavLink
              activeClassName={styles['nav__link--active']}
              className={styles.nav__link}
              to="/resume"
            >
              Resume
            </NavLink>
          </li>
        </ul>
      </nav>);
  }
}
