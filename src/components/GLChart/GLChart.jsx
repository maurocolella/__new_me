import React, { Component } from 'react';
import PropTypes from 'prop-types';
import GL from './GL';
import styles from './GLChart.scss';

export default class GLChart extends Component {
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
      GLContext: {},
      baseColor: 0x336699,
    };
  }

  componentWillMount() {
    this.setState({
      GLContext: new GL(),
    });
  }

  componentDidMount() {
    const { data } = this.props;
    const { GLContext, baseColor } = this.state;
    if (data.length) {
      GLContext.init(this.canvas, data, baseColor);
    }
  }

  componentWillReceiveProps(nextProps) {
    const { data } = this.props;
    const { GLContext, baseColor } = this.state;
    if (nextProps.data.length
        && nextProps.data.toString() !== data.toString()) {
      GLContext.init(this.canvas, nextProps.data, baseColor);
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
