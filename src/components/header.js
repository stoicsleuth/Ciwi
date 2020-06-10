import React from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'
import SearchBar from './SearchBar'
import FlexGroup from './containers/FlexGroup'
// import FlexGroup from './containers/FlexGroup'

const Nav = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 20px;
  background-color: #191927;
`

const Logo = styled.span`
  font-size: 1.5rem;
  font-weight: 700;
  color: white;
`

const StyledNavLink = styled(NavLink)`
  text-align: left;
  text-decoration: none;
  color: ${({ color }) => (color || 'white')};

  &.active {
    font-weight: 700;
    border-bottom: 2px solid red;
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
        <StyledNavLink exact activeClassName="active" to="/:country/new">New</StyledNavLink>
        <StyledNavLink exact activeClassName="active" to="/:country">Popular</StyledNavLink>
      </FlexGroup>
    </FlexGroup>
    <SearchBar />
  </Nav>
)

export default Header
