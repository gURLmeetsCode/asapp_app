import React from 'react'
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });


import App from '../src/components/App'

describe('App renders without crashing', () =>{
  it('renders 1 <App /> component', () => {
    const component = shallow(<App />)
    expect(component).toHaveLength(1);
  });
});
