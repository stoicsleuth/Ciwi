import React, { Fragment, useState, useEffect } from 'react'
import Skeleton from 'react-loading-skeleton'
import styled from 'styled-components'
import sWR, { useSWRPages } from 'swr'

import { Link } from 'react-router-dom'
import Header from '../Header'
import { titleFetcher } from '../../utils/titleFetcher'
import commonSearchString from '../../constants/commonSearchString'
import FlexGroup from '../containers/FlexGroup'

const PageContainer = styled.div`
  padding: 50px;
  margin-top: 50px;
`

const ImageGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill,minmax(170px,1fr));
  grid-gap: 20px;
  margin: 0 15px;
`
const TitleCard = styled.div`
  position: relative;
  background: #191927;
  width: 166px;
  height: 233px;
  border-radius: 9px;
  overflow: hidden;
  display: flex;
  justify-content: center;
`

const LoadButton = styled.button`
  margin-top: 35px;
  padding: 9px 33px;
  background: #ffc926;
  color: black;
  font-size: 1.1rem;
  font-weight: 900;
  text-transform: capitalize;
  text-align: center;
  border-radius: 8px;
  border: 0px;
  cursor: pointer;
`

const IntroText = styled.div`
  color: white;
  padding: 5px 15px;
  margin-bottom: 30px;

  h3 {
    font-size: 1.5rem;
    font-weight: 400;
  }

  h4 {
    font-size: 1.1rem;
    font-weight: 400;
    line-height: 4px;
  }

  span {
    color: #ee2f2f;
    font-weight: 700;
  }
`

function Home({ orderBy = 'rating' }) {
  // TODO: Add filters for country, type(movie/TV) & genre
  const [ country, setCountry ] = useState(337)
  const [ currentPage, setCurrentPage ] = useState(1)

  useEffect(() => {
    setCurrentPage(0)
  }, [ orderBy ])

  const {
    pages,
    isLoadingMore,
    isReachingEnd,
    loadMore
  } = useSWRPages(
    `${orderBy}`,

    // page component
    ({ offset, withSWR }) => {
      const { data: { results } = {} } = withSWR(
        sWR(
          [ commonSearchString,
            null,
            orderBy,
            country,
            offset
          ], titleFetcher
        )
      )

      if (!results) {
        return new Array(20).fill(undefined).map(() => (
          <TitleCard>
            <Skeleton width={166} height={233} />
          </TitleCard>
        ))
      }

      return results.map((title) => (
        <TitleCard>
          <Link to={`/title/${title.nfid}`}>
            <img width="100%" src={title.img} alt="" />
          </Link>
        </TitleCard>
      ))
    },

    // Calculate offset to be passed to page component
    ({ data: { results } }) => (results && results.length
      ? (results.length * currentPage) + 1
      : null),

    // Dependencies
    [ orderBy, country ]
  )

  const loadResult = () => {
    setCurrentPage(currentPage + 1)
    loadMore()
  }

  return (
    <Fragment>
      <Header />
      <PageContainer>
        <IntroText>
          <h3>
            Welcome to
            {' '}
            <strong>CIWI</strong>
            . (Can I watch it?)
          </h3>
          <h4>Search for your favourite movies/series and check if they are available with content providers.</h4>
          <h4>
            Available for
            {' '}
            <span>Netflix</span>
            , more providers coming soon.
          </h4>
        </IntroText>
        <ImageGrid>
          {pages}
        </ImageGrid>
        <FlexGroup justify="center">
          <LoadButton type="LoadButton" onClick={loadResult} disabled={isReachingEnd || isLoadingMore}>
            {isLoadingMore ? 'Loading..' : isReachingEnd ? 'no more data' : 'load more'}
          </LoadButton>
        </FlexGroup>
      </PageContainer>
    </Fragment>
  )
}

export default Home
