import App from './App';
import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router';

test('valid path should render correct component', () => {
  const wrapper = mount(
    <MemoryRouter initialEntries={[ '/Organization' ]}>
      <App/>
    </MemoryRouter>
  );
  expect(wrapper.find(Organization)).toHaveLength(1);
});
