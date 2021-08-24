import SidebarMenu from "../menu/Menu";

const Layout = props => {

    return (
        <>
            <SidebarMenu />
            {props.children}
        </>
    )
}

export default Layout;