import React, {useState} from 'react';
import {ReactComponent as MarkerLayerIcon} from './hide.svg';


type LayerControlProps = {
    mapRef: any;
    setMarkerVisibility : (value:boolean) => void;
};

const LayerControls = ((props:LayerControlProps) => {

	const  [markersVisible, setMarkersVisible]  = useState<boolean>(true);
  

  
	const toggleVisibility = (() => {
		props.setMarkerVisibility(!markersVisible);
		setMarkersVisible(!markersVisible);
	}) 

	/*
	  position: absolute;
  bottom: 50px;
  left: 50px;
  width:150px;
  height:120px;

  z-index: 5000;

	*/
	return (
	  	<div className="absolute bottom-8 left-8 h-12 w-12 z-6000">
		
		<button className={"h-12 w-12" } onClick={toggleVisibility}>
			<MarkerLayerIcon 
				className = {`h-12 w-12	${markersVisible ? "opacity-80 visible" : "opacity-30 "}
				transition-all duration-250` }
			/>
			</button>


		</div>
	)
  })
  
  export default LayerControls;