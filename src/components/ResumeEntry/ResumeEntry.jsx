import React, { Component } from 'react';
import PropTypes from 'prop-types';
import LazyLoad from 'react-lazyload';
import moment from 'moment';
import styles from './ResumeEntry.scss';

class ResumeEntry extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    startDate: PropTypes.string.isRequired,
    endDate: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    tasks: PropTypes.arrayOf(String).isRequired,
  };

  render() {
    const {
      title,
      startDate,
      endDate,
      description,
      tasks,
    } = this.props;
    moment.locale('en-UK');

    return (
      <LazyLoad>
        <article className={styles.entry}>
          <h5 className={styles.entry__heading}>
            <span>
              {moment(startDate).format('MMM YYYY')} - {moment(endDate).format('MMM YYYY')}
            </span>
            <span>
              {title}
            </span>
          </h5>
          <p>{description}</p>
          <ul>
            {tasks ?
              tasks.map(task => (
                <li key={task.id}>{task.description}</li>
              ))
              :
              null
            }
          </ul>
        </article>
      </LazyLoad>
    );
  }
}

export default ResumeEntry;
