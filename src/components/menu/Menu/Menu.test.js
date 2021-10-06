import { render, screen } from '@testing-library/react';
import SidebarMenu from './Menu';
import { shallow, mount } from 'enzyme';
import React from 'react';
import LightMode from '../lightmode/LightMode';
import Burger from '../Burger/Burger';

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

describe('User Profile', () => {

    beforeEach(() => render(<SidebarMenu />));

    test("user profile icon", () => {
        const userIcon = screen.getByTestId("user-icon");
        expect(userIcon).toBeInTheDocument();
    });

    test("user profile name", () => {
        const userName = screen.getByTestId("user-name");
        expect(userName).toBeInTheDocument();
    });

    test("user profile followers", () => {
        const userFollowers = screen.getByTestId("user-followers");
        expect(userFollowers).toBeInTheDocument();
    });

    test("user profile country", () => {
        const userCountry = screen.getByTestId("user-country");
        expect(userCountry).toBeInTheDocument();
    });

});