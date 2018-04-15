import React, { Component } from 'react';
import PropTypes from 'prop-types';
import GL from './GL';
import styles from './GLChart.scss';

export default class GLChart extends Component {
  static detectGL() {
    try {
      const canvas = document.createElement('canvas');
      const gl = (canvas.getContext('webgl') ||
                  canvas.getContext('experimental-webgl'));

      return !!(window.WebGLRenderingContext && gl);
    } catch (e) {
      return false;
    }
  }

  static propTypes = {
    data: PropTypes.arrayOf(Object),
    className: PropTypes.string,
    style: PropTypes.shape,
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
    if (this.props.data.length) {
      this.state.GLContext.init(this.canvas, this.props.data, this.state.baseColor);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.data.length &&
        nextProps.data.toString() !== this.props.data.toString()) {
      this.state.GLContext.init(this.canvas, nextProps.data, this.state.baseColor);
    }
  }

  componentWillUnmount() {
    this.state.GLContext.teardown();
  }

  render() {
    const { hasGL } = this.state;

    return (
      hasGL ?
        <div
          className={`${styles.viewport} ${this.props.className}`}
          style={this.props.style}
        >
          <canvas
            ref={(canvas) => { this.canvas = canvas; }}
            className={styles.gl}
          />
        </div>
        :
        <div />
    );
  }
}
