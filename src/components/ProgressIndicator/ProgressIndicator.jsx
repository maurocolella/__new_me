import React, { PureComponent } from 'react';

import styles from './ProgressIndicator.scss';

class ProgressIndicator extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      scrollTop: 0,
      progress: 0,
    };

    this.timer = setInterval(() => { this.updateProgress(); }, 30);
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
    clearInterval(this.timer);
  }

  handleScroll = () => {
    const doc = document.documentElement;

    let scrollTop = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0) - 312;
    scrollTop = Math.max(0, scrollTop);

    this.setState({
      scrollTop,
    });
  }

  updateProgress = () => {
    const { body } = document;
    const { scrollTop } = this.state;
    const doc = document.documentElement;

    const vh = Math.max(doc.clientHeight, window.innerHeight || 0);
    const height = Math.max(
      body.scrollHeight,
      body.offsetHeight,
      doc.clientHeight,
      doc.scrollHeight,
      doc.offsetHeight,
    ) - 312 - vh;
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

export default ProgressIndicator;
