import React, {useRef, useState} from 'react';
import './App.css';

import MapComponent, { MapComponentHandle } from "./MapComponent";
import MapControls from "./MapControls";
import About from "./About";


import  Loop  from "@mui/icons-material/Loop";
import InfoIcon from '@mui/icons-material/Info';
import Button from '@mui/material/Button';


function App() {

  const mapRef = useRef<MapComponentHandle>(null);
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

        <span id="aboutSpan">Mikä tämä on? <Button id="aboutButton" onClick={() => setShowAbout(true)}><InfoIcon/></Button></span>
        

        <div>
        <MapControls mapRef={mapRef} updateAcceptedRainValue={(value:number) => {
                                        mapContainerRef.current!.updateAcceptedRainValue(value);
                                      }}
          />
  
          <div className={`absolute w-full h-full top-0 bottom-0 bg-black	z-6000 transition-all duration-500 ${showLoadView ? "opacity-50 visible" : "opacity-0 invisible"}`} >

          </div>

            <Loop className={`loadingSpinner  transition-all duration-500 ${showLoadView ? "opacity-100 visible" : "opacity-0 visible"}`}/>
  

  


          <div className={`h-[85vh] w-[94%] mt-[2vh] ml-[3%] border rounded-3xl`}>
  
            <MapComponent mapRef={mapRef} ref={mapContainerRef} loadingDone={() => hideLoadView()}/>
  
          </div>

        </div>


            <About open={showAbout}
      onClose={() => setShowAbout(false)} />


    </div>
  );
}

export default App;

/*
          <div className={`loadingDiv transition-all duration-500 ${showLoadView ? "opacity-100 " : "opacity-0 "}`}> 
            <Loop className="loadingSpinner"/>
  
          </div>
                    <div className={`loadingDiv`}> 
    
            </div>
                      <Loop className={`absolute top-3/5 left-3/6 z-6000 transition-all duration-500 ${showLoadView ? "opacity-100 " : "opacity-0 "}`}/>

*/