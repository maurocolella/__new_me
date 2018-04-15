import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
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
  this.handleSearch = this.handleSearch.bind(this);

  this.state = {
    filter: '',
  };
}

componentDidMount() {
  this.props.fetchData();
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
        <h6>All Skills</h6>
        <span className={styles.notice}>
          The following skills have been used professionally.
        </span>
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
