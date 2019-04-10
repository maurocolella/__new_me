import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import styles from './Loader.scss';

class Loader extends PureComponent {
  static propTypes = {
    className: PropTypes.string,
  };

  static defaultProps = {
    className: '',
  };

  render() {
    const { className } = this.props;

    return (
      <div className={`${styles.loader} ${className}`}>
        <div className={styles.spinner}>
          <div className={styles.rect1} />
          <div className={styles.rect2} />
          <div className={styles.rect3} />
          <div className={styles.rect4} />
          <div className={styles.rect5} />
        </div>
      </div>
    );
  }
}

export default Loader;
