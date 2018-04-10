import React, { Component } from 'react';

export default class LoadablePage extends Component {
  componentWillMount = () => {
    import('./SkillsPage.jsx').then((component) => {
      this.Component = component;
      this.forceUpdate();
    });
  }
  render = () => (
    this.Component ? <this.Component.default /> : null
  )
}
