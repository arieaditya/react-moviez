import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import Genres from './Genres';
import styled from "styled-components";

const Navigation = ({ routeChange }) => {
    const [subMenuActive, setSubMenuActive] = useState(false);
    const location = useLocation();
    const isGenre = location.pathname.includes('genre');

    const toggleSubMenu = () => {
        setSubMenuActive(!subMenuActive);
    };

    const NavigationMenu = styled.section`
        order: 2;
        margin-top: 3rem;
        ul {
            display: flex;
            flex-direction: column;
            li {
                @media screen and (min-width: 1024px) {
                    margin-right: 3rem;
                }
                position: relative;
                font-size: 1.6rem;

                &.back {
                    @media screen and (min-width: 1024px) {
                        display: none;
                    }
                    display: inline-block;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    font-size: 1.6rem;
                    color: #757575;
                    margin-bottom: 3rem;

                    &:hover {
                        color: #c92e2b;

                        svg path {
                            fill: #c92e2b;
                        }
                    }

                    svg {
                        width: 15px;
                        height: 15px;
                        transform: rotate(-180deg);
                        margin-right: 1rem;

                        path {
                            fill: #757575;
                        }
                    }
                }

                a,
                p {
                    justify-content: space-between;
                    color: ${props => props.theme.pageBackground};
                    margin: 0;
                    cursor: pointer;
                    transition: 0.27s ease;
                    display: flex;
                    align-items: center;

                    &.active {
                        color: #c92e2b;
                    }

                    &:hover {
                        color: #c92e2b;
                    }

                    &:hover svg path {
                        fill: #c92e2b;
                    }

                    svg {
                        @media screen and (min-width: 1024px) {
                            display: none;
                        }
                        width: 15px;
                        height: 15px;
                    }
                }

                a {
                    svg {
                        @media screen and (min-width: 1024px) {
                            display: none;
                        }
                        width: 15px;
                        height: 15px;
                        transform: rotate(0deg);
                        margin-right: 0;
                    }
                }

                &:hover ul {
                    display: flex;
                }

                ul {
                    @media screen and (min-width: 1024px) {
                        width: 336px;
                        height: auto;
                        left: initial;
                        margin-top: 9.5rem;
                        padding: 2rem 2rem;
                        display: none;
                        box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.05);
                        flex-wrap: wrap;
                        transform: translateX(0);
                        opacity: 1;
                        visibility: visible;
                        pointer-events: all;
                        background-color: ${props => props.theme.titleColor};
                    }

                    &:before {
                        content: '';
                        position: absolute;
                        top: 0;
                        left: 0;
                        width: 50px;
                        height: 3.8rem;
                        margin-top: -3.8rem;
                        z-index: 0;
                    }

                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    transform: translateX(100%);
                    background-color: white;
                    transition: 0.3s ease;
                    opacity: 0;
                    visibility: hidden;
                    pointer-events: none;
                    padding: 14.3rem 2.5rem 0rem;

                    &.active {
                        transform: translateX(0);
                        opacity: 1;
                        pointer-events: all;
                        visibility: visible;
                        z-index: 1;
                    }

                    li {
                        @media screen and (min-width: 1024px) {
                            flex: 1 0 40%;
                        }
                        line-height: 1.5;
                    }
                }
            }
        }
    `;

    return (
        <NavigationMenu>
            <ul className="nav-list">
                <li>
                    <NavLink
                        to="/browse/popular"
                        activeClassName="active"
                        onClick={routeChange}
                    >
                        Popular
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/browse/top-rated"
                        activeClassName="active"
                        onClick={routeChange}
                    >
                        Top Rated
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/browse/upcoming"
                        activeClassName="active"
                        onClick={routeChange}
                    >
                        Upcoming
                    </NavLink>
                </li>
                <li>
                    <p
                        className={isGenre ? 'active' : null}
                        onClick={toggleSubMenu}
                    >
                        Genre
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 477.175 477.175"
                        >
                            <path d="M360.731 229.075l-225.1-225.1c-5.3-5.3-13.8-5.3-19.1 0s-5.3 13.8 0 19.1l215.5 215.5-215.5 215.5c-5.3 5.3-5.3 13.8 0 19.1 2.6 2.6 6.1 4 9.5 4 3.4 0 6.9-1.3 9.5-4l225.1-225.1c5.3-5.2 5.3-13.8.1-19z" />
                        </svg>
                    </p>
                    <Genres
                        className={subMenuActive ? 'active' : ''}
                        toggleMenu={toggleSubMenu}
                        routeChange={routeChange}
                    />
                </li>
            </ul>
        </NavigationMenu>
    );
};

export default Navigation;
