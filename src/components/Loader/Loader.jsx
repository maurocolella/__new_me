import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styles from './Loader.scss';

export default class Loader extends PureComponent {
  static propTypes = {
    className: PropTypes.string,
  };

  static defaultProps = {
    className: '',
  };

  render() {
    return (
      <div className={`${styles.loader} ${this.props.className}`}>
        <div className={styles.spinner}>
          <div className={styles.rect1} />
          <div className={styles.rect2} />
          <div className={styles.rect3} />
          <div className={styles.rect4} />
          <div className={styles.rect5} />
        </div>
      </div>);
  }
}
