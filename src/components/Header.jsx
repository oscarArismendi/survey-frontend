import React, { useState } from 'react';
import { NavbarLink } from './NavbarLink';
import "../styles/header.css"
export const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };
    return (
        <header className="header">
            <button className="hamburger" onClick={toggleMenu}>
                    <i className="fa-solid fa-bars"></i>
            </button>
            <nav className={`header-menu ${isMenuOpen ? 'active' : ''}`}>
                <NavbarLink
                    link={"/home"}
                    text={"Home"}
                >
                </NavbarLink>
                <NavbarLink
                    link={"/"}
                    text={"Logout"}
                >
                </NavbarLink>
            </nav>

        </header>
    );
}