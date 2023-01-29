import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet'

import 'leaflet/dist/leaflet.css';
import React, { useRef, useEffect, useState } from "react";
import { isNull } from 'util';
import { LatLng } from 'leaflet';

const RAINVALUE = {lat: 0, lon: 0, date: new Date(0), value: 0}

export default () => {
  const mapRef = useRef(null);

  let rainValues = new Map();
  let markers2: any[] = [[60.17523, 24.94459]];
  const  [markers, setMarkers]  = useState([
    {
      lat: 0,
      lng: 0,
    },
  ]);



  useEffect(() => {
    setMarkers([]);


    fetch("https://opendata.fmi.fi/wfs?service=WFS&version=2.0.0&request=getFeature&storedquery_id=fmi::observations::weather::daily::simple&place=helsinki&starttime=2023-01-27T00:00:00Z&endtime=2023-01-29T00:00:00Z&")
    .then((response) => {
      response.text().then(responseText => {
        const parser = new DOMParser();
      const xml = parser.parseFromString(responseText, 'text/xml');
      const elems = xml.getElementsByTagName('BsWfs:BsWfsElement')

      for (let i = 0; i < elems.length; i++) {
        let item = elems[i];
        let type = item.getElementsByTagName('BsWfs:ParameterName')[0].textContent;
        if (type === "rrday") {
          let value = item.getElementsByTagName('BsWfs:ParameterValue')[0].textContent;
          if (value !== "NaN" && value !== null) {
            let digitValue = parseFloat(value);
            if (digitValue >= 0) {
              let dateString = item.getElementsByTagName('BsWfs:Time')[0].textContent;
              if (dateString !== null) {
                let date = new Date(Date.parse(dateString));
                let position =  item.getElementsByTagName('gml:pos')[0].textContent;
                if (position !== null) {
                  position = position.trim();
                  let valueObj = RAINVALUE;
                  valueObj.date = date;
                  valueObj.lat = parseFloat(position.split(" ")[0])
                  valueObj.lon = parseFloat(position.split(" ")[1])
                  valueObj.value = parseFloat(value);
                  if (rainValues.has(position)) {
                    let existingDate = rainValues.get(position).date
                    if (date > existingDate) {
                      rainValues.set(position, valueObj);
                    }
                  }
                  else {
                    rainValues.set(position, valueObj);
                  }

                }
                
              }

            }
          }
        }
        
      }

      console.log(rainValues)
      console.log(rainValues.get("60.17523 24.94459").date)
      let val = rainValues.get("60.17523 24.94459");
      setMarkers([...markers, val]);

      });
    });
}, []);

  return (
    <MapContainer center={{ lat: 60.17523, lng: 24.94459 }} zoom={3}>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright%22%3EOpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {markers.map((position, idx) => 
        <Marker key={`marker-${idx}`} position={position}>
        <Popup>
          <span>A pretty CSS3 popup. <br/> Easily customizable.</span>
        </Popup>
      </Marker>
      )}
    </MapContainer>

  );
};
