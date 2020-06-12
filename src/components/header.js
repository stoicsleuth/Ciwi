import { NavLink } from 'react-router-dom'
import React from 'react'
import styled from 'styled-components'

import FlexGroup from './containers/FlexGroup'
import SearchBar from './SearchBar'
// import FlexGroup from './containers/FlexGroup'

const Nav = styled.div`
  align-items: center;
  background-color: #191927;
  display: flex;
  height: 100%;
  justify-content: space-between;
  padding: 10px 20px;
`

const Logo = styled.span`
  color: white;
  font-size: 1.5rem;
  font-weight: 700;
`

const StyledNavLink = styled(NavLink)`
  color: ${({ color }) => (color || 'white')};
  text-align: left;
  text-decoration: none;

  &.active {
    border-bottom: 2px solid red;
    font-weight: 700;
    margin-bottom: -2px;
    transition: 0.4s all;
  }
`

const Header = () => (
  <Nav>
    <FlexGroup center>
      <Logo>UNOGS</Logo>
      <FlexGroup center>
        <StyledNavLink exact activeClassName="active" to="/">Home</StyledNavLink>
        <StyledNavLink exact activeClassName="active" to="/new">New</StyledNavLink>
        <StyledNavLink exact activeClassName="active" to="/popular">Popular</StyledNavLink>
      </FlexGroup>
    </FlexGroup>
    <SearchBar />
  </Nav>
)

export default Header
