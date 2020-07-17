import React, { useContext, useState, useEffect, Fragment } from 'react'
import Skeleton from 'react-loading-skeleton'
import styled from 'styled-components'
import sWR, { useSWRPages } from 'swr'

import { Link } from 'react-router-dom'
import Header from '../Header'
import { titleFetcher } from '../../utils/titleFetcher'
import commonSearchString from '../../constants/commonSearchString'
import FlexGroup from '../containers/FlexGroup'
import breakpoints from '../../constants/breakpoints'
import CountryFilterContext from '../../contexts/CountryFilterContext'

const PageContainer = styled.div`
  padding: 50px;
  max-width: 1300px;
  margin: auto;
  margin-top: 50px;

  @media ${breakpoints.mobileL} {
    padding: 20px;
  }
`

const ImageGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill,minmax(170px,1fr));
  grid-gap: 20px;
  margin: 0 15px;

  @media ${breakpoints.mobileL} {
    grid-template-columns: repeat(auto-fill,minmax(124px,1fr));
  }
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

  @media ${breakpoints.mobileL} {
    width: 124px;
    margin: auto;
    height: 170px;
  }
`

const LoadButton = styled.button`
  margin-top: 35px;
  padding: 9px 33px;
  background: #ffc926;
  text-transform: capitalize;
  text-align: center;
  border-radius: 8px;
  border: 0px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 700;
  color: #100f19;
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

    @media ${breakpoints.mobileL} {
      font-size: 1rem;
      line-height: normal;
    }
  }

  span {
    color: #ee2f2f;
    font-weight: 700;
  }
`

function Home({ orderBy = 'rating' }) {
  // TODO: Add filters for country, type(movie/TV) & genre
  const { countryFilter } = useContext(CountryFilterContext)

  const [ currentPage, setCurrentPage ] = useState(1)
  const [ keyOffset, setKeyOffset ] = useState(Math.floor(Math.random() * 100))

  useEffect(() => {
    setCurrentPage(1)
  }, [ orderBy ])

  const {
    pages,
    isLoadingMore,
    isReachingEnd,
    loadMore
  } = useSWRPages(
    `${orderBy}-kkk${keyOffset}`,

    // page component
    ({ offset, withSWR }) => {
      console.log(keyOffset)
      const { data: { results } = {} } = withSWR(
        sWR(
          [ commonSearchString,
            null,
            orderBy,
            countryFilter,
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
    [ orderBy, countryFilter ]
  )

  useEffect(() => {
    loadMore()
  }, [ currentPage ])


  useEffect(() => {
    setKeyOffset(Math.floor(Math.random() * 100))
  }, [ orderBy ])

  const loadResult = () => {
    // loadMore()
    setCurrentPage(currentPage + 1)
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
        <FlexGroup justify="center" center>
          <LoadButton type="LoadButton" onClick={loadResult} disabled={isReachingEnd || isLoadingMore}>
            {isLoadingMore ? 'Loading..' : isReachingEnd ? 'no more data' : 'load more'}
          </LoadButton>
        </FlexGroup>
      </PageContainer>
    </Fragment>
  )
}

export default Home
