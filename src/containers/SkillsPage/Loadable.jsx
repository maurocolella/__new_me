import React, { Component } from 'react';
import Loader from '../../components/Loader';
import styles from '../../assets/styles/page.scss';

export default class Loadable extends Component {
  componentDidMount = () => {
    import('./SkillsPage.jsx').then((component) => {
      this.Component = component;
      this.forceUpdate();
    });
  }

  render = () => (
    this.Component ? <this.Component.default /> : <Loader className={styles.page} />
  )
}
