import React, { Component } from 'react';
import Loader from '../Loader';

export default class Loadable extends Component {
  componentDidMount() {
    import('./GLChart.jsx').then((component) => {
      this.Component = component;
      this.forceUpdate();
    });
  }

  render() {
    return this.Component ? <this.Component.default {...this.props} /> : <Loader />;
  }
}
