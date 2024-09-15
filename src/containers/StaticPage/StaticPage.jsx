import React, { Component } from 'react';
import ReactRouterPropTypes from 'react-router-prop-types';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';

import Loader from '../../components/Loader';

import styles from '../../assets/styles/page.scss';

class StaticPage extends Component {
  render() {

    const updatedAt = new Date(2022, 4, 8, 15, 31, 0, 0);

    return (
      <main className={styles.page}>
        <header className={styles.page__header}>
          <small className={styles.lastModified}>
            Last modified:
            {' '}
            {moment(updatedAt).format('LL')}
          </small>
          <h2 className={styles.page__title}>About Me</h2>
        </header>
        <article>
          <p>Hi, my name is Mauro Colella. I am a senior software developer with twenty years of activity in the IT industry. I develop great websites for great companies that offer great services.</p>
          <p>I specialize in web applications and full-stack development, as well as user experience. From DevOps to responsive interfaces and tailored, well-optimized data visualizations, I am fluent with a broad range of technologies for the Internet.</p>
          <br />
          <p>I have been successfully freelancing my services for the last fifteen years, with a strong focus on customer needs in both the business and the market.</p>
          <br />
          <p>I am European, I trained in Switzerland, and I have resided in Asia for the last few years.</p>
          <br />
          <p>When I am not in front of the computer, my interests range from being a dad to learning about art, motion graphics, architecture and much more.</p>
          <p>For me, command of information technology is a means to empower people to share and access information. It is first and foremost a means to enable and facilitate intercommunication.</p>
          <br />
          <p>I'd like to welcome you to my abode. I hope you enjoy your visit, and I am looking forward to developing for you a platform that enables you to truly achieve and exceed every one of your professional targets and ambitions.</p>
          <p>It sounds simple but this is what I do.</p>
          <br />
          <p>I make it simple. For you.</p>
        </article>
      </main>
    );
  }
}

export default StaticPage;
