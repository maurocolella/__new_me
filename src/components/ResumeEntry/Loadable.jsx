import React, { Component } from 'react';

export default class Loadable extends Component {
  componentWillMount() {
    import('./ResumeEntry.jsx').then((component) => {
      this.Component = component;
      this.forceUpdate();
    });
  }
  render() {
    return this.Component ? <this.Component.default {...this.props} /> : null;
  }
}
