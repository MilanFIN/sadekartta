


import { MapContainer, TileLayer, useMap, Marker, Popup, Tooltip, Pane} from 'react-leaflet'


import React, { useRef, useEffect, useState } from "react";


export default function InnerObj(props:any) {
	const map = useMap();
	props.mapRef.current = map;  
	return null;
};