import fetch from 'isomorphic-unfetch'

const titleFetcher = (url, orderBy, country, offset) => {
  const requestUrl = `${url}&orderby=${orderBy}&countrylist=${country}&offset=${offset || 0}`
  console.log(process.env.REACT_APP_API_URL, process.env.REACT_APP_API_KEY)

  return fetch(requestUrl, { headers: {
    'x-rapidapi-host': process.env.REACT_APP_API_URL,
    'x-rapidapi-key': process.env.REACT_APP_API_KEY
  } }).then((res) => res.json())
}

export default titleFetcher
