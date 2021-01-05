import App from './App';
import Tracker from '../Tracker/Tracker';
import Builder from '../Builder/Builder';
import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router';

//const rrd = require('react-router-dom');
//jest.spyOn(rrd, 'BrowserRouter').mockImplementation(({children}) => children);

const rrd = require('react-router-dom');
// Just render plain div with its children
rrd.BrowserRouter = ({children}) => <div>{children}</div>
module.exports = rrd;

test('valid path should render correct component', () => {
  const wrapper = mount(
    <MemoryRouter initialEntries={[ '/tracker' ]}>
      <App/>
    </MemoryRouter>
  );

  expect(wrapper.find(Tracker)).toHaveLength(1);
});
