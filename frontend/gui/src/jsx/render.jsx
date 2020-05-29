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

<<<<<<< HEAD
export function Site() {
  return (
    <BrowserRouter>
=======
   function isLoged(){
      let login = localStorage.getItem('token') ? true : false;
      console.log(login);
    return login;
  }
  export function Site(){
    return(
      <BrowserRouter>
>>>>>>> a31b4c18f8d76ac2acfdeca3f6a37442854c470d
      <Switch>
        <Route exact path="/" render={() => (!isLoged() ? <Redirect to="/auth" /> : <Redirect form="/auth"  to="/home" />)} /> />
        {isLoged() ? <Redirect from="/auth" to="/home" /> : <Route exact={true} path="/auth" component={Auth} />}
        {isLoged() ? <Route exact path="/home" component={Main} /> : <Redirect from="/home" to="/auth" />}
<<<<<<< HEAD
        {/* <Route exact path="/"  */}
        
      </Switch>
    </BrowserRouter>
  );
}
=======
      </Switch>
    </BrowserRouter>
    );
  }
>>>>>>> a31b4c18f8d76ac2acfdeca3f6a37442854c470d
