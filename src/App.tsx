import React, {useRef} from 'react';
import logo from './logo.svg';
import './App.css';

import MapComponent from "./MapComponent";

const position = [51.505, -0.09]


const MyButton = ((props:any) => {
  const addZoom = (() => {
    const map = props.mapRef.current

    let zoom = map.setView(map.getCenter(), map.getZoom()+1);
  }) 
  const subZoom = (() => {
    const map = props.mapRef.current

    let zoom = map.setView(map.getCenter(), map.getZoom()+-1);
  }) ;

  
  return (
    <div>
      <button onClick={addZoom}>Zoom +</button>
      
      <button onClick={subZoom}>Zoom -</button>
    </div>
  
  )
})


function App() {

  const mapRef = useRef();

  return (
    <div className="App">


<link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.3/dist/leaflet.css"
     integrity="sha256-kLaT2GOSpHechhsozzB+flnD+zUyjE2LlfWPgU04xyI="
     />

      <MyButton mapRef={mapRef} />
      <div id="container">


      <MapComponent mapRef={mapRef}/>

      </div>

    </div>
  );
}

export default App;
