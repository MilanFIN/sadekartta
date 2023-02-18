import React, {useRef, useState} from 'react';


const MapControls = ((props:any) => {

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
	  props.updateAcceptedRainValue(event.target.value)
  
	}
  
	
	return (
	  <div>
		<button onClick={addZoom}>Zoom +</button>
		
		<button onClick={subZoom}>Zoom -</button>
  
  
		<input type="range" min={0.0} max={3.0}  className="slider" id="acceptedRange" step={0.1}
		  onChange={changeLimit} value={acceptedLimit}></input>
		<label>{acceptedLimit}</label>
	  </div>
	
	)
  })
  
  export default MapControls;