import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

import Home from './pages/Home';
import MyBusiness from './pages/MyBusiness'
import UpdateBusines from './pages/UpdateBusiness';
import Connect from './pages/Connect';
import SingleBusiness from './pages/SingleBusiness';

import Navv from './components/Navbar';
import StoreProvider from './utils/GlobalState';

const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <StoreProvider>
          <Navv />
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/mybusiness' component={MyBusiness} />
            <Route exact path='/update/:id' component={UpdateBusines} />
            <Route exact path='/businesses/:id' component={SingleBusiness} />
            <Route exact path='/connect' component={Connect} />
            <Route render={() => <h1 className='display-2'>Wrong page!</h1>} />
          </Switch>
        </StoreProvider>
      </Router>
      </ApolloProvider>
  );
}

export default App;
