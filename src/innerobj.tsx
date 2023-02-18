


import { MapContainer, TileLayer, useMap, Marker, Popup, Tooltip, Pane} from 'react-leaflet'


import React, { useRef, useEffect, useState } from "react";

//simple component to route usemap calls via a child of the component hosting leaflet map
export default function InnerObj(props:any) {
	const map = useMap();
	props.mapRef.current = map;  
	return null;
};