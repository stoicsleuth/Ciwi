import React, { useState, useRef } from 'react'
import styled from 'styled-components'

import { ReactComponent as SearchLogo } from '../assets/icons/search.svg'
import FlexGroup from './containers/FlexGroup'
import SearchBox from './SearchBox'
import useDebounce from '../hooks/useDebounce'
import useClickOutside from '../hooks/useClickOutside'


const StyledLogo = styled(SearchLogo)`
  fill: #1a1a27;
  width: 20px;
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
`

const StyledSearchBar = styled.div`
  position: relative;
`

function SearchBar({ className }) {
  const [ query, setQuery ] = useState('')
  const debouncedQuery = useDebounce(query, 1000)

  const searchBoxRef = useRef()
  useClickOutside(searchBoxRef, () => setQuery(''))

  const handleChange = (event) => {
    setQuery(event.target.value)
  }

  return (
    <StyledSearchBar>
      <FlexGroup className={className} gutter={8}>
        <StyledLogo />
        <StyledSearchInput query={query} type="text" placeholder="Search.." onClick={() => {}} onChange={handleChange} />
      </FlexGroup>
      <SearchBox ref={searchBoxRef} query={debouncedQuery} />
    </StyledSearchBar>
  )
}

export default styled(SearchBar)`
  padding: 5px;
  background: #42425d;
  border-radius: 5px;
`
