import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Loader from '../Loader';

export default class Loadable extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
    cover: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
  };

  componentDidMount() {
    import('./WorkItem.jsx').then((module) => {
      const { cover } = this.props;
      this.Component = module;

      if (cover) {
        this.loadImage(cover).then(() => {
          if (!this.lock) {
            this.forceUpdate();
          }
        });
      }
    });
  }

  componentWillUnmount() {
    this.lock = true;
  }

  loadImage = url => new Promise((resolve, reject) => {
    const img = new Image();
    img.addEventListener('load', () => {
      resolve(img);
    });
    img.addEventListener('error', () => {
      reject(new Error(`Failed to load image's URL: ${url}`));
    });
    img.src = url;
  });

  render() {
    return this.Component ? (<this.Component.default {...this.props} />) : (<Loader />);
  }
}
