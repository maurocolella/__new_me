import React, { Component, Suspense } from 'react';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';
import { connect } from 'react-redux';
import moment from 'moment';
import Fade from 'react-reveal/Fade';
import ReactGA from 'react-ga';

import { skillsFetchData } from './actions';

import Loader from '../../components/Loader';
import OracleAssociateBadge from '../../components/Badges/OracleAssociateBadge';

import styles from '../../assets/styles/page.scss';

const GLChart = React.lazy(() => import('../../components/GLChart'));

class SkillsPage extends Component {
  static propTypes = {
    history: ReactRouterPropTypes.history.isRequired,
    fetchData: PropTypes.func.isRequired,
    topSkills: PropTypes.arrayOf(Object),
    skills: PropTypes.arrayOf(Object),
    isLoading: PropTypes.bool.isRequired,
    // eslint-disable-next-line react/no-unused-prop-types
    selected: PropTypes.shape({}),
  };

  static defaultProps = {
    topSkills: [],
    skills: [],
    selected: null,
  };

  static hasActiveRelation(focusSkill, skill) {
    if (focusSkill && focusSkill.relationships) {
      const { relationships } = focusSkill;
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

  constructor(props) {
    super(props);
    this.searchInput = React.createRef();

    this.state = {
      filter: '',
      activeSkill: null,
      searchActive: false,
    };
  }

  componentDidMount() {
    const { fetchData } = this.props;
    fetchData();
  }

  componentDidUpdate(prevProps) {
    const { selected } = this.props;

    if (!prevProps.selected
      && selected
      && selected.title) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({ activeSkill: selected });
    }
  }

  componentWillUnmount() {
    document.body.removeEventListener('click', this.handleGlobalCancelRelated, true);
  }

  handleRelated = skill => () => {
    const { history } = this.props;

    ReactGA.event({
      category: 'Related',
      action: 'Skills Page',
      label: skill && skill.title,
    });

    this.setState({
      filter: '',
      activeSkill: skill,
    });

    this.searchInput.current.value = '';

    if (skill) {
      document.body.addEventListener('click', this.handleGlobalCancelRelated, true);
      history.push(`/skills/${skill.title.toLowerCase()}`);
    } else {
      document.body.removeEventListener('click', this.handleGlobalCancelRelated, true);
    }
  }

  lastModified = () => {
    const { skills } = this.props;
    const updateDates = skills.map(skill => moment(skill.updatedAt));
    return moment.max(updateDates).format('LL');
  }

  handleGlobalCancelRelated = () => {
    this.setState({
      filter: '',
      activeSkill: null,
    });
  }

  handleSearch = (event) => {
    const filter = event.target.value;

    if (filter.length >= 3) {
      ReactGA.event({
        category: 'Search',
        action: 'Skills Page',
        label: filter,
      });
    }

    this.setState({
      filter,
      activeSkill: null,
    });
  }

  handleFocusInput = (event) => {
    this.setState({
      searchActive: true,
    });

    this.handleSearch(event);
  }

  handleBlurInput = () => {
    this.setState({
      searchActive: false,
    });
  }

  focusSearchInput = () => {
    this.searchInput.current.focus();
  }

  render() {
    const { topSkills, skills, isLoading } = this.props;
    const { filter, activeSkill, searchActive } = this.state;
    const skillStyle = { display: 'flex', flex: '1 1 auto', margin: '3px' };

    const searchResults = filter.length
          && skills.filter(skill => skill.title.toLowerCase().indexOf(filter) >= 0);
    const searchResultsIndex = searchResults
          && searchResults.map(result => result.title.toLowerCase());

    const allRelated = [];
    if (searchResults.length) {
      searchResults.forEach((focusSkill) => {
        skills.forEach((skill) => {
          if (searchResultsIndex.indexOf(skill.title.toLowerCase()) < 0
              && this.constructor.hasActiveRelation(focusSkill, skill)) {
            const label = skill.title.toLowerCase();
            if (allRelated.indexOf(label) < 0) {
              allRelated.push(label);
            }
          }
        });
      });
    }

    return (
      <main className={styles.page}>
        <header className={styles.page__header}>
          <small className={styles.lastModified}>
            Last modified:
            {' '}
            {this.lastModified()}
          </small>
          <h2 className={styles.page__title}>Skills</h2>
        </header>
        <article className={styles.article}>
          <h5>Highlights</h5>
          <section className={styles.article__highlights}>
            <OracleAssociateBadge />
            <Suspense fallback={<Loader />}>
              <GLChart
                className={styles.chart}
                data={topSkills}
                style={{
                  height: 240,
                }}
              />
            </Suspense>
          </section>
        </article>
        <article className={styles.article}>
          <h5>All Skills</h5>
          <small>
            The following skills have been used professionally.
          </small>
          <div
            className={
              `${styles.search}
              ${searchActive ? ` ${styles['search--active']}` : ''}`
            }
          >
            <input
              ref={this.searchInput}
              className={styles.search__field}
              onChange={this.handleSearch}
              onFocus={this.handleFocusInput}
              onBlur={this.handleBlurInput}
              placeholder="search skills..."
              type="text"
            />
            <button
              className={styles.search__button}
              onClick={this.focusSearchInput}
              type="button"
            >
              <i
                className={`material-icons ${styles.search__icon}`}
              >
                search
              </i>
            </button>
          </div>
          <small className={styles.legend}>
            * Related items in blue (tap to highlight).
          </small>
          { isLoading
            ? <Loader />
            : (
              <Fade>
                <ul className={styles.flatList}>
                  {
                  skills.map((skill) => {
                    const label = skill.title.toLowerCase();
                    const isActive = (activeSkill
                          && (skill.id === activeSkill.id
                          || this.constructor.hasActiveRelation(activeSkill, skill)))
                          || allRelated.indexOf(label) >= 0;
                    const isDimmed = (filter.length && label.indexOf(filter.toLowerCase()) < 0)
                          || (activeSkill && !isActive);
                    const classes = `${styles.tag}
                                    ${isDimmed ? ` ${styles['tag--dim']}` : ''}
                                    ${isActive ? ` ${styles['tag--related']}` : ''}`;

                    return (
                      <li
                        style={skillStyle}
                      >
                        <button
                          className={classes}
                          onClick={this.handleRelated(skill)}
                          type="button"
                        >
                          {skill.title}
                        </button>
                      </li>
                    );
                  })
                }
                  <li style={skillStyle}>
                    <button
                      className={`${styles.tag} ${activeSkill ? styles['tag--reset'] : styles['tag--dim']}`}
                      onClick={this.handleRelated(null)}
                      type="button"
                      enabled={activeSkill}
                    >
                      <i className={`material-icons ${styles.tag__icon}`}>
                        close
                      </i>
                      {' '}
                      clear
                    </button>
                  </li>
                </ul>
              </Fade>
            )}
        </article>
      </main>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const { selected } = ownProps.match.params;
  const { skills } = state;
  const topSkills = [];
  const allSkills = [];
  let selectedSkill = null;

  skills.items.forEach((skill) => {
    const formattedSkill = {
      name: skill.title,
      value: skill.rating,
    };

    if (skill.featured) {
      topSkills.push(formattedSkill);
    }

    if (selected
      && skill.title.toLowerCase() === selected.toLowerCase()) {
      selectedSkill = Object.assign({}, skill);
    }
    allSkills.push(Object.assign({}, skill));
  });

  return {
    hasErrored: skills.hasErrored,
    isLoading: skills.isLoading,
    topSkills,
    skills: allSkills,
    selected: selectedSkill,
  };
};

const mapDispatchToProps = dispatch => ({
  fetchData: () => { dispatch(skillsFetchData()); },
});

export default connect(mapStateToProps, mapDispatchToProps)(SkillsPage);
