import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import { SkeletonTheme } from 'react-loading-skeleton'
import { SWRConfig } from 'swr'
import fetch from 'isomorphic-unfetch'
import React, { useState, useContext } from 'react'

import { Home, Title } from './components/pages'
import CountryFilterContext from './contexts/CountryFilterContext'


const App = () => {
  const [ countryFilter, setCountryFilter ] = useState([ 337 ])

  return (
    <BrowserRouter>
      <SWRConfig
        value={{
          fetcher: (...args) => fetch(...args, { headers: {
            'x-rapidapi-host': process.env.REACT_APP_API_URL,
            'x-rapidapi-key': process.env.REACT_APP_API_KEY
          } }).then((res) => res.json())
        }}
      >
        <SkeletonTheme color="#191927" highlightColor="#313154">
          <CountryFilterContext.Provider value={{ countryFilter, setCountryFilter }}>
            <Switch>
              <Route exact path="/">
                <Redirect to="/new" />
              </Route>
              <Route
                path="/new"
                render={(props) => <Home {...props} orderBy="new" key={Math.floor(Math.random() * 100)} />}
                exact
              />
              {' '}
              <Route
                path="/popular"
                render={(props) => <Home {...props} orderBy="rating" key={Math.floor(Math.random() * 100)} />}
                exact
              />
              <Route
                path="/title/:id"
                render={(props) => <Title {...props} />}
                exact
              />
              {/* <Route path="/:id" component={Id} exact />
          <Route path="/:id/details" component={Details} exact /> */}
            </Switch>
          </CountryFilterContext.Provider>
        </SkeletonTheme>
      </SWRConfig>
    </BrowserRouter>
  )
}


export default App
