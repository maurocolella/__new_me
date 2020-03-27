import React, { PureComponent } from 'react';
import {
  OracleAssociateBadge,
  JSNADBadge,
  AWSArchitectAssociateBadge,
  AWSSysopsAssociateBadge,
  AWSDeveloperAssociateBadge,
} from '../../components/Badges';


class BadgeContainer extends PureComponent {
  render() {
    return (
      <aside style={{ display: 'flex' }}>
        <OracleAssociateBadge />
        <JSNADBadge />
        <AWSArchitectAssociateBadge />
        <AWSSysopsAssociateBadge />
        <AWSDeveloperAssociateBadge />
      </aside>
    );
  }
}

export default BadgeContainer;
