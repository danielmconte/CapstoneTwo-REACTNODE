import React from "react";
import { NavLink } from "react-router-dom";
import { Navbar, Nav, NavItem } from "reactstrap";
import { useSelector, shallowEqual } from "react-redux";
import "./Navbar.css";

function NavBar() {
    const { token } = useSelector(
        (state) => ({
            token: state.token,
        }),
        shallowEqual
    );
    return (
        <div>
            <Navbar expand="md">
                <NavLink exact to="/" className="navbar-brand">
                    The Shortest Path
                </NavLink>
                <div className="container-fluid">
                    <Nav className="ml-auto" navbar>
                        <NavItem>
                            <NavLink to="/loginform">Login</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink to="/registerform">Signup</NavLink>
                        </NavItem>
                        <NavItem >
                            <NavLink to="/about">About</NavLink>
                        </NavItem>
                        {token ? (
                            <NavItem>
                                <NavLink to="/logout">Logout</NavLink>
                            </NavItem>
                        ) : null}
                    </Nav>
                </div>
            </Navbar>
        </div>
    );
}

export default NavBar;
