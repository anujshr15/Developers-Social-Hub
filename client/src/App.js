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
import EditProfile from './components/editProfile/editProfile';
import AddExperience from './components/addExperience/addExperience';
import AddEducation from './components/addEducation/addEducation';
import Profiles from './components/profiles/profiles';
import Profile from './components/profile/Profile';
import NotFound from './components/not-found/NotFound';
import Posts from './components/posts/Posts';
import Post from './components/post/Post';
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
          <Route path="/all" exact component={Profiles}/>
          <Route path="/profile/:handle" exact component={Profile}/>
                    <Switch>
          <PrivateRoute path="/dashboard" exact component={Dashboard}/>
          </Switch>
           <Switch>
          <PrivateRoute path="/create-profile" exact component={CreateProfile}/>
          </Switch>
          <Switch>
          <PrivateRoute path="/edit-profile" exact component={EditProfile}/>
          </Switch>
          <Switch>
          <PrivateRoute path="/add-experience" exact component={AddExperience}/>
          </Switch>
          <Switch>
          <PrivateRoute path="/add-education" exact component={AddEducation}/>
          </Switch>
          <Switch>
          <PrivateRoute path="/feed" exact component={Posts}/>
          </Switch>
          <Switch>
          <PrivateRoute path="/post/:id" exact component={Post}/>
          </Switch>
          <Route path="/not-found" exact component={NotFound}/>
          
        </div>
        <Footer/>
        </div>
      </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
