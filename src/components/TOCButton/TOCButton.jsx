import React, { Component } from 'react';
import smoothscroll from 'smoothscroll-polyfill';
import ScrollUpIcon from '../Icons/ScrollUpIcon';

import styles from './TOCButton.scss';
smoothscroll.polyfill();

export default class TOCButton extends React.Component {

    constructor(props) {
        super(props);
        this.handleScroll = this.handleScroll.bind(this);
        this.scrollToTop = this.scrollToTop.bind(this);

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

    handleScroll(event) {
        const { display } = this.state;
        let scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
        const scrolled = scrollTop !== 0;

        if(scrolled != display){
            this.setState({
                    display: scrolled,
            });
        }
    }

    scrollToTop(event) {
        event.preventDefault();

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
                <a onClick={this.scrollToTop}>
                    <ScrollUpIcon className={styles.button__icon} />
                </a>
            </div>
        );
    }
}
