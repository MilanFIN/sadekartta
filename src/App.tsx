import React, {useRef, useState} from 'react';
import logo from './logo.svg';
import './App.css';

import MapComponent, { MapComponentHandle } from "./MapComponent";
import MapControls from "./MapControls";

import  Loop  from "@mui/icons-material/Loop";
import Button from '@mui/material/Button';


function App() {

  const mapRef = useRef();
  const mapContainerRef = useRef<MapComponentHandle>(null);
  const [showLoadView, setShowLoadView] = useState(true);
  const [showAbout, setShowAbout] = useState(false);

  const hideLoadView = () => {
    setShowLoadView(false);
  }


  return (
    <div className="App">


<link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.3/dist/leaflet.css"
     integrity="sha256-kLaT2GOSpHechhsozzB+flnD+zUyjE2LlfWPgU04xyI="
     />

    <Button onClick={() => setShowAbout(true)}>About</Button>

        <div>
        <MapControls mapRef={mapRef} updateAcceptedRainValue={(value:number) => {
                                        mapContainerRef.current!.updateAcceptedRainValue(value);
                                      }}
          />
  
        {showLoadView ? 
          <div>
          <div className="loadingBkgDiv loadingDiv" >
  
          </div>
          <div className="loadingDiv"> 
            <Loop className="loadingSpinner"/>
  
          </div>
  
          </div>
          : null
  
        }
          <div id="container">
  
          <MapComponent mapRef={mapRef} ref={mapContainerRef} loadingDone={() => hideLoadView()}/>
  
          </div>

        </div>


        {showAbout ? 
        <div>
          
          <div className="aboutBkg">

          </div>
          <div className="aboutDiv">
            <Button onClick={(() => setShowAbout(false))}>Close</Button>
           <span>Test</span>
          </div>
        </div>
        :null
        }

    </div>
  );
}

export default App;
