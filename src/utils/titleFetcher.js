import fetch from 'isomorphic-unfetch'

const titleFetcher = (url, query, orderBy = 'Date', country = 337, offset = 0) => {
  if (!url) return null

  const requestUrl = `${url}&orderby=${orderBy}&countrylist=${country}&offset=${offset || 0}&query=${query || ''}`

  return fetch(requestUrl, { headers: {
    'x-rapidapi-host': process.env.REACT_APP_API_URL,
    'x-rapidapi-key': process.env.REACT_APP_API_KEY
  } }).then((res) => res.json())
}

export default titleFetcher
