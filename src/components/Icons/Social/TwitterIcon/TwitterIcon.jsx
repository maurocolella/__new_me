import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

export default class TwitterIcon extends PureComponent {
  static propTypes = {
    className: PropTypes.string,
  };

  static defaultProps = {
    className: '',
  };

  render() {
    const { className } = this.props;

    return (
      <svg
        viewBox="0 0 400 400"
        className={className}
      >
        <g>
          <path
            d="M350 400H50c-27.6 0-50-22.4-50-50V50C0 22.4 22.4 0 50 0h300c27.6 0 50 22.4 50 50v300c0 27.6-22.4 50-50 50z"
          />
          <path
            d="M153.6 301.6c94.3 0 145.9-78.2 145.9-145.9 0-2.2 0-4.4-.1-6.6 10-7.2 18.7-16.3 25.6-26.6-9.2 4.1-19.1 6.8-29.5 8.1 10.6-6.3 18.7-16.4 22.6-28.4-9.9 5.9-20.9 10.1-32.6 12.4-9.4-10-22.7-16.2-37.4-16.2-28.3 0-51.3 23-51.3 51.3 0 4 .5 7.9 1.3 11.7-42.6-2.1-80.4-22.6-105.7-53.6-4.4 7.6-6.9 16.4-6.9 25.8 0 17.8 9.1 33.5 22.8 42.7-8.4-.3-16.3-2.6-23.2-6.4v.7c0 24.8 17.7 45.6 41.1 50.3-4.3 1.2-8.8 1.8-13.5 1.8-3.3 0-6.5-.3-9.6-.9 6.5 20.4 25.5 35.2 47.9 35.6-17.6 13.8-39.7 22-63.7 22-4.1 0-8.2-.2-12.2-.7 22.6 14.4 49.6 22.9 78.5 22.9"
            fill="#fff"
          />
        </g>
      </svg>
    );
  }
}
