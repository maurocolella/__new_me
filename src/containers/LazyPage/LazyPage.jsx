import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { resumeFetchData } from './actions';

import Loader from '../../components/Loader';
import ResumeEntry from '../../components/ResumeEntry';
import styles from '../../assets/styles/page.scss';

class LazyPage extends Component {
  static propTypes = {
    fetchData: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired,
    entries: PropTypes.arrayOf(Object).isRequired,
  };

  componentDidMount() {
    this.props.fetchData();
  }

  render() {
    const title = 'Resume';
    const { isLoading, entries } = this.props;

    return (
      (isLoading) ?
        <Loader className={styles.page} />
        :
        <main className={styles.page}>
          <header className={styles.page__header}>
            <h2 className={styles.page__title}>{title}</h2>
          </header>
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
    );
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

export default connect(mapStateToProps, mapDispatchToProps)(LazyPage);
