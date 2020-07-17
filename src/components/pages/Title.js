import { LazyLoadImage } from 'react-lazy-load-image-component'
import { unescape } from 'lodash'
import { useParams, Link } from 'react-router-dom'
import React, { Fragment } from 'react'
import Skeleton from 'react-loading-skeleton'
import styled from 'styled-components'
import useSWR from 'swr'
import 'react-lazy-load-image-component/src/effects/blur.css'

import { ReactComponent as PlayLogo } from '../../assets/icons/play-button.svg'
import { ReactComponent as StarLogo } from '../../assets/icons/star.svg'
import { titleDetailsFetcher, titleImageFetcher } from '../../utils/titleFetcher'
import { titleSearchString, imageSearchString } from '../../constants/commonSearchString'
import FlexGroup from '../containers/FlexGroup'
import Header from '../Header'
import breakpoints from '../../constants/breakpoints'

const PageContainer = styled.div`
  height: 100vh;
  position: relative;
  overflow-x: hidden;

  & > img {
    height: 100%;
    position: absolute;
    z-index: -1;
    opacity: 0.5;
    box-shadow: 0px 2px 10px 0px rgba(0,0,0,0.2);
    object-fit: cover;
  }
`

const MovieTitle = styled.p`
  font-size: 6rem;
  font-weight: 900;
  color: white;
  padding: 5px;
  margin: 0px;
  max-width: 500px;
  letter-spacing: -2.5px;
  line-height: 1.1;

  @media ${breakpoints.mobileL} {
    font-size: 2rem;
  }
`

const MovieYear = styled.p`
  font-size: 1.2rem;
  font-weight: 500;
  color: white;
  margin: -10px;
  padding: 5px;
  display: ${({ xs }) => (xs ? 'none' : 'block')};

  @media ${breakpoints.mobileL} {
    display: ${({ xs }) => (!xs ? 'none' : 'inline')};
    margin-left: 9px;
    font-size: 0.9rem;
    font-weight: 700;
    letter-spacing: 0px;
  }
`

const MovieRating = styled(FlexGroup)`
  align-items: center;

  p {
    font-size: 1.2rem;
    font-weight: 500;
    color: white;
    margin: 0px;
    padding: 5px;
  }

  svg {
    fill: white;
    width: 20px;
  }

  @media ${breakpoints.mobileL} {
    margin-bottom: 25px;
  }
`

const MovieDesc = styled(MovieYear)`
  max-width: 500px;
  margin: 0px;
  font-size: 1.3rem;

  @media ${breakpoints.mobileL} {
    font-size: 1.1rem;
    margin-left: 0px;
    display: block;
  }
`

const MoviePoster = styled.div`
  display: flex;
  background: #191927;
  width: 250px;
  height: 355px;
  border-radius: 8px;

  & > span {
    display: block;
  }

  & > span > img {
    max-width: 250px;
    width: auto;
    height: 100%;
    border-radius: 8px;
  }

  @media ${breakpoints.mobileL} {
    width: 155px;
    height: 220px;
    margin: 0px;
  }
`

const TitleType = styled.div`
  display: flex;
  padding: 9px 33px;
  background: #ffc926;
  color: black;
  font-size: 1.1rem;
  font-weight: 900;
  text-transform: capitalize;
  margin: 20px 10px;
  width: auto;
  text-align: center;
  border-radius: 8px;

  svg {
    width: 20px;
    margin-right: 12px;
  }
`

const WatchButton = styled(TitleType)`
  background: #df0000;
  color: white;

  svg {
    fill: white;
  }

  @media ${breakpoints.mobileL} {
    width: 128px;
  }
`

const MovieDetails = styled.div`
  height: 100%;
  max-height: 500px;
  padding: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media ${breakpoints.mobileL} {
    padding: 10px;
    height: auto;
  }
`

function Title() {
  const { id } = useParams()

  const { data: { results: movieImages = [] } = {} } = useSWR(() => (id ? [ imageSearchString, id ] : null), titleImageFetcher)

  const { data: { results: movieDetails = {} } = {} } = useSWR(() => (id ? [ titleSearchString, id ] : null), titleDetailsFetcher)

  // if (!results || !movieDetails) return <p>Loading</p>
  const detailsLoading = !movieDetails.length
  // const imageLoading = !movieImages.length

  const bgImages = movieImages?.filter((result) => result.itype === 'bg') || []
  const details = movieDetails[0] || {}
  // const posterImg = details.lgimg || details.img

  const handleImageError = (e) => {
    e.target.onerror = null
    e.target.src = bgImages[1]?.url
  }

  return (
    <Fragment>
      <Header variant="transparent" />
      <PageContainer>
        <img
          placeholderSrc={<p>Yo</p>}
          width="100%"
          effect="blur"
          src={bgImages[0]?.url}
          alt={details.title}
          onError={handleImageError}
        />
        <FlexGroup maxWidth={1300} wrap fullHeight center paddingV={0} paddingH={50}>
          <MoviePoster>
            {detailsLoading
              ? <Skeleton />
              : (
                <LazyLoadImage
                  effect="blur"
                  width="100%"
                  src={details.lgimg || details.img}
                  alt=""
                />
              )}
          </MoviePoster>
          <MovieDetails>
            <FlexGroup center>
              {detailsLoading && <Skeleton width={50} height={15} />}
              <MovieYear>{details.year}</MovieYear>
              <MovieRating series>
                {details.imdbrating > 0 && (
                  <Fragment>
                    <StarLogo />
                    <p>{details.imdbrating}</p>
                  </Fragment>
                )}
              </MovieRating>
            </FlexGroup>
            <MovieTitle>
              {detailsLoading
                ? <Skeleton width={200} height={50} /> : unescape(details.title)}
              <MovieYear xs>{details.year}</MovieYear>
            </MovieTitle>
            <MovieDesc>
              {detailsLoading
                ? <Skeleton count={3} width={300} height={20} /> : unescape(details.synopsis)}
            </MovieDesc>
            <FlexGroup stretch series>
              {!detailsLoading && <TitleType type={details.vtype}>{details.vtype}</TitleType>}
              {!detailsLoading && (
                <a href={`https://netflix.com/title/${id}`} rel="noreferrer" target="_blank">
                  <WatchButton type={details.vtype}>
                    <PlayLogo />
                    Watch Now
                  </WatchButton>
                </a>
              )}
            </FlexGroup>
          </MovieDetails>
        </FlexGroup>
      </PageContainer>
    </Fragment>
  )
}

export default Title
