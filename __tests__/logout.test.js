import React from 'react'
import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

import Logout from '../src/components/Logout/index'


describe('<Logout />', () =>{
  it('renders 1 <Logout /> component', () => {
    const component = shallow(<Logout />)
    expect(component).toHaveLength(1);
  });
});
