import React, { Component } from 'react';

export default class LoadablePage extends React.Component {
	componentWillMount = () => {
		import('./AboutPage.jsx').then(Component => {
			this.Component = Component
			this.forceUpdate()
		})
	}
	render = () => (
		this.Component ? <this.Component.default /> : null
	)
}
