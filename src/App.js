import './App.css';
import React, { createContext, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import Home from './Component/Home/Home';
import Header from './Component/Header/Header';
import Login from './Component/Login/Login';
import AddProduct from './Component/AddProduct/AddProduct';
import CheckOut from './Component/ChekOut/CheckOut';
import PrivateRoute from './Component/Privat/PrivateRout';
import Admin from './Component/Admin/Admin';
import Order from './Component/Order/Order';

export const UserContext = createContext();

function App() {
  const [loggedInUser, setLoggedInUser] = useState({});

  return (

    <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
      <Router>
        <Header></Header>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/addProduct">
            <AddProduct></AddProduct>
          </Route>
          <Route exact path="/home">
            <Home />
          </Route>

          <Route path="/login">
            <Login />
          </Route>
          <PrivateRoute path="/product/:productId">
            <CheckOut />
          </PrivateRoute>
          <Route path="/Order">
            <Order />
          </Route>
          <Route path="/admin">
            <Admin />
          </Route>
        </Switch>
      </Router>

    </UserContext.Provider>
  );
}

export default App;
