import React from 'react';
import { Register } from './Pages/RegisterPage/Register';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Signin } from './Pages/SigninPage/Signin';
import { Home } from './Components/Home/Home';
import { ForgotPass } from './Pages/ForgotPass/ForgotPass';
import { Dashboard } from './Components/Dashboard/Dashboard';
import {ProtectedRoute} from './Components/ProtectedRoute/ProtectedRoute';
import { UserFilesList } from './Components/UserFilesList/UserFilesList';
import './App.css';

function App() {
  
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/user/dashboard" ><ProtectedRoute Cmp={Dashboard}/></Route>
          <Route exact path="/user/dashboard/files" ><ProtectedRoute Cmp={UserFilesList}/></Route>
          <Route exact path="/account/register" component={Register} />
          <Route exact path="/account/signin" component={Signin} />
          <Route exact path="/account/forgotpass" component={ForgotPass} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
