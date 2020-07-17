/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { NavLink, Link } from 'react-router-dom'
import React, { useState, Fragment, useContext, useRef } from 'react'
import styled from 'styled-components'
import classNames from 'classnames'
import PropTypes from 'prop-types'

import FlexGroup from './containers/FlexGroup'
import SearchBar from './SearchBar'
import breakpoints from '../constants/breakpoints'
import CountryFilterContext from '../contexts/CountryFilterContext'
import useClickOutside from '../hooks/useClickOutside'

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

  @media ${breakpoints.mobileL} {
    padding: 20px 5px;
    /* padding-bottom: 100%; */
    overflow: hidden;
  }
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

function CountrySelectMenu({ className }) {
  const countries = [ { name: 'India', code: 337 }, { name: 'USA', code: 78 }, { name: 'UK', code: 77 } ]
  const { countryFilter, setCountryFilter } = useContext(CountryFilterContext)

  const toggleFilter = (country) => {
    const countryList = new Set([ ...countryFilter ])

    if (countryList.has(country)) {
      countryList.delete(country)
    } else {
      countryList.add(country)
    }

    setCountryFilter([ ...countryList ])
  }

  return (
    <div className={className} onClick={(e) => e.stopPropagation()}>
      {countries.map(({ name, code }) => (
        <div className={classNames('country', { 'country-active': countryFilter.includes(code) })} onClick={() => toggleFilter(code)}>
          <img src={`/flag-${name.toLowerCase()}.svg`} alt="flag" />
          <p>{name}</p>
        </div>
      ))}
    </div>
  )
}

const StyledCountrySelectMenu = styled(CountrySelectMenu)`
  position: absolute;
  background: #1f1f25;
  width: 161px;
  top: 40px;
  right: 0px;
  border-radius: 4px;

  & .country {
    display: flex;
    justify-content: space-around;
    align-items: center;
    background: #1e1e2b;
    color: white;
    margin: 4px 8px;
    border-radius: 4px;

    img {
      width: 29px;
      height: 18px;
      object-fit: cover;
      border-radius: 3px;
    }
  }

  & .country-active {
    background: #516d88;
  }
`

function CountrySelect({ className }) {
  const [ isCountrySelectOpen, setIsCountrySelectOpen ] = useState(false)
  const filterBoxRef = useRef()

  useClickOutside(filterBoxRef, () => setIsCountrySelectOpen(false))

  return (
    <Fragment>
      <div ref={filterBoxRef} className={className} onClick={() => setIsCountrySelectOpen(!isCountrySelectOpen)}>
        <p>Country</p>
        {isCountrySelectOpen && <StyledCountrySelectMenu />}
      </div>
    </Fragment>
  )
}

const StyledCountrySelect = styled(CountrySelect)`
  align-items: center;
  cursor: pointer;
  position: relative;
  background: #1d61a0;
  display: flex;
  border-radius: 4px;
  color: #fdfdfd;
  font-size: 1rem;
  font-weight: 600;
  height: 31px;
  justify-content: center;
  width: 81px;
`

const Header = ({ variant }) => {
  const Component = variant === 'default' ? Nav : NavTransparent

  return (
    <Component>
      <FlexGroup series center paddingV={10} gutterXs={7}>
        <Logo to="/"><img src="/logo.png" alt="logo" /></Logo>
        <FlexGroup series center gutterXs={7}>
          <StyledNavLink exact activeClassName="active" to="/new">New</StyledNavLink>
          <StyledNavLink exact activeClassName="active" to="/popular">Popular</StyledNavLink>
        </FlexGroup>
      </FlexGroup>
      <FlexGroup center series gutterXs={5}>
        <StyledCountrySelect />
        <SearchBar xs />
      </FlexGroup>
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
