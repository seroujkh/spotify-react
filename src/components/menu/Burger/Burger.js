const Burger = props => {

    return (
        <div data-testId="burger-1" className= {"menu-btn" +( props.open ?  ' open ' : '')} onClick={props.toggleClick} >
            <span  data-testId="burger-2"  className={"menu-btn__burger" +( props.open ?  ' open ' : '')}></span>
        </div>
    )
}

export default Burger;