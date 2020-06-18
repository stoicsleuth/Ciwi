import { NavLink, Link } from 'react-router-dom'
import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import FlexGroup from './containers/FlexGroup'
import SearchBar from './SearchBar'
// import FlexGroup from './containers/FlexGroup'

const Nav = styled.div`
  align-items: center;
  background-color: #191927;
  display: flex;
  height: 100%;
  justify-content: space-between;
  padding: 0px 20px;
`

const NavTransparent = styled(Nav)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 45px;
  background: transparent;
  z-index: 1;
  padding: 20px 50px;
`

const Logo = styled(Link)`
  color: white;
  font-size: 1.5rem;
  font-weight: 700;

  & > img {
    width: 45px;
    margin-top: 10px;
  }
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

const Header = ({ variant }) => {
  const Component = variant === 'default' ? Nav : NavTransparent

  return (
    <Component>
      <FlexGroup center paddingv={0}>
        <Logo to="/"><img src="/logo.png" alt="logo" /></Logo>
        <FlexGroup center>
          <StyledNavLink exact activeClassName="active" to="/">Home</StyledNavLink>
          <StyledNavLink exact activeClassName="active" to="/new">New</StyledNavLink>
          <StyledNavLink exact activeClassName="active" to="/popular">Popular</StyledNavLink>
        </FlexGroup>
      </FlexGroup>
      <SearchBar />
    </Component>
  )
}

Header.propTypes = {
  variant: PropTypes.oneOf([ 'default', 'transparent' ])
}

Header.defaultProps = {
  variant: 'transparent'
}

export default Header
