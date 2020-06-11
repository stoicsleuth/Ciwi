import React, {useState} from 'react'
import styled from 'styled-components'
import { ReactComponent as SearchLogo } from '../assets/icons/search.svg'

import FlexGroup from './containers/FlexGroup'
import StyledBox from './StyledBox'

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
  const [newFilter,setNewFilter] = useState('')
  const handleChange = (event) => {
    setNewFilter(event.target.value)
  }
  return (
    <FlexGroup className={className} gutter={8}>
      <StyledLogo />
      <StyledSearchInput type="text" placeholder="Search.." onClick={() => {}} onChange={handleChange} />
      <StyledBox newFilter={newFilter} result={["Jojo Rabbit","Pushing Daisies","What We Do In The Shadows","Father Ted","Ted"]} />
    </FlexGroup>
  )
}

export default styled(SearchBar)`
  padding: 5px;
  background: #42425d;
  border-radius: 5px;
`
