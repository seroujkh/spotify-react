import Burger from "../menu/Burger"
import SidebarMenu from "../menu/Menu";
import Loader from "./Loader";
import BackToTopBtn from "./BackToTopBtn";

const Layout = props => {

    return (
        <>
            <SidebarMenu />
        
            {props.children}
        </>
    )
}

export default Layout;