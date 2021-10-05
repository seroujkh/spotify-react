import { render, screen, } from '@testing-library/react';
import SearchBar from './SearchBar';
import { shallow } from 'enzyme';


describe('SearchBar', () => {
  let wrapper;

  beforeEach(() => wrapper = shallow(<SearchBar onTextChangeHandler={jest.fn()} value="" />));

  it('should render correctly', () => expect(wrapper).toMatchSnapshot());


  it('should render the value of value', () => {
    wrapper.setProps({ value: 'test' });
    expect(wrapper.find('.search-value-input').prop('value')).toEqual('test');
  });

});

describe('Search Bar', () => {

  test('should render the value', () => {
    const { queryByTestId } = render(<SearchBar onTextChangeHandler={jest.fn()} value="test" />);
    const searchInput = queryByTestId("search-value-input");
    expect(searchInput.value).toBe('test');
  });

});