import React, {useRef, useState} from 'react';
import logo from './logo.svg';
import './App.css';

import MapComponent, { MapComponentHandle } from "./MapComponent";
import MapControls from "./MapControls";





function App() {

  const mapRef = useRef();
  const mapContainerRef = useRef<MapComponentHandle>(null);


  return (
    <div className="App">


<link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.3/dist/leaflet.css"
     integrity="sha256-kLaT2GOSpHechhsozzB+flnD+zUyjE2LlfWPgU04xyI="
     />

      <MapControls mapRef={mapRef} updateAcceptedRainValue={(value:number) => {
                                    mapContainerRef.current!.updateAcceptedRainValue(value);
                                  }}
      />
      <div id="container">


      <MapComponent mapRef={mapRef} ref={mapContainerRef}/>

      </div>

    </div>
  );
}

export default App;
