import { useMap, useMapEvents } from "react-leaflet";

import React, { useState } from "react";

type InnerObjProps = {
  mapRef: any;
  zoomChanged: (zoom: number) => void;
};

//simple component to route usemap calls via a child of the component hosting leaflet map
export default function InnerObj(props: InnerObjProps) {
  const map = useMap();
  props.mapRef.current = map;

  const [zoomLevel, setZoomLevel] = useState(5); // initial zoom level provided for MapContainer

  const mapEvents = useMapEvents({
    zoomend: () => {
      map.closePopup();
      props.zoomChanged(mapEvents.getZoom());
      setZoomLevel(mapEvents.getZoom());
    },
  });

  return null;
}
