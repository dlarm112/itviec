import React, {useState} from 'react';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { Switch, Route, Redirect } from "react-router-dom";
import Jobs from './page/Jobs';
import Login from './page/Login';
import Details from './page/Details'
import NavBar from './components/NavBar'
import { useSelector } from "react-redux";


function App() {

  let user = useSelector((state) => state.user);


  const ProtectedRoute = (props) => {

    if (user.isAuthenticated) {
      console.log("pass")
      return <Route {...props} />;
    } else {
      console.log("protected")
      return <Redirect to="/login" />;
    }
  };

  return (
    <div>
      <NavBar/>
    <div className="center">
      

      <Switch>
        
        <ProtectedRoute path="/jobs/:id" render={(props) => <Details{...props}/>}/>
        <Route path="/jobs" component={Jobs}/>
        <Route path="/login" component={Login}/>
        <Route path="/" component={Jobs}/>
        
      </Switch>
    </div>
    </div>
  );
}

export default App;
