import { render, screen } from '@testing-library/react';
import App from './App';
import { shallow } from 'enzyme';
import { LocationDisplay } from './app';
import { Router, useLocation } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { AuthContext, AuthContextProvider } from '../../store/auth-context';

describe('App', () => {
  let wrapper;
  beforeEach(() => wrapper = shallow(<App />));
  it('should render correctly', () => expect(wrapper).toMatchSnapshot());
});

// test('full app rendering/navigating', () => {
  //   const history = createMemoryHistory()
  //   render(
  //     <Router history={history}>
  //       <App />
  //     </Router>,
  //   )
  //   // verify page content for expected route
  //   // often you'd use a data-testid or role query, but this is also possible

  //   // history.replace('artists');
  //   // expect(screen.getByText(/Search for your favorite artists/i)).toBeInTheDocument()


  //   // const leftClick = { button: 0 }
  //   // userEvent.click(screen.getByText(/about/i), leftClick)

  //   // // check that the content changed to the new page
  //   // expect(screen.getByText(/you are on the about page/i)).toBeInTheDocument()
  // })

  //   test('render home artists page', () => {
  //     const history = createMemoryHistory()
  //     // history.push('/artists')
  //     const providerProps = {
  //       value: 'C3PO',
  //     }

  //     render(
  //       <AuthContext>
  //         <Router history={history}>
  //           <App />
  //         </Router>
  //       </AuthContext>,
  //     )
  //     expect(screen.getByTestId("homepage-title")).toBeInTheDocument()
  //   })

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


// const customRender = (ui, {providerProps, ...renderOptions}) => {
//   return render(
//     <AuthContext.Provider {...providerProps}>{ui}</AuthContext.Provider>,
//     renderOptions,
//   )
// }
{/* <AuthContext.Provider
value={{
  isLoggedIn: isLoggedIn,
  onLogout: logoutHandler,
  onLogin: loginHandler,
  accessToken: accessToken,
  user: user,
  searchedTerm : searchedTerm,
  setSearchedTerm: setSearchedTermHandler,
  setSearchedResults : setSearchedResultsHandler,
  searchedResults : searchedResults,
  loading: loading,
  lightmode: lightMode,
  setLightMode: setLightModeHandle,
  errorMssg: errorMssg,
  setErrorMssg: ErrorMssgHandler
}}
>
{props.children}
</AuthContext.Provider> */}

describe("Routing", () => {
  test('render single artists with all the albums', () => {
    const history = createMemoryHistory()
    history.push('/artist/testament')
    render(
      <Router history={history}>
        <App />
      </Router>,
    )
    expect(screen.getByText(/Testament/i)).toBeInTheDocument()
  })
});


