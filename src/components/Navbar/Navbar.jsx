import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import NavItem from '../NavItem';
import ProgressIndicator from '../ProgressIndicator';
import { withScrolling } from '../../lib/ScrollContext';

import styles from './Navbar.scss';

class Navbar extends PureComponent {
  static propTypes = {
    scrollTop: PropTypes.number.isRequired,
  };

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
      links: [
        { slug: 'about', icon: 'person' },
        { slug: 'resume', icon: 'reorder' },
      ],
    };
  }

  componentDidMount() {
    const { links } = this.state;
    const navActiveRef = this.navbar.current;
    window.addEventListener('resize', this.handleResize);
    this.timer = global.setInterval(this.handleScroll, 17);

    this.setState({
      top: parseInt(this.constructor.getComputedStyle(this.navbar.current, 'top'), 10),
      indicatorWidth: (navActiveRef && navActiveRef.offsetWidth) / links.length,
    });
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
    clearInterval(this.timer);
  }

  handleScroll = () => {
    const { scrollTop } = this.props;
    const { sticky, top } = this.state;

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
    const { links } = this.state;
    const navActiveRef = this.navbar.current;
    this.setState({
      indicatorWidth: (navActiveRef && navActiveRef.offsetWidth) / links.length,
    });
  }

  handleMouseOver = (event) => {
    const { links } = this.state;
    const navActiveRef = this.navbar.current;
    this.setState({
      indicatorLeft: event.currentTarget.offsetLeft,
      indicatorWidth: (navActiveRef && navActiveRef.offsetWidth) / links.length,
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
      links,
    } = this.state;

    return (
      <nav
        className={`${styles.navbar}${sticky ? ` ${styles['navbar--sticky']}` : ''}`}
        onMouseLeave={this.handleMouseOut}
        onBlur={this.handleMouseOut}
      >
        <ProgressIndicator />
        <ul className={`${styles.nav}${sticky ? ` ${styles['nav--sticky']}` : ''}`} ref={this.navbar}>
          {links.map(link => (
            <li
              className={styles.nav__item}
              onMouseOver={this.handleMouseOver}
              onFocus={this.handleMouseOver}
            >
              <NavItem
                activeClassName={styles['nav__link--active']}
                className={`${styles.nav__link}${sticky ? ` ${styles['nav__link--sticky']}` : ''}`}
                to={`/${link.slug}`}
                hoverClassName={styles['nav__link--hover']}
              >
                <i
                  className={`material-icons ${styles.nav__icon} ${styles[`nav__icon--${link.icon}`]}`}
                />
                <span className={styles.nav__label}>{link.slug.toUpperCase()}</span>
              </NavItem>
            </li>
          ))}
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

export default withScrolling(Navbar);
