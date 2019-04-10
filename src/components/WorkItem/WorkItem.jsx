import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styles from './WorkItem.scss';

class WorkItem extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
    cover: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
  };

  handleClickCapture = (event) => {
    const { onClick, id } = this.props;
    event.preventDefault();
    event.stopPropagation();
    onClick(event, id);
  }

  render() {
    const {
      title,
      link,
      cover,
    } = this.props;

    return (
      <a
        href={link}
        onClick={this.handleClickCapture}
        style={{ textDecoration: 'none' }}
      >
        <article
          className={styles.entry}
        >
          <header className={styles.entry__header}>
            <h5 className={styles.entry__title}>{title}</h5>
          </header>
          <div className={styles['entry__image-wrapper']}>
            <img
              className={styles.entry__image}
              src={cover}
              alt={title}
            />
          </div>
        </article>
      </a>
    );
  }
}

export default WorkItem;
