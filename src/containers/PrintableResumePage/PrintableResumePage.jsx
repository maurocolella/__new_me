import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { skillsFetchData } from '../SkillsPage/actions';
import { resumeFetchData } from '../ResumePage/actions';
import { profileFetchData } from './actions';

import styles from './PrintableResumePage.scss';
import StaticResumeEntry from '../../components/StaticResumeEntry';

class PrintableResumePage extends Component {
  static propTypes = {
    fetchSkillsData: PropTypes.func.isRequired,
    fetchResumeData: PropTypes.func.isRequired,
    fetchProfileData: PropTypes.func.isRequired,
    skills: PropTypes.arrayOf(Object).isRequired,
    resumeEntries: PropTypes.arrayOf(Object).isRequired,
    profile: PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      email: PropTypes.string,
      nationality: PropTypes.string,
      languages: PropTypes.array,
      certifications: PropTypes.array,
    }).isRequired,
  };

  componentDidMount() {
    const {
      fetchSkillsData,
      fetchResumeData,
      fetchProfileData,
    } = this.props;
    document.title = 'Mauro Colella | consultant profile';
    fetchSkillsData();
    fetchResumeData();
    fetchProfileData();
  }

  componentDidUpdate() {
    const { skills, resumeEntries, profile } = this.props;

    if (profile.id && resumeEntries.length && skills.length) {
      window.print();
      // window.close();
    }
  }

  render() {
    const { skills, resumeEntries, profile } = this.props;

    return (
      <main className={styles.page}>
        <header className={styles.page__header}>
          <h2 className={styles.page__title}>{profile.name}</h2>
          <h3 className={styles.page__title}>Curriculum Vitae</h3>
          {profile.email}
          <br />
          Nationality:
          {' '}
          {profile.nationality}
        </header>
        <section className={styles.section}>
          <h5 className={styles.section__header}>Languages</h5>
          <table className={styles.table}>
            <tbody>
              {profile.languages ? profile.languages.map(language => (
                <tr key={language.id}>
                  <td>{language.title}</td>
                  <td>{language.description}</td>
                </tr>
              )) : null}
            </tbody>
          </table>
        </section>
        <section className={styles.section}>
          <h5 className={styles.section__header}>Professional Training &amp; Education</h5>
          <table className={`${styles.table} ${styles['table--with-border']}`}>
            <tbody>
              {profile.certifications ? profile.certifications.map(certification => (
                <tr key={certification.id}>
                  <td>{certification.title}</td>
                  <td>{certification.description}</td>
                </tr>
              )) : null}
            </tbody>
          </table>
        </section>
        <section
          className={styles.section}
        >
          <h5 className={styles.section__header}>Technical Expertise</h5>
          <ul className={styles.skills}>
            {skills.map(skill => (
              <li key={skill.id} className={styles.skills__skill}>
                <small>{skill.title}</small>
              </li>
            ))}
          </ul>
        </section>
        <section className={styles.section}>
          <h5 className={styles.section__header}>Professional Experience</h5>
          {resumeEntries.map(entry => (
            <StaticResumeEntry
              key={entry.id}
              title={entry.title}
              startDate={entry.startDate}
              endDate={entry.endDate}
              description={entry.description}
              tasks={entry.tasks}
            />
          ))}
        </section>
      </main>
    );
  }
}

const mapStateToProps = (state) => {
  const { skills, resume, profile } = state;

  return {
    hasErrored: resume.hasErrored || skills.hasErrored || profile.hasErrored,
    isLoading: resume.isLoading || skills.isLoading || profile.isLoading,
    resumeEntries: resume.items,
    skills: skills.items,
    profile: profile.item,
  };
};

const mapDispatchToProps = dispatch => ({
  fetchResumeData: () => { dispatch(resumeFetchData()); },
  fetchSkillsData: () => { dispatch(skillsFetchData()); },
  fetchProfileData: () => { dispatch(profileFetchData()); },
});

export default connect(mapStateToProps, mapDispatchToProps)(PrintableResumePage);
