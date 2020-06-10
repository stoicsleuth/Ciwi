import React from "react";
import { NavLink } from "react-router-dom";
import styled from 'styled-components';
const Nav = styled.div`
    height: 100%;
    display: flex;
    align-items: flex-end;
    background-color: #000000;
    border-bottom: 1px solid rgb(0, 0, 0);

`

const StyledNavLink = styled(NavLink)`
    width: 33.333%;
    text-align: left;
    text-
`

const Header = () => {
    return(
        <Nav>
            <StyledNavLink exact activeClassName = 'active' to = "/">Home</StyledNavLink>
            <StyledNavLink exact activeClassName = 'active' to = "/:country/new">New</StyledNavLink>
            <StyledNavLink exact activeClassName = 'active' to = "/:country">Popular</StyledNavLink>
        </Nav>
    )
}

export default Header