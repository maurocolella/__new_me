import React, { PureComponent } from 'react';
import loadAcclaimBadge from '../../../lib/acclaim';

export default class OracleAssociateBadge extends PureComponent {
  componentDidMount() {
    loadAcclaimBadge();
  }

  render() {
    return (
      <div
        data-iframe-width="150"
        data-iframe-height="270"
        data-share-badge-id="82b8a687-2958-4e07-b34d-9fae29eb9a62"
      />
    );
  }
}
