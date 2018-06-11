import React, { Component } from 'react';
import {
  Route,
  Switch,
} from 'react-router-dom';

import styles from './Dashboard.scss';

import Header from '../../components/Header';
import SkillsPage from '../SkillsPage';
import ResumePage from '../ResumePage';
import WorkPage from '../WorkPage';
import ContentPage from '../ContentPage';
import NotFoundPage from '../NotFoundPage';
import Footer from '../../components/Footer';

export default class Dashboard extends Component {
  render() {
    return (
      <div className={styles.wrapper}>
        <Header />
        <Switch>
          <Route exact path="/skills" component={SkillsPage} />
          <Route exact path="/work" component={WorkPage} />
          <Route exact path="/resume" component={ResumePage} />
          <Route exact path="/:slug?" component={ContentPage} />
          <Route component={NotFoundPage} />
        </Switch>
        <Footer />
      </div>
    );
  }
}
