


import { MapContainer, TileLayer, useMap, Marker, Popup, Tooltip, Pane, useMapEvents} from 'react-leaflet'


import React, { useRef, useEffect, useState } from "react";

//simple component to route usemap calls via a child of the component hosting leaflet map
export default function InnerObj(props:any) {
	const map = useMap();
	props.mapRef.current = map;  


    const [zoomLevel, setZoomLevel] = useState(5); // initial zoom level provided for MapContainer
    
    const mapEvents = useMapEvents({
        zoomend: () => {
			props.zoomChanged(mapEvents.getZoom())
            setZoomLevel(mapEvents.getZoom());
        },
    });




	return null;
};