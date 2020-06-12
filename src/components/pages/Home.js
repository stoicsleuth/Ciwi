import React, { Fragment, useState, useEffect } from 'react'
import Skeleton from 'react-loading-skeleton'
import styled from 'styled-components'
import sWR, { useSWRPages } from 'swr'

import Header from '../Header'
import titleFetcher from '../../utils/titleFetcher'
import commonSearchString from '../../constants/commonSearchString'

const PageContainer = styled.div`
  padding: 50px;
`

const ImageGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill,minmax(170px,1fr));
  grid-gap: 15px;
  margin: 0 15px;
`
const TitleCard = styled.div`
  position: relative;
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
        // TODO: Make these links, overlay with title type
        <TitleCard>
          <img src={title.img} alt={title.title} />
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
        <ImageGrid>
          {pages}
        </ImageGrid>
        <button type="button" onClick={loadResult} disabled={isReachingEnd || isLoadingMore}>
          {isLoadingMore ? '. . .' : isReachingEnd ? 'no more data' : 'load more'}
        </button>
      </PageContainer>
    </Fragment>
  )
}

export default Home
