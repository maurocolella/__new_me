import React, { Component } from 'react';
import PropTypes from 'prop-types';

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
    const { data } = this.props;
    const { GLContext, baseColor } = this.state;
    if (data.length) {
      GLContext.init(this.canvas, data, baseColor);
    }
  }

  componentDidUpdate(prevProps) {
    const { data } = this.props;
    const { GLContext, baseColor } = this.state;
    if (data.length
        && data.toString() !== prevProps.data.toString()) {
      GLContext.init(this.canvas, data, baseColor);
    }
  }

  componentWillUnmount() {
    const { GLContext } = this.state;
    GLContext.teardown();
  }

  render() {
    const { className, style } = this.props;
    const { hasGL } = this.state;

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
