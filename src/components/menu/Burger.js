

const Burger = props => {

    return (
        <div className= {"menu-btn" +( props.open ?  ' open ' : '')} onClick={props.toggleClick} >
            <span className={"menu-btn__burger" +( props.open ?  ' open ' : '')}></span>
        </div>
    )


}

export default Burger;