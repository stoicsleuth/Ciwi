import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import { SkeletonTheme } from 'react-loading-skeleton'
import { SWRConfig } from 'swr'
import fetch from 'isomorphic-unfetch'
import React from 'react'

import { Home } from './components/pages'

const App = () => (
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
        <Switch>
          <Route exact path="/">
            <Redirect to="/new" />
          </Route>
          <Route
            path="/new"
            render={(props) => <Home {...props} orderBy="new" key="new" />}
            exact
          />
          {' '}
          <Route
            path="/popular"
            render={(props) => <Home {...props} orderBy="rating" key="rating" />}
            exact
          />
          {/* <Route path="/:id" component={Id} exact />
          <Route path="/:id/details" component={Details} exact /> */}
        </Switch>
      </SkeletonTheme>
    </SWRConfig>
  </BrowserRouter>
)


export default App
