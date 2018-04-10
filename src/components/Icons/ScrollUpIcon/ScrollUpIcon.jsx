import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

export default class ScrollUpIcon extends PureComponent {
  static propTypes = {
    className: PropTypes.string,
  };

  static defaultProps = {
    className: '',
  };

  render() {
    return (
      <svg viewBox="0 0 48 48" className={this.props.className}>
        <g>
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M24.12 0.20c-13.3 0 -24 10.7 -24 24s10.7 24 24 24 24 -10.7 24 -24 -10.7 -24 -24 -24zm9.5 30.5 -9.5 -9.5 -9.5 9.5 -2.5 -2.5 12 -12 12 12z"
          />
        </g>
      </svg>
    );
  }
}
