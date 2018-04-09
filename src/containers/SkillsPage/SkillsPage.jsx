import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { skillsFetchData } from './actions';

import GLChart from '../../components/GLChart';

import styles from '../../assets/styles/page.scss';

class SkillsPage extends React.Component {
    constructor(props) {
        super(props);
        this.handleSearch = this.handleSearch.bind(this);

        this.state = {
            filter: '',
        };
    }

    componentDidMount() {
        this.props.fetchData('//api.mauro-colella.com/skills');
    }

    handleSearch(event) {
        this.setState({
            filter: event.target.value,
        });
    }

    render() {
        const { topSkills, skills } = this.props;
        const { filter } = this.state;

        return (
            <main className={styles.page}>
                <header className={styles.page__header}>
                    <h2 className={styles.page__title}>Skills</h2>
                </header>
                <article className={styles.article}>
                    <GLChart className={styles.chart} data={topSkills} />
                </article>
                <article className={styles.article}>
                    <h6>More</h6>
                    <input
                        className={styles.search}
                        onChange={this.handleSearch}
                        placeholder="filter..."
                        type="text"
                    />
                    {
                        skills.map((skill) => {
                            const label = skill.title.toLowerCase();
                            const isDimmed = filter.length && label.indexOf(filter.toLowerCase()) < 0;
                            const classes = `${styles.tag}${isDimmed ? ` ${styles['tag--dim']}` : ''}`;

                            return (
                                <span
                                    key={skill.id}
                                    className={classes}
                                    title={`${skill.rating * 100}%`}
                                >
                                    {skill.title}
                                </span>
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
    const otherSkills = [];

    for(let index in skills){
        let skill = skills[index];
        let formattedSkill = {name: skill.title, value: skill.rating};

        if(skill.featured){
            topSkills.push(formattedSkill);
        }
        else{
            otherSkills.push(skill);
        }
    }

    return {
        hasErrored: state.skillsHasErrored,
        isLoading: state.skillsIsLoading,
        topSkills,
        skills: otherSkills,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchData: (url) => dispatch(skillsFetchData(url))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SkillsPage);
