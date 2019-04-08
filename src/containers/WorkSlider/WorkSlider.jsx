import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactGA from 'react-ga';

import WorkSlide from '../../components/WorkSlide';
import styles from './WorkSlider.scss';
import scrollIcon from '../../assets/images/mousewheel.png';
import swipeIcon from '../../assets/images/swipe.png';
import keysIcon from '../../assets/images/arrow-keys.png';

class WorkSlider extends Component {
  static propTypes = {
    sourceRect: PropTypes.shape({}),
    show: PropTypes.bool.isRequired,
    entries: PropTypes.arrayOf(Object).isRequired,
    onClose: PropTypes.func.isRequired,
  };

  static defaultProps = {
    sourceRect: {},
  };

  constructor(props) {
    super(props);
    this.apply = this.apply.bind(this);
    this.handleTouchStart = this.handleTouchStart.bind(this);
    this.handleTouchMove = this.handleTouchMove.bind(this);
    this.handleTouchEnd = this.handleTouchEnd.bind(this);
    this.handleWheel = this.handleWheel.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
    this.handleSliderClose = this.handleSliderClose.bind(this);

    this.state = {
      animRect: {
        height: '100vh',
        left: 0,
        opacity: 0,
        pointerEvents: 'none',
        top: 0,
        width: '100vw',
      },
      currentSlide: 0,
      touchyLast: 0,
      deltay: 0,
      locked: false,
      swiping: false,
      fadeHelp: false,
    };
  }

  UNSAFE_componentWillReceiveProps(nextProps, nextState) { /* eslint-disable-line */
    const { show } = this.props;
    const { activeSlide, entries } = nextProps;
    const { currentSlide } = this.state;
    const activeSlideIndex = entries.map(entry => entry.id.toString()).indexOf(activeSlide);

    if (nextProps.show && nextProps.show !== show) {
      this.setState({
        animRect: { ...nextProps.sourceRect },
        locked: true,
      });
      document.body.style.overflow = 'hidden';
      document.addEventListener('keyup', this.handleKeyUp, true);
      setTimeout(() => {
        this.setState({
          animRect: {
            height: '100vh',
            left: 0,
            opacity: 1,
            pointerEvents: 'auto',
            top: 0,
            width: '100vw',
          },
          locked: false,
        });
      }, 500);

      setTimeout(() => {
        this.setState({
          fadeHelp: true,
        });
      }, 4500);

      setTimeout(() => {
        sessionStorage.setItem('sliderShown', 'true');
      }, 5500);
    } else if (!nextProps.show && nextProps.show !== show) {
      this.setState({
        animRect: {
          height: '100vh',
          left: 0,
          opacity: 0,
          pointerEvents: 'none',
          top: 0,
          width: '100vw',
        },
      });
      document.removeEventListener('keyup', this.handleKeyUp, true);
      document.body.style.overflow = 'auto';
    }

    if (activeSlideIndex >= 0
        && activeSlideIndex !== currentSlide) {
      this.setState({
        currentSlide: activeSlideIndex,
      });
    }
  }

  apply(delta) {
    const { entries } = this.props;
    const { currentSlide, deltay, locked } = this.state;
    if (locked) {
      return;
    }

    let slideIndex = currentSlide + Math.sign(delta || deltay);
    if (slideIndex < 0) {
      slideIndex = entries.length - 1;
    }
    if (slideIndex >= entries.length) {
      slideIndex = 0;
    }

    setTimeout(() => {
      this.setState({
        locked: false,
      });
    }, 200);

    this.setState({
      deltay: 0,
      swiping: false,
      currentSlide: slideIndex,
      locked: true,
    });

    ReactGA.event({
      category: 'Work',
      action: 'Change slide',
      label: entries[slideIndex].title,
    });
  }

  handleWheel(event) {
    event.preventDefault();
    event.stopPropagation();
    this.apply(event.deltaY);
  }

  handleTouchStart(event) {
    event.preventDefault();
    const isTouch = event.targetTouches && event.targetTouches.length;
    const clientY = isTouch ? event.targetTouches[0].clientY : event.clientY;

    this.setState({
      touchyLast: clientY,
      swiping: true,
    });
  }

  handleTouchMove(event) {
    const isTouch = event.targetTouches && event.targetTouches.length;
    const clientY = isTouch ? event.targetTouches[0].clientY : event.clientY;
    const { touchyLast, swiping } = this.state;

    if (swiping) {
      this.setState({
        deltay: clientY - touchyLast,
      });
    }
  }

  handleTouchEnd() {
    this.apply();
  }

  handleKeyUp(event) {
    const key = event.key || event.keyCode;

    const prev = ['ArrowUp', 'ArrowLeft', 37, 38];
    const next = ['ArrowDown', 'ArrowRight', 39, 40];

    if (prev.indexOf(key) >= 0) {
      this.apply(-1);
    }
    if (next.indexOf(key) >= 0) {
      this.apply(1);
    }
  }

  handleSliderClose() {
    const { entries, onClose } = this.props;
    const { currentSlide } = this.state;
    onClose(entries[currentSlide].id);
  }

  render() {
    const { entries } = this.props;
    const { currentSlide, animRect, fadeHelp } = this.state;
    const displayHelp = sessionStorage.getItem('sliderShown') !== 'true';

    const shadowEntries = entries.slice(0);
    const computedStyle = { ...animRect };

    return (
      <section
        className={styles.slider}
        style={computedStyle}
        onTouchStart={this.handleTouchStart}
        onTouchMove={this.handleTouchMove}
        onTouchEnd={this.handleTouchEnd}
        onMouseDown={this.handleTouchStart}
        onMouseMove={this.handleTouchMove}
        onMouseUp={this.handleTouchEnd}
        onWheelCapture={this.handleWheel}
        role="presentation"
      >
        <div className={styles.slider__content}>
          <button
            className={styles['close-button']}
            onClick={this.handleSliderClose}
            type="button"
          >
            <i className={`material-icons ${styles['close-button__icon']}`}>
              close
            </i>
          </button>
          <ul style={{ margin: 0, padding: 0, listStyleType: 'none' }}>
            {shadowEntries.map((entry, index) => (
              <WorkSlide
                key={entry.id}
                entry={entry}
                active={index === currentSlide}
              />
            ))}
          </ul>
        </div>
        {displayHelp
          && (
          <aside className={styles.toast} style={{ opacity: fadeHelp ? 0 : 1 }}>
            <header>
              Scroll, swipe, or use arrow keys to navigate
            </header>
            <footer className={styles['nav-icons']}>
              <img
                src={scrollIcon}
                alt="scroll"
                className={styles['nav-icons__icon']}
              />
              <img
                src={swipeIcon}
                alt="swipe"
                className={styles['nav-icons__icon']}
              />
              <img
                src={keysIcon}
                alt="arrow keys"
                className={styles['nav-icons__icon']}
              />
            </footer>
          </aside>
          )
        }
      </section>
    );
  }
}

export default WorkSlider;
