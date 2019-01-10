import React, { Component } from 'react';
import {BrowserRouter ,Route} from 'react-router-dom';
import './App.css';
import {Switch} from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utility/setAuthToken';
import * as actions from './store/action/actions';
import {Provider} from 'react-redux';
import store from './store/store.js';
import Navbar from './containers/Layout/Navbar';
import Middle from './components/LayoutItems/middle.js';
import Footer from './components/LayoutItems/footer.js';
import Register from './components/Auth/register';
import Login from './components/Auth/login';
import Dashboard from './containers/Dashboard/Dashboard'
import * as profileActions from './store/action/profileActions'
import PrivateRoute from './components/privateRoute/PrivateRoute';
import CreateProfile from './components/createProfile/createProfile';
import EditProfile from './containers/Dashboard/editProfile/editProfile';

if(localStorage.jwtToken)
{

  setAuthToken(localStorage.jwtToken);

  const decode=jwt_decode(localStorage.jwtToken)

  store.dispatch(actions.setCurrentUser(decode));

  if(decode.exp < Date.now()/1000)
  {
    store.dispatch(actions.logoutUser())
    store.dispatch(profileActions.clearCurrentProfile())
    window.location.href="/login";
  }

}



class App extends Component {
  render() {
    return (
      <Provider store={store}>
      <BrowserRouter>
      <div className="App">
        <Navbar/>
        <Route path="/" exact component={Middle}/>
        <div className="container">
         <Route path="/register" exact component={Register}/>
          <Route path="/login" exact component={Login}/>
          <Switch>
          <PrivateRoute path="/dashboard" exact component={Dashboard}/>
          </Switch>
           <Switch>
          <PrivateRoute path="/create-profile" exact component={CreateProfile}/>
          </Switch>
          <Switch>
          <PrivateRoute path="/edit-profile" exact component={EditProfile}/>
          </Switch>
        </div>
        <Footer/>
        </div>
      </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
