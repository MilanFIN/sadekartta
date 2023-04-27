import React, {useRef, useState} from 'react';
import './App.css';

import MapComponent, { MapComponentHandle } from "./MapComponent";
import MapControls from "./MapControls";
import About from "./About";
import DropDownMenu from "./DropDownMenu";

import CloseHandler from "./CloseHandler";

import  Loop  from "@mui/icons-material/Loop";
import InfoIcon from '@mui/icons-material/Info';
import Button from '@mui/material/Button';


function App() {

  const mapRef = useRef<MapComponentHandle>(null);
  const mapContainerRef = useRef<MapComponentHandle>(null);
  const [showLoadView, setShowLoadView] = useState(true);
  const [showAbout, setShowAbout] = useState(false);
  const [showDropDown, setShowDropDown] = useState(false);

  const hideLoadView = () => {
    setShowLoadView(false);
  }

  const toggleDropDown = () => {
    if (!showDropDown) {
      setShowDropDown(true)
    }
  }
  const hideForeGroundElements = () => {
    setShowAbout(false);
    setShowDropDown(false)
  }
  

  


  return (
    <div className="App">


    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.3/dist/leaflet.css"
        integrity="sha256-kLaT2GOSpHechhsozzB+flnD+zUyjE2LlfWPgU04xyI="
        />


        <div>
        <MapControls mapRef={mapRef} updateAcceptedRainValue={(value:number) => {
                                        mapContainerRef.current!.updateAcceptedRainValue(value);
                                      }}
          />
  
          <div className={`absolute w-full h-full top-0 bottom-0 bg-black	z-6000 transition-all duration-500 ${showLoadView ? "opacity-50 visible" : "opacity-0 invisible"}`} >

          </div>

            <Loop className={`loadingSpinner  transition-all duration-500 ${showLoadView ? "opacity-100 visible" : "opacity-0 visible"}`}/>
  

  


          <div className={`h-[95vh] w-[94%] mt-[2vh] ml-[3%] border rounded-3xl`/* h-85*/}> 
  
            <MapComponent mapRef={mapRef} ref={mapContainerRef} loadingDone={() => hideLoadView()}/>
  
          </div>

        </div>



<div className={`${(showDropDown || showAbout) ? "opacity-50 visible" : "opacity-0 invisible"} 
                          absolute w-full h-full top-0 bottom-0 bg-black	z-6000 transition-all duration-500  `}>
                  </div>
          

                  <button className={`absolute w-10 h-10 top-14 right-14 z-6000 text-black bg-white`}
                  onClick={() => toggleDropDown()}>Test</button>

          <div className={`absolute w-24 h-10 top-14 right-24 z-6000
                            ${(showDropDown) ? "visible" : "invisible"}`}>
            <CloseHandler active={showDropDown} onClose={() => hideForeGroundElements()}>
              <DropDownMenu open={showDropDown} showAbout={() => setShowAbout(true)}/>
            </CloseHandler>
          </div>


          <CloseHandler active={showAbout} onClose={() => hideForeGroundElements()}>

                  <About open={showAbout}
            onClose={() => setShowAbout(false)} />
          </CloseHandler>


    </div>
  );
}

export default App;

/*




open={showDropDown} onClose={() => setShowDropDown(false)}
          <div className={`loadingDiv transition-all duration-500 ${showLoadView ? "opacity-100 " : "opacity-0 "}`}> 
            <Loop className="loadingSpinner"/>
  
          </div>
                    <div className={`loadingDiv`}> 
    
            </div>
                      <Loop className={`absolute top-3/5 left-3/6 z-6000 transition-all duration-500 ${showLoadView ? "opacity-100 " : "opacity-0 "}`}/>

*/