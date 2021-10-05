import logo from '../../assets/icons/logo.png';
import PropTypes from 'prop-types';

const SearchBar =( {onTextChangeHandler,value}) => {
    const onSubmit = (event) => {
        event.preventDefault();
    }
    return (
        <div className="container pt-5">
            <div className=' searchbar__container bg-green '>
                <form onSubmit={onSubmit}>
                    <img src={logo} className='logo'  alt="" />
                    <input type='text' className='ml-lg-4 search-value-input'data-testid="search-value-input" onChange={(e) => onTextChangeHandler(e)} value={value!=="..." ? value : ''} />
                    <input type="submit" className="d-none" />
                </form>
            </div>
        </div>
    )
}

SearchBar.propTypes ={
    onTextChangeHandler : PropTypes.func.isRequired,
    value : PropTypes.string
}

export default SearchBar;