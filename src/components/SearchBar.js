import React from 'react'
import styled from 'styled-components'
import { ReactComponent as SearchLogo } from '../assets/icons/search.svg'

import FlexGroup from './containers/FlexGroup'

const StyledLogo = styled(SearchLogo)`
  width: 20px;
  fill: #1a1a27;
`

const StyledSearchInput = styled.input`
  display: flex;
  background: inherit;
  border: none;
  height: 22px;
  outline: none;
  color: white;
  font-size: 1rem;
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
