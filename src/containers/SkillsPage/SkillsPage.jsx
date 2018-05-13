import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';

import { skillsFetchData } from './actions';
import GLChart from '../../components/GLChart';
import styles from '../../assets/styles/page.scss';

class SkillsPage extends Component {
  static propTypes = {
    fetchData: PropTypes.func.isRequired,
    topSkills: PropTypes.arrayOf(Object),
    skills: PropTypes.arrayOf(Object),
  };

static defaultProps = {
  topSkills: [],
  skills: [],
};

constructor(props) {
  super(props);
  this.lastModified = this.lastModified.bind(this);
  this.handleSearch = this.handleSearch.bind(this);
  this.hasActiveRelation = this.hasActiveRelation.bind(this);

  this.state = {
    filter: '',
    activeSkill: null,
  };
}

componentDidMount() {
  this.props.fetchData();
}

lastModified() {
  const { skills } = this.props;

  const updateDates = skills.map(skill => moment(skill.updatedAt));

  return moment.max(updateDates).format('LL');
}

hasActiveRelation(skill) {
  const { activeSkill } = this.state;

  if (activeSkill && activeSkill.relationships) {
    const { relationships } = activeSkill;
    const relatedFrom = relationships.relatedFrom && relationships
      .relatedFrom
      .data
      .find(relation => relation.id === skill.id);

    const relatedTo = relationships.relatedTo && relationships
      .relatedTo
      .data
      .find(relation => relation.id === skill.id);

    return Boolean(relatedFrom || relatedTo);
  }

  return false;
}

handleRelated = skill => () => {
  this.setState({
    filter: '',
    activeSkill: skill,
  });
}

handleSearch(event) {
  this.setState({
    filter: event.target.value,
    activeSkill: null,
  });
}

render() {
  const { topSkills, skills } = this.props;
  const { filter, activeSkill } = this.state;

  return (
    <main className={styles.page}>
      <header className={styles.page__header}>
        <small className={styles.lastModified}>Last modified: {this.lastModified()}</small>
        <h2 className={styles.page__title}>Skills</h2>
      </header>
      <article className={styles.article}>
        <GLChart className={styles.chart} data={topSkills} />
      </article>
      <article className={styles.article}>
        <h6>All Skills</h6>
        <small>
          The following skills have been used professionally.
        </small>
        <input
          className={styles.search}
          onChange={this.handleSearch}
          placeholder="search..."
          type="text"
        />
        {
          skills.map((skill) => {
            const label = skill.title.toLowerCase();
            const isActive = activeSkill &&
                  (skill.id === activeSkill.id || this.hasActiveRelation(skill));
            const isDimmed = (filter.length && label.indexOf(filter.toLowerCase()) < 0) ||
                  (activeSkill && !isActive);
            const classes = `${styles.tag}
                             ${isDimmed ? ` ${styles['tag--dim']}` : ''}
                             ${isActive ? ` ${styles['tag--related']}` : ''}`;

            return (
              <button
                key={skill.id}
                className={classes}
                onClick={this.handleRelated(skill)}
              >
                {skill.title}
              </button>
            );
          })
        }
      </article>
    </main>
  );
}
}

const mapStateToProps = (state) => {
  const { skills } = state;
  const topSkills = [];
  const allSkills = [];

  skills.items.forEach((skill) => {
    const formattedSkill = {
      name: skill.title,
      value: skill.rating,
    };

    if (skill.featured) {
      topSkills.push(formattedSkill);
    }
    allSkills.push(Object.assign({}, skill));
  });

  return {
    hasErrored: skills.hasErrored,
    isLoading: skills.isLoading,
    topSkills,
    skills: allSkills,
  };
};

const mapDispatchToProps = dispatch => ({
  fetchData: () => { dispatch(skillsFetchData()); },
});

export default connect(mapStateToProps, mapDispatchToProps)(SkillsPage);
