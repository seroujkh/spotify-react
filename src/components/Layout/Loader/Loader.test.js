import { shallow, mount } from 'enzyme';
import React from 'react';
import { render, screen } from '@testing-library/react';
import Loader from './Loader';

describe('Loader', () => {

    test("should render visible loader without class 'hidden' ", () => {
        render(<Loader loading={true} />);
        const loader = screen.getByTestId('loader');
        expect(loader.classList.contains('hide')).toBe(false);
    });

    test("should render visible loader with class 'hidden' ", () => {
        render(<Loader loading={false} />);
        const loader = screen.getByTestId('loader');
        expect(loader.classList.contains('hide')).toBe(true);
    });

});
