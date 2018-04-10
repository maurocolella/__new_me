import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

export default class SunIcon extends PureComponent {
  static propTypes = {
    className: PropTypes.string,
  };

  static defaultProps = {
    className: '',
  };

  render() {
    return (
      <svg viewBox="0 0 64 64" className={this.props.className}>
        <g>
          <circle
            strokeMiterlimit="10"
            cx="32"
            cy="32"
            r="16"
          />
          <line
            strokeMiterlimit="10"
            x1="32"
            y1="10"
            x2="32"
            y2="0"
          />
          <line
            strokeMiterlimit="10"
            x1="32"
            y1="64"
            x2="32"
            y2="54"
          />
          <line
            strokeMiterlimit="10"
            x1="54"
            y1="32"
            x2="64"
            y2="32"
          />
          <line
            strokeMiterlimit="10"
            x1="0"
            y1="32"
            x2="10"
            y2="32"
          />
          <line
            strokeMiterlimit="10"
            x1="48"
            y1="16"
            x2="53"
            y2="11"
          />
          <line
            strokeMiterlimit="10"
            x1="11"
            y1="53"
            x2="16"
            y2="48"
          />
          <line
            strokeMiterlimit="10"
            x1="48"
            y1="48"
            x2="53"
            y2="53"
          />
          <line
            strokeMiterlimit="10"
            x1="11"
            y1="11"
            x2="16"
            y2="16"
          />
        </g>
      </svg>
    );
  }
}
