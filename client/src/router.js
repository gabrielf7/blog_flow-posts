import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

// import Home from './pages/_Home/home';
import Dashboard from './pages/Dashboard/dashboard';
import LogUser from './pages/Login/login';
import RegUser from './pages/Login/register';
import Page404 from './pages/page404';

export const penvp = process.env.PUBLIC_URL;

export default function Router(){
  return(
    <BrowserRouter>
      <Switch>
        <Route path={  '/'} exact component={LogUser} />
        <Route path={  '/dashboard'} component={Dashboard} />
        {/* <Route path={  '/login'} component={LogUser} /> */}
        <Route path={  '/register'} component={RegUser} />
        <Route component={Page404} />
      </Switch>
    </BrowserRouter>
  );
}