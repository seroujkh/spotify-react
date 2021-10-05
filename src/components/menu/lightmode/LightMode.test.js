import { shallow, mount } from 'enzyme';
import React from 'react';
import LightMode, { LightMode as OriginalLightModeClass } from './LightMode';
import { render, screen } from '@testing-library/react';

let T_CURRENTMODE = "light";

describe('LightMode', () => {
    let wrapper;

    beforeEach(() => wrapper = shallow(<LightMode mode={T_CURRENTMODE} />));

    it('should render correctly', () => expect(wrapper).toMatchSnapshot());

    // it('changes lightmode by props', () => {
    //     const { rerender } = render(<LightMode mode="dark" />)
    //     // wrapper.setProps({ mode: 'dark' });
    //     expect(screen.getByTestId('active')).toHaveTextContent('dark');
    // });


    it('changes lightmode by click', () => {
        let currentLightMode = T_CURRENTMODE;
        let nextLightMode = currentLightMode == "light" ? "dark" : "light";
        expect(wrapper.find('.active').text()).toBe(currentLightMode);
        wrapper.find('.lightmode').simulate('click');
        expect(wrapper.find('.active').text()).toBe(nextLightMode);
    });



    // describe('toggleLightModeHandler', () => {
    //     let wrapper;

    //     beforeEach(() => wrapper = shallow(<LightMode mode={T_CURRENTMODE} />));


    //     it('updates displayValue', () => {
    //         wrapper.instance().toggleLightModeHandler();
    //         expect(wrapper.state('mode')).toEqual('5');
    //     });
    // });

});