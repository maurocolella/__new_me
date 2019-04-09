import React, { PureComponent } from 'react';

import styles from './ProgressIndicator.scss';

class ProgressIndicator extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      progress: 0,
    };

    this.timer = setInterval(() => { this.updateProgress(); }, 30);
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleProgress);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleProgress);
    clearInterval(this.timer);
  }

  handleProgress = () => {
    const { body } = document;
    const doc = document.documentElement;

    const vh = Math.max(doc.clientHeight, window.innerHeight || 0);
    let top = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0) - 312;
    top = Math.max(0, top);
    const height = Math.max(
      body.scrollHeight,
      body.offsetHeight,
      doc.clientHeight,
      doc.scrollHeight,
      doc.offsetHeight,
    ) - 312 - vh;
    const percent = Math.round(top * 100 / height);

    this.innerProgress = percent;
  }

  updateProgress = () => {
    requestAnimationFrame(() => {
      this.setState({
        progress: this.innerProgress,
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

export default ProgressIndicator;
