import React from 'react';
import renderer from 'react-test-renderer';
import { MemoryRouter as MockRouter } from 'react-router-dom';
import CookieNotice from '../CookieNotice';

it('renders correctly', () => {
  const tree = renderer
    .create(
      <MockRouter>
        <CookieNotice />
      </MockRouter>,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
