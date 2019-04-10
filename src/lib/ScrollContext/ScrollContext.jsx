import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

const getDimensions = () => {
  const { body } = document;
  const doc = document.documentElement;

  const scrollTop = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);
  const viewportHeight = Math.max(doc.clientHeight, window.innerHeight || 0);
  const documentHeight = Math.max(
    body.scrollHeight,
    body.offsetHeight,
    doc.clientHeight,
    doc.scrollHeight,
    doc.offsetHeight,
  );

  return {
    scrollTop,
    viewportHeight,
    documentHeight,
  };
};

const ScrollContext = React.createContext(getDimensions());

class ScrollProvider extends PureComponent {
  state = getDimensions();

  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
    ]),
  }

  static defaultProps = {
    children: null,
  };

  componentDidMount() {
    window.addEventListener('scroll', this.eventListener);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.eventListener);
  }

  eventListener = () => {
    this.setState(getDimensions());
  }

  render() {
    const { children } = this.props;

    return (
      <ScrollContext.Provider value={this.state}>
        {children}
      </ScrollContext.Provider>
    );
  }
}

const withScrolling = Component => props => (
  <ScrollContext.Consumer>
    {({
      scrollTop,
      viewportHeight,
      documentHeight,
    }) => (
      <Component
        {...props}
        scrollTop={scrollTop}
        viewportHeight={viewportHeight}
        documentHeight={documentHeight}
      />
    )}
  </ScrollContext.Consumer>
);

export { withScrolling };
export default ScrollProvider;
