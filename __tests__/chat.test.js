import React from 'react'
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });


import Chat from '../src/components/Chat/index'

describe('<Chat />', () =>{
  it('renders 1 <Chat /> component', () => {
    const component = shallow(<Chat />)
    expect(component).toHaveLength(1);
  });
});


describe('Check State', () => {
  it('check initial state', () => {
    const output = shallow(
      <Chat />
    );
    expect(output.state().usr1_message).toEqual('');
    expect(output.state().usr2_message).toEqual('');
    expect(output.state().messages).toEqual([]);
  });
});
