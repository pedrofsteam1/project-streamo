
import './App.css';

import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import {GlobalContext, global} from './modules/Ws-Client/Global-Context';

import Auth from './modules/Auth/Auth';

//Page import
import Web from './pages/Web/Web';
import Main from './pages/Main/Main';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register'
import Watch from "./pages/Watch/Watch";



function App({auth}) {
  Authenticate.isAuthenticated = auth;
  return (
    <BrowserRouter basename="/project-streamo">
      <Switch>
          <GlobalContext.Provider value={global}>
              <Route path= "/" exact={true} component={Login} />
              <Route path= "/login" exact={true} component={Login} />
              <Route path= '/register' exact={true} component={Register} />
              <PrivateRoute path= "/main" exact={true} component={Main}/>
              <PrivateRoute path= "/web" exact={true} component={Web} />
              <PrivateRoute path= '/watch' exact={true} component={Watch} />
          </GlobalContext.Provider>    
      </Switch>
  </BrowserRouter>
  );
}




const Authenticate = {
  isAuthenticated: '',
  authenticate() {
    this.isAuthenticated = false;
  },
  signout() {
    this.isAuthenticated = false;
  }
};

function PrivateRoute({ component: Component, ...rest }) {

  return (
    <Route
      {...rest}
      render={props =>
        Authenticate.isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
}

export default App;
