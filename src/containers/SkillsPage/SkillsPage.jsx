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
		const { topSkills, skills } = this.props;
		console.log(skills);

		return (
			<main className={styles.page}>
				<header className={styles.page__header}>
					<h2 className={styles.page__title}>Skills</h2>
				</header>
				<article className={styles.article}>
					<h6>Core</h6>
					<GLChart className={styles.chart} data={topSkills} />
				</article>
				<article className={styles.article}>
					<h6>More</h6>
					{
						skills.map((skill) => {
							return (
								<span key={skills.id} className={styles.tag}>{skill.title}</span>
							);
						})
					}
				</article>
			</main>
		);
	}
}

const mapStateToProps = (state, ownProps) => {
	const { skills } = state;
	const topSkills = [];
	const boundary = 13;

	for(let index in skills){
		if(index < boundary){
			let skill = skills[index];
			topSkills.push({name: skill.title, value: skill.rating});
		}
	}

	skills.splice(0, boundary);

	return {
		hasErrored: state.skillsHasErrored,
		isLoading: state.skillsIsLoading,
		topSkills,
		skills
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		fetchData: (url) => dispatch(skillsFetchData(url))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(SkillsPage);
