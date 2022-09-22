import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Navbar, Sidebar, Footer } from './components';
import {
  AboutPage,
  Cart,
  Error,
  PrivateRoute,
  ProductsPage,
  SingleProductPage,
  CheckoutPage,
  HomePage,
  AuthWrapper,
} from './pages';

function App() {
  return (
    <AuthWrapper>
      <Router>
        <Navbar></Navbar>
        <Sidebar></Sidebar>
        <Switch>
          <PrivateRoute exact path='/CheckoutPage'>
            {' '}
            <CheckoutPage></CheckoutPage>
          </PrivateRoute>

          <Route exact path='/'>
            {' '}
            <HomePage></HomePage>
          </Route>
          <Route exact path='/Cart'>
            {' '}
            <Cart></Cart>
          </Route>
          <Route exact path='/AboutPage'>
            {' '}
            <AboutPage></AboutPage>
          </Route>

          <Route exact path='/Products'>
            {' '}
            <ProductsPage></ProductsPage>
          </Route>

          <Route
            exact
            path='/SingleProductPage/:id'
            children={<SingleProductPage />}
          />

          <Route path='*'>
            {' '}
            <Error></Error>
          </Route>
        </Switch>
        <Footer></Footer>
      </Router>
    </AuthWrapper>
  );
}

export default App;
