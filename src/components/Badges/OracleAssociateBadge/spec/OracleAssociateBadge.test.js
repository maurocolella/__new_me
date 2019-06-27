import React from 'react';
import renderer from 'react-test-renderer';
import OracleAssociateBadge from '../OracleAssociateBadge';

it('renders correctly', () => {
  const tree = renderer
    .create(<OracleAssociateBadge />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
