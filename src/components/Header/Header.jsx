import React, { Component } from 'react';
import smoothscroll from 'smoothscroll-polyfill';
import SunIcon from '../Icons/SunIcon';

import styles from './Header.scss';
smoothscroll.polyfill();

export default class Header extends React.Component {
    constructor(props) {
        super(props);

        this.scrollTo = this.scrollTo.bind(this);
    }

    scrollTo(event) {
        event.preventDefault();
        const target = event.target.getAttribute('href');

        document.querySelector(target).scrollIntoView({
            behavior: 'smooth'
        });
    }

    render() {
        return (
            <header className={styles.header}>
                <section className={styles.cover}>
                    <h1 className={styles.cover__title}>Mauro Colella</h1>
                    <a href="#footer" onClick={this.scrollTo} className={styles.hireme}>
                        Hire Me <SunIcon className={styles.hireme__icon} />
                    </a>
                </section>
            </header>
        );
    }
}
