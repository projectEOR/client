import Profile from './Report';
import React from 'react';
import { shallow } from 'enzyme';

describe('The Profile', () => {

    let wrapper;
    beforeEach(() => {
        wrapper = shallow(<Profile />);
    });

    xtest('the component is rendered', () => {
        expect(wrapper.find('select')).toHaveLength(1);
    });

    xtest('the current unit should be displayed', () => {
        expect(wrapper.find('select').props().value).toBe('select unit');
    });

    test('unit should able to be changed', () => {
        const select = wrapper.find('select');
        const currUnit = select.props().value;

        select.simulate('change', {target:{value:1}});
        const unitChanged = currUnit !== select.props().value;

        console.log(currUnit, select.props().value);
        expect(unitChanged).toBe(true);
    });

    xtest("the profile owner's supervisor is displayed", () => {

    })

});