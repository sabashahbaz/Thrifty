import {Outlet} from 'react-router-dom';
import Navbar from "./Components/Pieces/Navbar.js"


function Layout () {
    return (
        <div>
            <Navbar />
            <Outlet />
        </div>
    )
}

export default Layout;