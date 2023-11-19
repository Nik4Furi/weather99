import React from 'react'

import { IoMdSunny } from "react-icons/io";


const Navbar = () => {
    return (
        <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary fixed">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#"> <IoMdSunny /> Weather 99</a>

                   

                </div>
            </nav>
        </>
    )
}

export default Navbar
