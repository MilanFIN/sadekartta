import React from 'react';
import logo from './logo.svg';
import './App.css';

import Map from "./Map";

const position = [51.505, -0.09]


function App() {
  return (
    <div className="App">


<link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.3/dist/leaflet.css"
     integrity="sha256-kLaT2GOSpHechhsozzB+flnD+zUyjE2LlfWPgU04xyI="
     />


      <div id="container">
      <Map />

      </div>

    </div>
  );
}

export default App;
