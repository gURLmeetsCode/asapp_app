import React from 'react'
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });


import User1 from '../src/components/User1/index'



describe('Forms Mount', () => {
    it('should confirm the existence of 2 forms', () => {
        const fakeEvent = { preventDefault: () => console.log('preventDefault') };
        const loginComponent = shallow(<User1 />);
        expect(loginComponent.find('.form-login').length).toBe(2);
    });
});

describe('updates state on input change', () => {
  it('should handle the change event', () => {
    const onChange = jest.fn()
    const wrapper = shallow(<User1 onChange={onChange}/>);
    const selectWrapper = wrapper.find('.secondUser-form-login');
    selectWrapper.simulate('change', { target: { value: 'Eddard Stark' } });
  });
});

describe('Check State', () => {
  it('check initial state', () => {
    const output = shallow(
      <User1 />
    );
    expect(output.state().secondUsername).toEqual('');
    expect(output.state().message).toEqual('');
    expect(output.state().messages).toEqual([]);
  });
});
