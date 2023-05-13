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
import Moment from 'react-moment';
import moment from 'moment';
import LayerControls from './LayerControls';

import {ReactComponent as DropDownIcon} from './assets/menu_react.svg';


const DROPDOWNICON = `<svg
viewBox="0 0 12 7.5"
xmlns="http://www.w3.org/2000/svg"
>
<g
  id="layer1">
  <rect
  style="fill:#000000;fill-opacity:1;stroke-width:0.214743"
  id="rect1121"
  width="12"
  height="7.5"
  x="0"
  y="6.9388939e-18" />
<rect
  style="fill:#ffffff;stroke-width:0.247452;fill-opacity:1"
  id="rect913"
  width="10"
  height="1.5"
  x="1"
  y="1" />
<rect
  style="fill:#ffffff;stroke-width:0.247452;fill-opacity:1"
  id="rect913-3"
  width="10"
  height="1.5"
  x="1"
  y="3" />
<rect
  style="fill:#ffffff;stroke-width:0.247452;fill-opacity:1"
  id="rect913-3-6"
  width="10"
  height="1.5"
  x="1"
  y="5" />

</g>
</svg>
`


function App() {

  const mapRef = useRef<MapComponentHandle>(null);
  const mapContainerRef = useRef<MapComponentHandle>(null);
  const [showLoadView, setShowLoadView] = useState(true);
  const [showAbout, setShowAbout] = useState(false);
  const [showDropDown, setShowDropDown] = useState(false);
  const [lastToggleTime, setLastToggleTime] = useState(Date.now())

  const hideLoadView = () => {
    setShowLoadView(false);
  }

  const displayDropDown = () => {
    const currentTime = Date.now()
    console.log(currentTime - lastToggleTime)
    if (currentTime - lastToggleTime > 250) {
      setShowDropDown(true)
      setLastToggleTime(currentTime)
    }
  }
  const hideForeGroundElements = () => {
    if (showAbout || showDropDown) {
      setShowAbout(false);
      setShowDropDown(false)
      setLastToggleTime(Date.now())

    }
  
  }
  const displayAbout = () => {
      setShowAbout(true);
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
                                      updatePredictionDistance={(value:number) => {
                                        mapContainerRef.current!.updatePredictionDistance(value);
                                      }}
          />
        <LayerControls mapRef={mapRef} setMarkerVisibility={(value:boolean) => {
                                          mapContainerRef.current!.setMarkerVisibility(value);
                                        }}
                                        setPredictionVisibility={(value:boolean) => {
                                          mapContainerRef.current!.setPredictionVisibility(value);
                                        }}
          />
  
          <div className={`absolute w-full h-full top-0 bottom-0 bg-black	z-6000 transition-all duration-500 ${showLoadView ? "opacity-50 visible" : "opacity-0 invisible"}`} >

          </div>

            <Loop className={`loadingSpinner top-[50%] left-[50%] absolute z-6000 transition-all duration-500 ${showLoadView ? "opacity-100 visible" : "opacity-0 visible"}`}/>
  

  


          <div className={`h-[95vh] w-[98%] mt-[2vh] ml-[1%] border rounded-3xl`/* h-85*/}> 
  
            <MapComponent mapRef={mapRef} ref={mapContainerRef} loadingDone={() => hideLoadView()}/>
  
          </div>

        </div>



          <div className={`${(showDropDown || showAbout) ? "opacity-50 visible" : "opacity-0 invisible"} 
                    absolute w-full h-full top-0 bottom-0 bg-black	z-6000 transition-all duration-500  `}>
            </div>
    

              {
                <button className={`absolute w-14 h-14 top-8 right-8 z-6000 text-white bg-black opacity-30 p-1 rounded-md hover:opacity-50`}
                onClick={() => displayDropDown()}>
                  
                  <DropDownIcon></DropDownIcon>
                </button>
              }
              

          <div className={`absolute w-24 h-10 top-8 right-16 z-6000
                            ${(showDropDown) ? "visible" : "invisible"}`}>
            <CloseHandler active={showDropDown && !showAbout} onClose={() => setShowDropDown(false)}>
              <DropDownMenu open={showDropDown} showAbout={() => displayAbout()}/>
            </CloseHandler>
          </div>


          <CloseHandler active={showAbout} onClose={() => setShowAbout(false)}>

                  <About open={showAbout}
            onClose={() => setShowAbout(false)} />
          </CloseHandler>


    </div>
  );
}

export default App;
