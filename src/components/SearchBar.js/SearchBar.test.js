import SearchBar from './SearchBar';
import { shallow } from 'enzyme';

describe('SearchBar', () => {
  let wrapper;
  beforeEach(() => (wrapper = shallow(<SearchBar onTextChangeHandler={()=>{}} value={''} />)));

  it('should render correctly', () => expect(wrapper).toMatchSnapshot());


});