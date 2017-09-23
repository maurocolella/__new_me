import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { skillsFetchData } from './actions';

import GLChart from '../../components/GLChart';

import styles from '../../assets/styles/page.scss';

class SkillsPage extends React.Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		this.props.fetchData('http://api.dev.home/skills');
	}

	render() {
		const { skills } = this.props;

		return (
			<main className={styles.page}>
				<header className={styles.page__header}>
					<h2 className={styles.page__title}>Skills</h2>
				</header>
				<GLChart style={{height: '400px', width: 'auto'}} data={skills} />
				<br/>
				<p>
					Phasellus at quam dignissim, semper ligula id, consectetur velit. Fusce ex eros, auctor id est vel, molestie placerat erat. Praesent volutpat ligula interdum commodo placerat. Morbi at porta metus. Quisque turpis urna, auctor a ipsum a, commodo auctor dui. Suspendisse pulvinar enim arcu, sed facilisis tortor pretium eget. Nunc eu turpis ac eros condimentum dictum ut ac lorem. Mauris sodales egestas dolor, et molestie sapien porttitor ac. Cras massa nisl, dapibus eu diam sit amet, ornare dignissim magna.
				</p>
			</main>
		);
	}
}

const mapStateToProps = (state, ownProps) => {
	const { skills } = state;
	const topSkills = [];
	for(let index in skills){
		if(index < 15){
			let skill = skills.shift();
			topSkills.push({name: skill.title, value: skill.rating});
		}
	}

	console.log(skills);

	return {
		hasErrored: state.skillsHasErrored,
		isLoading: state.skillsIsLoading,
		skills: topSkills
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		fetchData: (url) => dispatch(skillsFetchData(url))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(SkillsPage);
