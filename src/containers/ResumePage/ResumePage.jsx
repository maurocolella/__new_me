import React, { Component, Suspense } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';

import { resumeFetchData } from './actions';

import Loader from '../../components/Loader';
import OracleAssociateBadge from '../../components/Badges/OracleAssociateBadge';

import globalStyles from '../../assets/styles/page.scss';
import styles from './ResumePage.scss';

const ResumeEntry = React.lazy(() => import('../../components/ResumeEntry'));

class ResumePage extends Component {
  static propTypes = {
    entries: PropTypes.arrayOf(Object).isRequired,
    isLoading: PropTypes.bool.isRequired,
    fetchData: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      printTarget: btoa('mcl_resume_print'),
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
                <a
                  href="https://api.mauro-colella.com/assets/Mauro%20Colella%20_%20consultant%20profile.pdf"
                  target={printTarget}
                  className={styles.toolbox__tool}
                >
                  <i className="material-icons">print</i>
                </a>
              </aside>
            </header>
            <article className={globalStyles.article}>
              <h5>Highlights</h5>
              <OracleAssociateBadge />
            </article>
            {entries.map(entry => (
              <Suspense
                key={entry.id}
                fallback={<Loader />}
              >
                <ResumeEntry
                  title={entry.title}
                  startDate={entry.startDate}
                  endDate={entry.endDate}
                  description={entry.description}
                  tasks={entry.tasks}
                />
              </Suspense>
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
