import React, { Component } from 'react';
import GL from './GL.js';
import styles from './GLChart.scss';

export default class GLChart extends React.Component {
	constructor(props) {
		super(props);

		// this.initGL = this.initGL.bind(this);
		this.detectGL = this.detectGL.bind(this);

		this.state = {
			GLContext: new GL(),
			data: [
				{
					name: 'Node.js',
					value: 0.8,
				},
				{
					name: 'CSS',
					value: 0.95,
				},
				{
					name: 'PHP',
					value: 0.85,
				},
				{
					name: 'd3',
					value: 0.8,
				},
				{
					name: 'WordPress',
					value: 0.85,
				},
				{
					name: 'Symfony',
					value: 0.7,
				},
				{
					name: 'Laravel',
					value: 0.8,
				},
				{
					name: 'Javascript',
					value: 0.9,
				},
				{
					name: 'HTML',
					value: 0.98,
				},
				{
					name: 'React',
					value: 0.8,
				},
				{
					name: 'Java',
					value: 0.7,
				},
				{
					name: 'WebGL',
					value: 0.8,
				},
				{
					name: 'OpenGL',
					value: 0.85,
				},
			]
		};
	}

	componentWillUnmount() {
		this.state.GLContext.teardown();
	}

	componentWillReceiveProps(nextProps) {
		if(nextProps.data.toString() !== this.props.data.toString()){
			this.state.GLContext.teardown();
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
					<div className={styles.viewport} style={this.props.style}>
						<canvas ref={(canvas) => { this.canvas = canvas; }} className={styles.gl} />
					</div>
					:
				<div></div>
			);
	}
}
