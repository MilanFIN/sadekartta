import React, {useState} from 'react';


type MapControlProps = {
    mapRef: any;
    updateAcceptedRainValue : (value:number) => void;
};

const MapControls = ((props:MapControlProps) => {

	const  [acceptedLimit, setAcceptedLimit]  = useState<number>(0.2);
  
  
	const addZoom = (() => {
	  const map = props.mapRef.current
  
	  let zoom = map.setView(map.getCenter(), map.getZoom()+1);
	}) 
	const subZoom = (() => {
	  const map = props.mapRef.current
  
	  let zoom = map.setView(map.getCenter(), map.getZoom()+-1);
	}) ;
  
	const changeLimit = (event:React.ChangeEvent<HTMLInputElement>) => {
	  setAcceptedLimit(parseFloat(event.target.value));
	  props.updateAcceptedRainValue(parseFloat(event.target.value));
  
	}
  
	
	return (
		<div>
	  	<div className="mapControls">

		
		<button className={"zoomButton"} onClick={subZoom}>-</button>
		<button className={"zoomButton"} onClick={addZoom}>+</button>

		<label className="controlLabel">Sademäärä &lt; {acceptedLimit}</label>
		<br/>
		<input type="range" min={0.0} max={3.0}  className="slider" id="acceptedRange" step={0.1}
		  onChange={changeLimit} value={acceptedLimit}></input>
		</div>

		<div className="mapControlsBkg mapControls">

		</div>

		</div>
	)
  })
  
  export default MapControls;