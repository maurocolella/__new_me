import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Loader from '../Loader';
import GL from './GL';

import styles from './GLChart.scss';

class GLChart extends Component {
  static detectGL() {
    try {
      const canvas = document.createElement('canvas');
      const gl = (canvas.getContext('webgl')
                  || canvas.getContext('experimental-webgl'));

      return !!(window.WebGLRenderingContext && gl);
    } catch (e) {
      return false;
    }
  }

  static propTypes = {
    data: PropTypes.arrayOf(Object),
    className: PropTypes.string,
    style: PropTypes.shape({}),
  };

  static defaultProps = {
    data: [],
    className: '',
    style: {},
  };

  constructor(props) {
    super(props);

    this.state = {
      hasGL: this.constructor.detectGL(),
      GLContext: new GL(),
      baseColor: 0x666666,
    };
  }

  componentDidMount() {
    this.updateDataset();
  }

  componentDidUpdate(prevProps) {
    const { data } = this.props;
    if (data.toString() !== prevProps.data.toString()) {
      this.updateDataset();
    }
  }

  componentWillUnmount() {
    const { GLContext } = this.state;
    GLContext.teardown();
  }

  updateDataset = () => {
    const { data } = this.props;

    if (data.length) {
      const { GLContext, baseColor } = this.state;

      if (window.requestIdleCallback) {
        window.requestIdleCallback(() => {
          GLContext.init(this.canvas, data, baseColor);
        },
        {
          timeout: 800,
        });
      } else {
        GLContext.init(this.canvas, data, baseColor);
      }
    }
  }

  render() {
    const { className, style, data } = this.props;
    const { hasGL } = this.state;

    if (!data.length) {
      return (<Loader />);
    }

    return (
      hasGL
        ? (
          <div
            className={`${styles.viewport} ${className}`}
            style={style}
          >
            <canvas
              ref={(canvas) => { this.canvas = canvas; }}
              className={styles.gl}
            />
          </div>
        )
        : <div />
    );
  }
}

export default GLChart;
