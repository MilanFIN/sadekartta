import React, {useRef, useState} from 'react';
import logo from './logo.svg';
import './App.css';

import MapComponent, { MapComponentHandle } from "./MapComponent";

const position = [51.505, -0.09]


const MyButton = ((props:any) => {

  const  [acceptedLimit, setAcceptedLimit]  = useState<number>(0.2);


  const addZoom = (() => {
    const map = props.mapRef.current

    let zoom = map.setView(map.getCenter(), map.getZoom()+1);
  }) 
  const subZoom = (() => {
    const map = props.mapRef.current

    let zoom = map.setView(map.getCenter(), map.getZoom()+-1);
  }) ;

  const changeLimit = (event:any) => {
    setAcceptedLimit(event.target.value);
    //const map = props.mapContainerRef.current;
    //console.log(map)
    props.callB()

  }

  
  return (
    <div>
      <button onClick={addZoom}>Zoom +</button>
      
      <button onClick={subZoom}>Zoom -</button>


      <input type="range" min={0.0} max={3.0}  className="slider" id="acceptedRange" step={0.1}
        onChange={changeLimit} value={acceptedLimit}></input>
      <label>{acceptedLimit}</label>
    </div>
  
  )//  onInput={changeLimit}
})


function App() {

  const mapRef = useRef();
  const mapContainerRef = useRef<MapComponentHandle>(null);


  return (
    <div className="App">


<link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.3/dist/leaflet.css"
     integrity="sha256-kLaT2GOSpHechhsozzB+flnD+zUyjE2LlfWPgU04xyI="
     />

      <MyButton mapRef={mapRef} callB={() => {
                                    console.log(mapContainerRef.current)
                                    mapContainerRef.current!.f();
                                  }}
      />
      <div id="container">


      <MapComponent mapRef={mapRef} ref={mapContainerRef}/>

      </div>

    </div>
  );
}

export default App;
