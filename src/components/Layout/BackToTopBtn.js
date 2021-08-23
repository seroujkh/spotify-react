
import arrowDown from '../../assets/icons/arrowdown.svg'

const BackToTopBtn = props => {

    const scroll = e => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    return (
        <div className='back-to-top-btn d-flex justify-content-center align-items-center cursor-pointer' onClick={scroll}>
            <img src={arrowDown} />
        </div>
    )
}

export default BackToTopBtn;