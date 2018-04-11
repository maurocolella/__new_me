import React, { Component } from 'react';
import PropTypes from 'prop-types';
import LazyLoad from 'react-lazyload';
import styles from './ResumeEntry.scss';

class ResumeEntry extends Component {

  static propTypes = {
    company: PropTypes.string.isRequired,
    startDate: PropTypes.shape.isRequired,
    endDate: PropTypes.shape.isRequired,
    description: PropTypes.string.isRequired,
    tasks: PropTypes.arrayOf(String).isRequired,
  };

  render() {
    const {
      company,
      startDate,
      endDate,
      description,
      tasks,
    } = this.props;

    return (
      <LazyLoad offset={-100}>
        <div className={styles.entry}>
          <h5 className={styles.entry__heading}>{company}</h5>
          <em>{startDate} - {endDate}</em>
          <p>{description}</p>
          <ul>
            {tasks ?
              tasks.map(task => (
                <li>{task.description}</li>
              ))
              :
              null
            }
          </ul>
        </div>
      </LazyLoad>
    );
  }
}

export default ResumeEntry;
