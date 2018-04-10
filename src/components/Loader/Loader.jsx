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
        <div className={styles['folding-cube']}>
          <div className={styles.cube} />
          <div className={`${styles.cube2} ${styles.cube}`} />
          <div className={`${styles.cube4} ${styles.cube}`} />
          <div className={`${styles.cube3} ${styles.cube}`} />
        </div>
      </div>);
  }
}
