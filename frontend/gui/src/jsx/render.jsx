import { BrowserRouter, Route,Switch,Redirect} from 'react-router-dom';
import ReactDOM from "react-dom";
import React from "react";
import Auth from './Auth'
import Main from './Main'

export default function render(container) {
    ReactDOM.render(<Site />, container);
  }

   function isLoged(){
      let login = localStorage.getItem('token') ? true : false;
      console.log(login);
    return login;
  }
  export function Site(){
    return(
        // hea mast be Main and Auth
      <BrowserRouter>
      {/* <Redirect exact from="/" to="/auth" /> */}
                  <Switch>
                      
                    
                    {/* <Route exact path="/auth" render={() => (!isLoged() ? (<Redirect to="/home"/>) : (<Redirect to="/auth"/>))}/> */}
                            {/* <Route exact={true} path='/'>
                            {() => isLoged ? (<Redirect to="/"/>) : (<Redirect to="/"/>)}
                                    <Redirect to="/auth"/>
                            </Route> */}
                    {/* <Route exact={true} path="/home" component={Main} /> */}
                    <Route exact={true} path="/auth" component={Auth} />
                    {isLoged() ? (
                              <Route exact path="/home" component={Main} />
                                        ) : (
                              <Redirect to="/auth" />
                    )}
                    {/* {!isLoged() ? (
                              <Route exact path="/auth" component={Auth} />
                                        ) : (
                              <Redirect to="/home" />
                    )} */}
                    <Route exact path="/" render={() => (!isLoged() ? (<Redirect to="/auth"/>) : (<Redirect to="/home"/>))}/>
                  </Switch>
      </BrowserRouter>
    );
  }