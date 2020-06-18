import fetchAPI from 'isomorphic-unfetch'

const fetch = (requestUrl) => fetchAPI(requestUrl, { headers: {
  'x-rapidapi-host': process.env.REACT_APP_API_URL,
  'x-rapidapi-key': process.env.REACT_APP_API_KEY
} }).then((res) => res.json())

const titleFetcher = (url, query, orderBy = 'Date', country = 337, offset = 0) => {
  if (!url) return null

  const requestUrl = `${url}&orderby=${orderBy}&countrylist=${country}&offset=${offset || 0}&query=${query || ''}`

  return fetch(requestUrl)
}

const titleDetailsFetcher = (url, id) => {
  if (!id) return null

  const requestUrl = `${url}&netflixid=${id}`

  return fetch(requestUrl)
}

const titleImageFetcher = (url, id) => {
  if (!id) return null

  const requestUrl = `${url}&limit=50&netflixid=${id}`

  return fetch(requestUrl)
}

export {
  titleFetcher, titleDetailsFetcher, titleImageFetcher
}
