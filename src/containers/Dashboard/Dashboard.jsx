import React, { PureComponent, Suspense } from 'react';
import {
  Route,
  Switch,
} from 'react-router-dom';
import Particles from 'react-particles-js';

import Loader from '../../components/Loader';
import Header from '../../components/Header';
import ResumePage from '../ResumePage';
import WorkPage from '../WorkPage';
import ContentPage from '../ContentPage';
import NotFoundPage from '../NotFoundPage';
import Footer from '../../components/Footer';

import styles from './Dashboard.scss';

const SkillsPage = React.lazy(() => import('../SkillsPage'));

class Dashboard extends PureComponent {
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
        <Particles
          key={key}
          className={styles.wrapper__particles}
          params={particleOptions}
        />
        <Header />
        <section className={styles.wrapper__content}>
          <Suspense fallback={<Loader />}>
            <Switch>
              <Route exact path="/skills" component={SkillsPage} />
              <Route exact path="/work" component={WorkPage} />
              <Route exact path="/resume" component={ResumePage} />
              <Route exact path="/:slug?" component={ContentPage} />
              <Route component={NotFoundPage} />
            </Switch>
          </Suspense>
          <Footer />
        </section>
      </div>
    );
  }
}

export default Dashboard;
