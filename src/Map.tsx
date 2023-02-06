import { MapContainer, TileLayer, useMap, Marker, Popup, Tooltip} from 'react-leaflet'

import 'leaflet/dist/leaflet.css';
import React, { useRef, useEffect, useState } from "react";
import Leaflet from 'leaflet'
import { isNull } from 'util';
import { LatLng } from 'leaflet';
import iconUrl from "./marker.svg";//"./marker.svg";


const RAINVALUE = {lat: 0, lon: 0, date: new Date(0), value: 0}
class RainValue {
  position: string;
  lat: number;
  lon: number;
  date: Date;
  value: number;
  constructor(position: string, lat: number, lon:number, date:Date, value:number) {
    this.position = position;
    this.lat = lat;
    this.lon = lon;
    this.date = date;
    this.value = value;
  }
  getPosition() {
    return {lat: this.lat, lng: this.lon};
  }
}


export const newicon = new Leaflet.Icon({
  iconUrl: iconUrl,//iconUrl.toString(),

  //iconAnchor: [12, 12],
  popupAnchor: [0, -25],
  //iconSize: [40, 40],
  iconSize: [50, 50],
})



export default () => {
  const mapRef = useRef(null);

  let markers2: any[] = [[60.17523, 24.94459]];
  let initialObj: RainValue[] | (() => RainValue[]) = [];
  const  [markers, setMarkers]  = useState<RainValue[]>(initialObj);

  let initialized = false;


  useEffect(() => {

    if (initialized) {
      return;
    }

    let currentDate = new Date();

    let startDate = new Date();
    startDate.setDate(currentDate.getDate() - 7);
   
    const startDateString = startDate.toISOString();
    const endDateString = currentDate.toISOString();

    let STATIONS = ["helsinki", "pirttikoski", "tottijärvi"];

    STATIONS.forEach(station => {
      console.log(station)

      
      fetch("https://opendata.fmi.fi/wfs?service=WFS&version=2.0.0&request=getFeature&storedquery_id=fmi::observations::weather::daily::simple&place="+station+"&starttime="+startDateString+"&endtime="+endDateString+"&")
      .then((response) => {
        response.text().then(responseText => {
        const parser = new DOMParser();
        const xml = parser.parseFromString(responseText, 'text/xml');
        const elems = xml.getElementsByTagName('BsWfs:BsWfsElement')

        let position = "";
        let latestRainValue = new RainValue("",0,0,new Date,0);
  

        let latestDate = new Date();
        latestDate.setDate(latestDate.getDate() - 100);

        for (let i = 0; i < elems.length; i++) {
          let item = elems[i];
          let type = item.getElementsByTagName('BsWfs:ParameterName')[0].textContent;
          if (type === "rrday") {
            let valueStr = item.getElementsByTagName('BsWfs:ParameterValue')[0].textContent;
            if (valueStr !== "NaN" && valueStr !== null) {
              let digitValue = parseFloat(valueStr);
              if (digitValue >= 0) {
                let dateString = item.getElementsByTagName('BsWfs:Time')[0].textContent;
                if (dateString !== null) {
                  let date = new Date(Date.parse(dateString));
                  let pos =  item.getElementsByTagName('gml:pos')[0].textContent;
                  if (position !== null) {
                    position = pos!.trim();
                    let lat = parseFloat(position.split(" ")[0])
                    let lon = parseFloat(position.split(" ")[1])
                    let value = parseFloat(valueStr);

                    let valueObj = new RainValue(position, lat, lon, date, value);

                    if (date > latestDate) {
                      latestDate = date;
                      latestRainValue = valueObj;
                    }
                    
                  }
                  
                }
  
              }
            }
          }
          
        }
  

        let val = latestRainValue //("60.17523 24.94459");

        if (position !== "") {
          console.log(val)
          setMarkers(markers =>[...markers, val]);
        }
        
        });

      });
      
      initialized = true;

    });


}, []);

  return (
    <MapContainer center={{ lat: 60.17523, lng: 24.94459 }} zoom={3}>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright%22%3EOpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {markers.map((elem, idx) => 
        <Marker key={`marker-${idx}`} position={elem.getPosition()} icon={newicon} >
                  <Tooltip direction="center" offset={[0, 0]} opacity={1}  permanent={true} className={"tooltip"} >{elem.value+"mm"}   </Tooltip>
        <Popup>
          <span>{elem.date.toLocaleDateString()}</span>
        </Popup>
      </Marker>
  )}
    </MapContainer>

  );
};



