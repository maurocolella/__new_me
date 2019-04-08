import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

export default class RulerIcon extends PureComponent {
  static propTypes = {
    className: PropTypes.string,
  };

  static defaultProps = {
    className: '',
  };

  render() {
    const { className } = this.props;

    return (
      <svg viewBox="0 0 64 64" className={className}>
        <rect x="22" y="1" strokeWidth="2" strokeMiterlimit="10" width="16" height="62" />
        <line strokeWidth="2" strokeMiterlimit="10" x1="31" y1="12" x2="38" y2="12" />
        <line strokeWidth="2" strokeMiterlimit="10" x1="38" y1="22" x2="35" y2="22" />
        <line strokeWidth="2" strokeMiterlimit="10" x1="38" y1="42" x2="35" y2="42" />
        <line strokeWidth="2" strokeMiterlimit="10" x1="31" y1="32" x2="38" y2="32" />
        <line strokeWidth="2" strokeMiterlimit="10" x1="31" y1="52" x2="38" y2="52" />
        <polygon strokeWidth="2" strokeMiterlimit="10" points="16,63 16,10 12,2 8,10 8,63 " />
        <line strokeWidth="2" strokeMiterlimit="10" x1="16" y1="53" x2="8" y2="53" />
        <polygon strokeWidth="2" strokeMiterlimit="10" points="56,3 56,53 52,61 48,53 48,3 " />
        <polyline strokeWidth="2" strokeMiterlimit="10" points="48,7 44,7 44,17 " />
      </svg>
    );
  }
}
