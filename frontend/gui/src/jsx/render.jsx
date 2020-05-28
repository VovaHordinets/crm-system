import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import ReactDOM from "react-dom";
import React from "react";
import Auth from "./Auth";
import Main from "./Main";



export default function render(container) {
  ReactDOM.render(<Site />, container);
}

function isLoged() {
  let login = localStorage.getItem("token") ? true : false;
  return login;
}

export function Site() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" render={() => (!isLoged() ? <Redirect to="/auth" /> : <Redirect form="/auth"  to="/home" />)} /> />
        {isLoged() ? <Redirect from="/auth" to="/home" /> : <Route exact={true} path="/auth" component={Auth} />}
        {isLoged() ? <Route exact path="/home" component={Main} /> : <Redirect from="/home" to="/auth" />}
        {/* <Route exact path="/"  */}
        
      </Switch>
    </BrowserRouter>
  );
}
