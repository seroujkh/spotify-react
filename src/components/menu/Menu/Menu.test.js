import { render, screen } from '@testing-library/react';
import SidebarMenu from './Menu';
import { shallow, mount } from 'enzyme';
import React from 'react';
import LightMode from '../lightmode/LightMode';
import Burger from '../Burger';

describe('Menu', () => {
    let wrapper;

    beforeEach(() => wrapper = shallow(<SidebarMenu />));

    it('should render correctly', () => expect(wrapper).toMatchSnapshot());

    it('should render the LightMode Component', () => {
        expect(wrapper.containsMatchingElement(<LightMode mode="light" />)).toEqual(true);
    });
    it('should render the Burger Component', () => {
        expect(wrapper.containsMatchingElement(<Burger />)).toEqual(true);
    });


});