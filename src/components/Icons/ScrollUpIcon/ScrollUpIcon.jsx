import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class ScrollUpIcon extends PureComponent {
  static propTypes = {
    className: PropTypes.string,
  };

  static defaultProps = {
    className: '',
  };

  render() {
    const { className } = this.props;

    return (
      <i className={`material-icons${className ? ` ${className}` : ''}`}>expand_less</i>
    );
  }
}

export default ScrollUpIcon;
