import React, { Component } from 'react';
import PropTypes from 'prop-types';

const PerfContext = React.createContext();

const debugTag = '[PERF]';

/**
 * Context Provider that runs an initial benchmark on application FPS.
 */
class PerfProvider extends Component {
  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
    ]),
  }

  static defaultProps = {
    children: null,
  };

  constructor(props) {
    super(props);

    const now = (performance || Date).now();

    this.state = ({
      startTime: null,
      prevTime: now,
      frames: 0,
      fps: 0, /* eslint-disable-line react/no-unused-state */
      timer: null,
      benchResults: [],
      fast: true,
      threshold: 40,
    });
  }

  componentDidMount() {
    const debug = process.env.NODE_ENV && process.env.NODE_ENV === 'development';
    if (debug) console.log(`${debugTag} Starting benchmark`);

    this.setState({
      startTime: (performance || Date).now(),
      timer: requestAnimationFrame(this.tick),
    });
  }

  shouldComponentUpdate(prevProps, prevState) {
    const { fast } = this.state;
    return prevState.fast !== fast;
  }

  componentWillUnmount() {
    const { timer } = this.state;
    cancelAnimationFrame(timer);
  }

  tick = () => {
    const {
      prevTime,
      benchResults,
      timer,
      startTime,
      threshold,
    } = this.state;
    let { frames } = this.state;

    const debug = process.env.NODE_ENV && process.env.NODE_ENV === 'development';

    // Calculate new values
    frames += 1;
    const time = (performance || Date).now();
    const fps = (frames * 1000) / (time - prevTime);
    benchResults.push(fps);

    // Calculate results;
    if (benchResults.length > 300) {
      const benchAverage = benchResults.reduce((total, amount, index, array) => {
        const val = total + amount;
        if (index === array.length - 1) {
          return val / array.length;
        }
        return val;
      });

      // Report
      if (debug) console.log(`${debugTag} Benchmark: ${benchAverage}FPS average over ${((time - startTime) / 1000).toFixed(2)}s`);
      if (debug) console.log(`${debugTag} Performance is: ${benchAverage < 40 ? 'slow' : 'fast'}`);

      // If slow, flag as such and exit.
      if (benchAverage < threshold) {
        this.setState({
          fast: false,
        });
        if (debug) console.log(`${debugTag} Exiting benchmark`);
        cancelAnimationFrame(timer);
        return;
      }

      // Collapse benchmark results
      benchResults.length = 0;
      benchResults.push(benchAverage);
    }

    // Control
    if (time >= prevTime + 1000) {
      this.setState({
        prevTime: time,
        frames: 0,
        fps, /* eslint-disable-line react/no-unused-state */
      });
    } else {
      this.setState({
        frames,
      });
    }

    this.setState({
      benchResults,
    });
    requestAnimationFrame(this.tick);
  }

  render() {
    const { children } = this.props;
    const { fast } = this.state;

    return (
      <PerfContext.Provider
        value={{
          benchIsSlow: !fast,
        }}
      >
        {children}
      </PerfContext.Provider>
    );
  }
}

const withPerf = TargetComponent => props => (
  <PerfContext.Consumer>
    {({
      benchIsSlow,
    }) => (
      <TargetComponent
        {...props}
        benchIsSlow={benchIsSlow}
      />
    )}
  </PerfContext.Consumer>
);

export { withPerf };
export default PerfProvider;
