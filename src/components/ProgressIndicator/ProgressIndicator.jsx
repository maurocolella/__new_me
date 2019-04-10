import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withScrolling } from '../../lib/ScrollContext';

import styles from './ProgressIndicator.scss';

class ProgressIndicator extends PureComponent {
  static propTypes = {
    scrollTop: PropTypes.number.isRequired,
    documentHeight: PropTypes.number.isRequired,
    viewportHeight: PropTypes.number.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      progress: 0,
    };

    this.timer = setInterval(() => { this.updateProgress(); }, 30);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  updateProgress = () => {
    const {
      viewportHeight,
      documentHeight,
    } = this.props;
    let { scrollTop } = this.props;
    scrollTop = Math.max(0, scrollTop - 312);

    const height = documentHeight - 312 - viewportHeight;
    const percent = Math.round(scrollTop * 100 / height);

    requestAnimationFrame(() => {
      this.setState({
        progress: percent,
      });
    });
  }

  render() {
    const { progress } = this.state;

    return (
      <div className={styles['progress-indicator']}>
        <div
          className={styles['progress-indicator__indicator']}
          style={{
            width: `${progress}%`,
          }}
        />
      </div>
    );
  }
}

export default withScrolling(ProgressIndicator);
