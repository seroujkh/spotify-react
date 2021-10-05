import SidebarMenu from "../menu/Menu/Menu";

const Layout = props => {

    return (
        <>
            <SidebarMenu />
            {props.children}
        </>
    )
}

export default Layout;