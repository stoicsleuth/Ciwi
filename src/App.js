import React from 'react';
import {
  BrowserRouter,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Header from './components/header';
const App = () => {
  return (
    <main>
        <Header />
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/:id" component={Id} exact />
          <Route path="/:id/details" component={Details} exact />
        </Switch>
    </main>
)
}



export default App;
