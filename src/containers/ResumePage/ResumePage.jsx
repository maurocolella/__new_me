import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import BadgeContainer from '../BadgeContainer';
import PDFResume from '../../components/PDFResume';
import resume from '../../components/PDFResume/Mauro_Colella_Resume_2023.pdf';

import globalStyles from '../../assets/styles/page.scss';
import styles from './ResumePage.scss';

class ResumePage extends Component {
  static propTypes = {};

  constructor(props) {
    super(props);

    this.state = {
      printTarget: btoa('mcl_resume_print'),
    };
  }

  lastModified = () => moment('2020/03/27').format('LL');

  render() {
    const title = 'Resume';
    const { printTarget } = this.state;

    return (
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
              href={resume}
              target={printTarget}
              className={styles.toolbox__tool}
            >
              <i className="material-icons">print</i>
            </a>
          </aside>
        </header>
        <article className={globalStyles.article}>
          <h5>Achievements</h5>
          <BadgeContainer />
        </article>
        <article style={{ width: '100%' }}>
          <h5>Outline</h5>
          <PDFResume />
          <aside className={`${styles.toolbox} ${styles['toolbox-footer']}`}>
            <a
              href={resume}
              target={printTarget}
              className={styles.toolbox__tool}
            >
              <i className="material-icons">print</i>
            </a>
          </aside>
        </article>
      </main>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const { slug } = ownProps.match.params;

  return {
    slug,
  };
};

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(ResumePage);
