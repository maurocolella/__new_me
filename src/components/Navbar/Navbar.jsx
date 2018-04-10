import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import styles from './Navbar.scss';

export default class Navbar extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <nav className={styles.navbar}>
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
