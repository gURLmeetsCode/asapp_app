import React from 'react'
import { configure, shallow  } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });


import Login from '../src/components/Login/index'



describe('User signin', () => {
    it('should fail if no credentials are provided', () => {
        const fakeEvent = { preventDefault: () => console.log('preventDefault') };
        const loginComponent = shallow(<Login />);
        expect(loginComponent.find('.form-login').length).toBe(1);
        loginComponent.find('.form-login').simulate('submit', fakeEvent);
    });
});


describe('Check State', () => {
  it('check initial state', () => {
    const output = shallow(
      <Login />
    );
    expect(output.state().firstUsername).toEqual('');
  });
});
