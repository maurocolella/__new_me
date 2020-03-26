import React, { Component, Suspense } from 'react';
import PropTypes from 'prop-types';
import {
  Route,
  Switch,
} from 'react-router-dom';
import debounce from 'lodash/debounce';
import { withPerf } from '../../lib/PerfContext';

import Loader from '../../components/Loader';
import Header from '../../components/Header';
import ResumePage from '../ResumePage';
import WorkPage from '../WorkPage';
import ContentPage from '../ContentPage';
import NotFoundPage from '../NotFoundPage';
import Footer from '../../components/Footer';

import styles from './Dashboard.scss';

const Particles = React.lazy(() => import('react-particles-js'));
const SkillsPage = React.lazy(() => import('../SkillsPage'));

class Dashboard extends Component {
  handleResize = debounce(() => {
    this.setState({
      key: (Math.random() * 10000).toString(),
    });
  }, 200);

  static propTypes = {
    benchIsSlow: PropTypes.bool.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      key: 0,
      particleOptions: {
        particles: {
          number: {
            value: 48,
            density: {
              enable: true,
              value_area: 360,
            },
          },
          color: {
            value: '#FEFEFE',
          },
          line_linked: {
            color: '#DEDEDE',
            opacity: 0.6,
            width: 1,
          },
          move: {
            speed: 0.5,
          },
        },
        interactivity: {
          detect_on: 'window',
          events: {
            onhover: {
              enable: true,
              mode: 'grab',
            },
            onclick: {
              enable: false,
            },
            resize: true,
          },
        },
        retina_detect: true,
      },
    };
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  render() {
    const { particleOptions, key } = this.state;
    const { benchIsSlow } = this.props;

    return (
      <div className={styles.wrapper}>
        {
          !benchIsSlow
          && (
            <Suspense>
              <Particles
                key={key}
                className={styles.wrapper__particles}
                params={particleOptions}
              />
            </Suspense>
          )
        }
        <Header />
        <section className={styles.wrapper__content}>
          <Suspense fallback={<Loader />}>
            <Switch>
              <Route exact path="/skills/:selected?" component={SkillsPage} />
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

export default withPerf(Dashboard);
