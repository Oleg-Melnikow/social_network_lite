import React from 'react';
import './App.css';
import {Header} from "./components/Header/Header";
import {NavBar} from "./components/NavBar/NavBar";

function App() {
  return (
      <div className="app-wrap">
        <Header/>
        <NavBar/>
          <div className="wrap-content">
          </div>
      </div>
  );
}

export default App;
