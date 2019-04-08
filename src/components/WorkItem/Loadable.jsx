import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Loader from '../Loader';

export default class Loadable extends Component {
  static loadImage(url) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.addEventListener('load', () => { resolve(img); });
      img.addEventListener('error', () => {
        reject(new Error(`Failed to load image's URL: ${url}`));
      });
      img.src = url;
    });
  }

  static propTypes = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
    cover: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
  };

  componentWillMount() {
    import('./WorkItem.jsx').then((component) => {
      this.Component = component;

      if (this.props.cover) {
        this.constructor.loadImage(this.props.cover).then(() => {
          this.forceUpdate();
        });
      } else {
        this.forceUpdate();
      }
    });
  }


  render() {
    return this.Component ? <this.Component.default {...this.props} /> : <Loader />;
  }
}
