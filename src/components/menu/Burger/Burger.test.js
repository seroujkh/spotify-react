import { render, screen } from '@testing-library/react';
import { shallow, mount } from 'enzyme';
import React from 'react';
import Burger from './Burger';

describe('Burger', () => {
   
    test("should render open Burger without class 'open' ", () => {
        render(<Burger open={true} />);
        const burgerWrapper = screen.getByTestId('burger-1');
        const InnerBurger = screen.getByTestId('burger-2');
        expect(burgerWrapper.classList.contains('open')).toBe(true);
        expect(InnerBurger.classList.contains('open')).toBe(true);
    });

     
    test("should render open Burger withoutout class 'open' ", () => {
        render(<Burger open={false} />);
        const burgerWrapper = screen.getByTestId('burger-1');
        const InnerBurger = screen.getByTestId('burger-2');
        expect(burgerWrapper.classList.contains('open')).toBe(false);
        expect(InnerBurger.classList.contains('open')).toBe(false);
    });

});