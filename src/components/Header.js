import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navigation from './Navigation';
import Search from './Search';
import styled from "styled-components";
import { CgSun } from "react-icons/cg";
import { HiMoon } from "react-icons/hi";

const Header = props => {
    const [mobileMenu, setMobileMenu] = useState(false);
    const [stopScroll, setStopScroll] = useState(false);

    const handleMobileMenu = () => {
        setMobileMenu(!mobileMenu);
        setStopScroll(!stopScroll);
    };

    const handleRouteChange = () => {
        setMobileMenu(false);
        setStopScroll(false);
    };

    const checkDimensions = () => {
        if (window.innerWidth > 1024) {
            setMobileMenu(false);
            setStopScroll(false);
        }
    };

    window.addEventListener('resize', checkDimensions);

    if (mobileMenu) {
        document.querySelector('html').classList.add('mobile-active');
    } else {
        document.querySelector('html').classList.remove('mobile-active');
    }

    if (stopScroll) {
        document.body.style.overflowY = 'hidden';
    } else {
        document.body.style.overflowY = '';
    }

    const Toggle = styled.button`
        cursor: pointer;
        height: 30px;
        width: 30px;   
        border-radius: 50%;
        border: none;
        background-color: ${props => props.theme.titleColor};
        color: ${props => props.theme.pageBackground};
        &:focus {
            outline: none;
        }
        transition: all 2s ease-in-out;
    `;

    const Header = styled.section`
        position: fixed;
        z-index: 9999;
        top: 0;
        left: 0;
        width: 100%;
        background-color: ${props => props.theme.titleColor};
        box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.05);
        transition: all 2s ease-in-out;
    `;

    const Logo = styled.h1`
        position: relative;
        display: flex;
        align-items: center;
        color: ${props => props.theme.pageBackground};
        margin: 0;
        z-index: 9999;
        transition: all 2s ease-in-out;
        &:hover {
            color: $primary-color;
        }
    
        span {
            margin: -3px 5px 0 0;
            font-size: 3.2rem;
        }
    `;

    function changeTheme () {
        if (props.theme === "light") {
            props.setTheme("dark");
        } else {
            props.setTheme("light");
        }
    };

    const icon = props.theme === "light" ? <HiMoon size={20} /> : <CgSun size={20} />;

    return (
        <div>
            <div className="mobile-menu">
                <div className="mobile-menu-wrapper">
                    <Navigation routeChange={handleRouteChange} />
                    <Search routeChange={handleRouteChange} />
                </div>
            </div>
            <Header>
                <div className="header-content">
                    <Link to="/">
                        <Logo>
                            <span role="img" aria-label="Popcorn">
                                🍿
                            </span>
                            MOVIEZ
                        </Logo>
                    </Link>
                    <div className="right">
                        <Navigation routeChange={handleRouteChange} />
                        <Search routeChange={handleRouteChange} />
                        <Toggle onClick={changeTheme}>
                            {icon}
                        </Toggle>
                    </div>
                    <div
                        className={`hamburger${mobileMenu ? ' active' : ''}`}
                        onClick={handleMobileMenu}
                    >
                        <div></div>
                        {/* <div></div> */}
                        <div></div>
                    </div>
                </div>
            </Header>
        </div>
    );
};

export default Header;
