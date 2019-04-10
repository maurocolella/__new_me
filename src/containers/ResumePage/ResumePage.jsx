import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import hash from 'object-hash';
import moment from 'moment';

import { resumeFetchData } from './actions';

import Loader from '../../components/Loader';
import OracleAssociateBadge from '../../components/Badges/OracleAssociateBadge';
import ResumeEntry from '../../components/ResumeEntry';

import globalStyles from '../../assets/styles/page.scss';
import styles from './ResumePage.scss';

class ResumePage extends Component {
  static propTypes = {
    fetchData: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired,
    entries: PropTypes.arrayOf(Object).isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      printTarget: hash('mcl_resume_print'),
    };
  }

  componentDidMount() {
    const { fetchData } = this.props;
    fetchData();
  }

  lastModified = () => {
    const { entries } = this.props;
    const updateDates = entries.map(entry => moment(entry.updatedAt));
    return moment.max(updateDates).format('LL');
  }

  render() {
    const title = 'Resume';
    const { printTarget } = this.state;
    const { isLoading, entries } = this.props;

    return (
      (isLoading)
        ? <Loader className={globalStyles.page} />
        : (
          <main className={globalStyles.page}>
            <header
              className={`${globalStyles.page__header} ${styles['page__header--with-tools']}`}
            >
              <div>
                <small className={globalStyles.lastModified}>
                  Last modified:
                  {' '}
                  {this.lastModified()}
                </small>
                <h2 className={globalStyles.page__title}>{title}</h2>
              </div>
              <aside className={styles.toolbox}>
                <Link
                  to="/resume/print"
                  target={printTarget}
                  className={styles.toolbox__tool}
                >
                  <i className="material-icons">print</i>
                </Link>
              </aside>
            </header>
            <article className={globalStyles.article}>
              <h5>Highlights</h5>
              <OracleAssociateBadge />
            </article>
            {entries.map(entry => (
              <ResumeEntry
                key={entry.id}
                title={entry.title}
                startDate={entry.startDate}
                endDate={entry.endDate}
                description={entry.description}
                tasks={entry.tasks}
              />
            ))}
          </main>
        ));
  }
}

const mapStateToProps = (state, ownProps) => {
  const { slug } = ownProps.match.params;
  const { resume } = state;

  return {
    hasErrored: resume.hasErrored,
    isLoading: resume.isLoading,
    slug,
    entries: resume.items,
  };
};

const mapDispatchToProps = dispatch => ({
  fetchData: () => { dispatch(resumeFetchData()); },
});

export default connect(mapStateToProps, mapDispatchToProps)(ResumePage);
