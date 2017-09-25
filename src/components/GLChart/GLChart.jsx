import React, { Component } from 'react';
import GL from './GL.js';
import styles from './GLChart.scss';

export default class GLChart extends React.Component {
	constructor(props) {
		super(props);

		this.detectGL = this.detectGL.bind(this);

		this.state = {
			GLContext: new GL()
		};
	}

	componentDidMount() {
		if(this.props.data.length){
			this.state.GLContext.init(this.canvas, this.props.data);
		}
	}

	componentWillUnmount() {
		this.state.GLContext.teardown();
	}

	componentWillReceiveProps(nextProps) {
		if(nextProps.data.toString() !== this.props.data.toString()){
			// this.state.GLContext.teardown();
			this.state.GLContext.init(this.canvas, nextProps.data);
		}
	}

	detectGL() {

		try {
			const canvas = document.createElement('canvas');
			const gl = (canvas.getContext('webgl') ||
						canvas.getContext('experimental-webgl'));

			return !! (window.WebGLRenderingContext && gl);
		}
		catch (e) {
			return false;
		}
	}

	render() {
		const hasGL = this.detectGL();
		return (
				hasGL ?
					<div className={`${styles.viewport} ${this.props.className}`} style={this.props.style}>
						<canvas ref={(canvas) => { this.canvas = canvas; }} className={styles.gl} />
					</div>
					:
				<div></div>
			);
	}
}
