import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';
import ReactGA from 'react-ga';
import MobileDetect from 'mobile-detect';
import hash from 'object-hash';

import { worksFetchData } from './actions';
import placeholder from '../../assets/images/placeholder.svg';

import Loader from '../../components/Loader';
import WorkItem from '../../components/WorkItem';
import WorkSlider from '../WorkSlider';
import globalStyles from '../../assets/styles/page.scss';
import styles from './WorkPage.scss';

class WorkPage extends Component {
  static propTypes = {
    fetchData: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired,
    entries: PropTypes.arrayOf(Object).isRequired,
  };

  constructor(props) {
    super(props);
    this.lastModified = this.lastModified.bind(this);
    this.handleSliderToggle = this.handleSliderToggle.bind(this);
    this.handleSliderClose = this.handleSliderClose.bind(this);

    const detector = new MobileDetect(window.navigator.userAgent);
    const isMobile = (detector.mobile() || detector.tablet());

    this.state = {
      activeSlide: 0,
      sourceRect: {},
      showSlider: false,
      isMobile,
    };
  }

  componentDidMount() {
    this.props.fetchData();
  }

  handleSliderToggle(event, id) {
    const { entries } = this.props;
    const filteredEntries = entries.filter(item => item.id.toString() === id);
    const entry = filteredEntries.length ? filteredEntries[0] : { title: 'N/A' };
    const clientRect = event.target.getBoundingClientRect();

    if (this.state.isMobile) {
      const urlHash = hash(event.currentTarget.href);
      window.open(event.currentTarget.href, urlHash);
      return;
    }

    this.setState({
      activeSlide: id,
      showSlider: true,
      sourceRect: {
        height: clientRect.height,
        left: clientRect.left,
        opacity: 0,
        top: clientRect.top,
        width: clientRect.width,
      },
    });

    ReactGA.event({
      category: 'Work',
      action: 'Click slide',
      label: entry.title,
    });
  }

  handleSliderClose(lastId) {
    if (this.state.isMobile) {
      return;
    }

    this.setState({
      activeSlide: lastId,
      showSlider: false,
    });
  }

  lastModified() {
    const { entries } = this.props;
    const updateDates = entries.map(entry => moment(entry.updatedAt));
    return moment.max(updateDates).format('LL');
  }

  render() {
    const title = 'Work';
    const { isLoading, entries } = this.props;
    const {
      sourceRect,
      showSlider,
      activeSlide,
      isMobile,
    } = this.state;

    return (
      (isLoading) ?
        <Loader className={globalStyles.page} />
        :
        <main className={globalStyles.page}>
          <header
            className={globalStyles.page__header}
          >
            <div>
              <small className={globalStyles.lastModified}>
                Last modified: {this.lastModified()}
              </small>
              <h2 className={globalStyles.page__title}>{title}</h2>
            </div>
          </header>
          <article>
            <p>
              A selection of recent works.
            </p>
            <ul className={styles.grid}>
              {entries.map(entry => (
                <li
                  className={styles.grid__entry}
                  key={entry.id.toString()}
                >
                  <WorkItem
                    id={entry.id.toString()}
                    title={entry.title}
                    description={entry.description}
                    link={entry.links && entry.links.length ? entry.links[0].url : '#'}
                    cover={entry.images && entry.images.length ? entry.images[0].url : placeholder}
                    onClick={this.handleSliderToggle}
                  />
                </li>
              ))}
            </ul>
            {!isMobile &&
            <WorkSlider
              sourceRect={sourceRect}
              show={showSlider}
              activeSlide={activeSlide.toString()}
              onClose={this.handleSliderClose}
              entries={entries}
            />}
          </article>
        </main>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const { slug } = ownProps.match.params;
  const { works } = state;

  return {
    hasErrored: works.hasErrored,
    isLoading: works.isLoading,
    slug,
    entries: works.items,
  };
};

const mapDispatchToProps = dispatch => ({
  fetchData: () => { dispatch(worksFetchData()); },
});

export default connect(mapStateToProps, mapDispatchToProps)(WorkPage);
