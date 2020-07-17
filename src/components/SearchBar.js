import React, { useState, useRef } from 'react'
import styled from 'styled-components'
import Modal from 'react-modal'

import { SkeletonTheme } from 'react-loading-skeleton'
import { ReactComponent as SearchLogo } from '../assets/icons/search.svg'
import { ReactComponent as CloseLogo } from '../assets/icons/close.svg'
import FlexGroup from './containers/FlexGroup'
import SearchBox from './SearchBox'
import useDebounce from '../hooks/useDebounce'
import useClickOutside from '../hooks/useClickOutside'
import breakpoints from '../constants/breakpoints'
import { ReactComponent as NetflixLogo } from '../assets/icons/netflix.svg'

const StyledLogo = styled(SearchLogo)`
  fill: #717171;
  width: 15px;
  pointer-events: none;
  margin-bottom: -2px;

  @media ${breakpoints.mobileL} {
    pointer-events: initial;
  }
`

const StyledCloseLogo = styled(CloseLogo)`
  fill: #717171;
  width: 15px;
`

const StyledNetflixLogo = styled(NetflixLogo)`
  width: 200px;
  height: 200px;
`

const StyledSearchInput = styled.input`
  background: inherit;
  border: none;
  color: white;
  display: flex;
  font-size: 1rem;
  height: 22px;
  outline: none;
  transition: 0.4s width ease-in-out;
  width: ${({ query }) => (query ? '300px' : '150px')};

  &:focus {
    width: 300px;
  }

  @media ${breakpoints.mobileL} {
    display: ${({ xs }) => (!xs ? 'none' : 'flex')};
    width: 100%;

    &:focus {
      width: 100%;
    }
  }
`

const StyledSearchBar = styled.div`
  position: relative;

  @media ${breakpoints.mobileL} {
    margin: 0px;
  }
`

const customStyles = {
  content: {
    background: '#100f19',
    top: 0,
    right: 0,
    left: 0,
    border: 0,
    height: '100vh'
  },
  overlay: {
    zIndex: 100
  }
}

const ResponsiveSearchBar = styled(FlexGroup)`
  padding: 5px 10px;
  border-radius: 5px;
  background: transparent;
  border: 1px solid #717171;
`

function SearchBar({ className }) {
  const [ query, setQuery ] = useState('')
  const [ modalIsOpen, setModalIsOpen ] = useState(false)
  const debouncedQuery = useDebounce(query, 1000)

  const searchBoxRef = useRef()
  useClickOutside(searchBoxRef, () => setQuery(''))

  const handleChange = (event) => {
    setQuery(event.target.value)
  }

  return (
    <StyledSearchBar xs>
      <FlexGroup className={className} gutter={8} center>
        <StyledLogo xs onClick={() => setModalIsOpen(true)} />
        <StyledSearchInput query={query} type="text" placeholder="Search.." onClick={() => {}} onChange={handleChange} />
      </FlexGroup>
      <SearchBox ref={searchBoxRef} query={debouncedQuery} />
      <Modal
        isOpen={modalIsOpen}
        style={customStyles}
        contentLabel="Search Modal"
      >
        <SkeletonTheme color="#191927" highlightColor="#313154">
          <FlexGroup series center justify="space-around">
            <ResponsiveSearchBar gutterXs={5} center series>
              <StyledLogo />
              <StyledSearchInput xs query={query} type="text" placeholder="Search.." onClick={() => {}} onChange={handleChange} />
            </ResponsiveSearchBar>
            <StyledCloseLogo onClick={() => setModalIsOpen(false)} />
          </FlexGroup>
          {!query && (
            <FlexGroup center paddingTop={100}>
              <StyledNetflixLogo />
            </FlexGroup>
          )}
          <SearchBox xs ref={searchBoxRef} query={debouncedQuery} />
        </SkeletonTheme>
      </Modal>
    </StyledSearchBar>
  )
}

export default styled(SearchBar)`
  padding: 5px;
  border-radius: 5px;
  background: transparent;
  border: 1px solid #717171;
  padding-left: 10px;

  @media ${breakpoints.mobileL} {
    border: none;
    margin: 0px;
  }
`
