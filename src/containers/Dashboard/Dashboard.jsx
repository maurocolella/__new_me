import React, { PureComponent } from 'react';
import {
  Route,
  Switch,
} from 'react-router-dom';
import Particles from 'react-particles-js';

import styles from './Dashboard.scss';

import Header from '../../components/Header';
import SkillsPage from '../SkillsPage';
import ResumePage from '../ResumePage';
import WorkPage from '../WorkPage';
import ContentPage from '../ContentPage';
import NotFoundPage from '../NotFoundPage';
import Footer from '../../components/Footer';

export default class Dashboard extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      key: 0,
      particleOptions: {
        particles: {
          color: {
            value: '#FEFEFE',
          },
          number: {
            value: 96,
          },
          line_linked: {
            color: '#DEDEDE',
          },
          move: {
            speed: 0.5,
          },
        },
      },
    };
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  handleResize = () => {
    this.setState({
      key: (Math.random() * 10000).toString(),
    });
  }

  render() {
    const { particleOptions, key } = this.state;

    return (
      <div className={styles.wrapper}>
        <Header />
        <Particles
          key={key}
          className={styles.wrapper__particles}
          params={particleOptions}
        />
        <section className={styles.wrapper__content}>
          <Switch>
            <Route exact path="/skills" component={SkillsPage} />
            <Route exact path="/work" component={WorkPage} />
            <Route exact path="/resume" component={ResumePage} />
            <Route exact path="/:slug?" component={ContentPage} />
            <Route component={NotFoundPage} />
          </Switch>
          <Footer />
        </section>
      </div>
    );
  }
}
