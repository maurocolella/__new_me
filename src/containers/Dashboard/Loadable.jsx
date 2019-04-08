import React, { Component } from 'react';

export default class Loadable extends Component {
  componentWillMount = () => {
    import('./Dashboard.jsx').then((component) => {
      this.Component = component;
      this.forceUpdate();
    });
  }

  render = () => (
    this.Component ? <this.Component.default /> : null
  )
}
