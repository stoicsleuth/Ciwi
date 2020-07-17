import React, { Fragment, useContext } from 'react'
import styled from 'styled-components'
import useSWR from 'swr'
import { unescape } from 'lodash'

import Skeleton from 'react-loading-skeleton'
import commonSearchString from '../constants/commonSearchString'
import { titleFetcher } from '../utils/titleFetcher'
import FlexGroup from './containers/FlexGroup'
import CountryFilterContext from '../contexts/CountryFilterContext'
import breakpoints from '../constants/breakpoints'


const Ul = styled.ul`
  list-style-type: none;
  margin: 0px;
  padding: 0px;
  width: 100%;

  & > * {
    margin-bottom: 10px;
  }
`

const StyledSearchBox = styled.div`
  padding: 10px;
  position: absolute;
  left: 0px;
  right: 0px;
  background-color: #191927;
  z-index: 10;
  max-height: 500px;
  overflow: scroll;

  @media ${breakpoints.mobileL} {
    margin-top: 30px;
    left: 20px;
    right: 20px;
    display: ${({ xs }) => (!xs ? 'none' : 'flex')};
  }
`

const Image = styled.img.attrs(({ src, alt }) => ({ src, alt }))`
  width: ${({ width }) => `${width}px`};
  height: ${({ height }) => `${height}px`};
  object-fit: cover;
  border-radius: 100px;
`

function TitlePoster({ ...props }) {
  return <Image {...props} />
}

const Text = styled.p`
  margin-top: ${({ marginT }) => `${marginT || 0}px`};
  margin-bottom: ${({ marginB }) => `${marginB || 0}px`};
  color: #fff;
`

function TitleResultView({ title: { title, vtype, _year, img } = {}, loading } = {}) {
  return (
    <FlexGroup paddingV={10} background="#12111b" align="center" radius={5} height={55} series>
      {loading
        ? <Skeleton width={55} height={55} />
        : <TitlePoster src={img} alt={title} width={55} height={55} />}
      <FlexGroup direction="column" fullHeight justify="center">
        {loading
          ? <Skeleton width={150} />
          : (
            <Fragment>
              <Text>{unescape(title)}</Text>
              <Text>{vtype}</Text>
            </Fragment>
          )}
      </FlexGroup>
    </FlexGroup>
  )
}

const SearchBox = React.forwardRef(({ query, ...rest }, ref) => {
  const { countryFilter } = useContext(CountryFilterContext)

  const { data } = useSWR(() => (query ? [ commonSearchString, query, null, countryFilter ] : null), titleFetcher)
  const { results, total } = data || {}

  if (!query.trim()) {
    return null
  }

  return (
    <StyledSearchBox ref={ref} {...rest}>
      <Ul>
        {!data && new Array(3).fill(undefined).map(() => (
          <TitleResultView loading />
        ))}
        {results?.map((title) => (
          <TitleResultView title={title} />
        ))}
        {total === 0 && (
          <Text>No Results Found</Text>
        )}
      </Ul>
    </StyledSearchBox>
  )
})

export default SearchBox
