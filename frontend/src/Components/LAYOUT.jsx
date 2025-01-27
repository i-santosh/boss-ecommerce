import React from 'react';
import { Outlet} from 'react-router-dom';
import Navbar from './Navbar.jsx';
import Footer from './FOOTER.jsx';
function LAYOUT() {
    return (
     <>
     <Navbar/>
        <Outlet/>
        <Footer/>

</>
    );
}

export default LAYOUT;