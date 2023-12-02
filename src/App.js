import React from "react";
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Login from "./components/login.jsx";
import Register from "./components/Register";
import ChatComponent from "./components/testChat";
import Cookies from 'cookies-js';
import Home from './components/Home.jsx'


function App() {
  //console.log(Cookies.get('user'));
  return (
    <Router>
      <Switch>
      <Route path="/" exact render={() => (Cookies.get('user') ? <Home /> : <Login />)} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path='/chat' component={ChatComponent} />
      </Switch>
    </Router>
  );
}

export default App;
