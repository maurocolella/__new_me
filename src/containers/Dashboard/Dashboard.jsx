import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import styles from './Dashboard.scss';

import Header from '../../components/Header';
import ContentPage from '../ContentPage';
import SkillsPage from '../SkillsPage';
import LazyPage from '../LazyPage';
import Footer from '../../components/Footer';

export default class Dashboard extends Component {
  render() {
    return (
      <div className={styles.wrapper}>
        <Header />
        <Switch>
          <Route exact path="/skills" component={SkillsPage} />
          <Route exact path="/resume" component={LazyPage} />
          <Route exact path="/:slug?" component={ContentPage} />
        </Switch>
        <Footer />
      </div>
    );
  }
}
