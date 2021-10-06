import { render, screen } from '@testing-library/react';
import App from './App';
import { shallow } from 'enzyme';
import { LocationDisplay } from './app';
import { Router, useLocation } from 'react-router-dom';
import {createMemoryHistory} from 'history'
describe('App', () => {
  let wrapper;
  beforeEach(() => wrapper = shallow(<App />));
  it('should render correctly', () => expect(wrapper).toMatchSnapshot());
});


describe("Routing", () => {
  test('full app rendering/navigating', () => {
    const history = createMemoryHistory()
    render(
      <Router history={history}>
        <App />
      </Router>,
    )
    // verify page content for expected route
    // often you'd use a data-testid or role query, but this is also possible
    expect(screen.getByText(/you are home/i)).toBeInTheDocument()

    const leftClick = { button: 0 }
    userEvent.click(screen.getByText(/about/i), leftClick)

    // check that the content changed to the new page
    expect(screen.getByText(/you are on the about page/i)).toBeInTheDocument()
  })

});

// describe('Single Artist Link', () => {
//   test('should redirect and update history', () => {
//       const history = createMemoryHistory();
//       let correctLink = "/artist/" + MOCK_ARTIST.name.replace(/\s/g, '-').toLowerCase();

//       render(<Router history={history}><ArtistItem artist={MOCK_ARTIST} /></Router>);

//       const artistLink = screen.getByTestId("artist-link");
//       userEvent.click(artistLink);

//       expect(history.location.pathname).toEqual(correctLink);
//   });

// });