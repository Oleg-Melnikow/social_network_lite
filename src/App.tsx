import React from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import {Header} from "./components/Header/Header";
import {NavBar} from "./components/NavBar/NavBar";
import {Profile} from "./components/Profile/Profile";
import DialogsContainer from "./components/Dialogs/DialogsContainer";
import UsersContainer from "./components/Users/UsersContainer";

function App() {
  return (
      <div className="app-wrap">
        <Header/>
        <NavBar/>
          <div className="wrap-content">
              <Route path="/profile" render={() => <Profile/>}/>
              <Route path="/dialogs" render={() => <DialogsContainer/>}/>
              <Route path="/users" render={() => <UsersContainer/>}/>
          </div>
      </div>
  );
}

export default App;
