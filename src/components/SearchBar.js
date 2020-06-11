import React from 'react'
import styled from 'styled-components'

import { ReactComponent as SearchLogo } from '../assets/icons/search.svg'
import FlexGroup from './containers/FlexGroup'

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
  width: 150px;

  &:focus {
    width: 200px;
  }
`

function SearchBar({ className }) {
  return (
    <FlexGroup className={className} gutter={8}>
      <StyledLogo />
      <StyledSearchInput type="text" placeholder="Search.." onClick={() => {}} />
    </FlexGroup>
  )
}

export default styled(SearchBar)`
  padding: 5px;
  background: #42425d;
  border-radius: 5px;
`
