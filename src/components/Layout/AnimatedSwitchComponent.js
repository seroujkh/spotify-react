// import { AnimatedSwitch } from 'react-router-transition';

const AnimatedSwitchComponent = (props) => {
    return (
     // <AnimatedSwitch
      //   atEnter={{ opacity: 0 }}
      //   atLeave={{ opacity: 0 }}
      //   atActive={{ opacity: 1 }}
      //   className="switch-wrapper"
      // >
      <>
        {props.children}
        </>
      // </AnimatedSwitch>
    )
  }

  export default AnimatedSwitchComponent;