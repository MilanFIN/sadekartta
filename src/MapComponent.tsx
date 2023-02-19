import { MapContainer, TileLayer, useMap, Marker, Popup, Tooltip, Pane} from 'react-leaflet'

import 'leaflet/dist/leaflet.css';
import React, { useRef, useEffect, useState, useImperativeHandle, forwardRef } from "react";
import Leaflet from 'leaflet'
import { isNull } from 'util';
import { LatLng } from 'leaflet';
import iconUrl from "./marker.svg";//"./marker.svg";

import InnerObj from "./innerobj"


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


const ICONSVG = `<svg
viewBox="0 0 11 11"
xmlns="http://www.w3.org/2000/svg"
>
<g
  id="layer1">
 <circle
    style="fill:#000000;fill-opacity:1;stroke-width:0.70785"
    id="path4253"
    cx="5.5"
    cy="5.5"
    r="5.5" />
 <circle
    style="fill:ICONCOLOR;fill-opacity:1;stroke-width:0.316687"
    id="bluebkg"
    cx="5.5"
    cy="5.5"
    r="5.4000001" />
</g>
</svg>

`




function getIcon(value: number, acceptedLimit:number) {

  let iconSvg = ICONSVG;
  //#1715ff
  
  if (value > acceptedLimit) {
    iconSvg = iconSvg.replace("ICONCOLOR","#aa1515");//#1515ff
  }
  else {
    iconSvg = iconSvg.replace("ICONCOLOR", "#15aa15");
  }

  const svgIcon = Leaflet.divIcon({
    html: iconSvg,
      className: "",
      iconSize: [50, 50],
      popupAnchor: [0,-25],
      //iconAnchor: [12, 40],
  });


  return svgIcon;
}


// Define the handle types which will be passed to the forwardRef
export type MapComponentHandle = {
  updateAcceptedRainValue: (value:number) => void;
};

type MapComponentProps = {
  mapRef: any;
};

const MapComponent = forwardRef<MapComponentHandle, MapComponentProps>((props, ref) => {

  let initialObj: RainValue[] | (() => RainValue[]) = [];
  const [markers, setMarkers]  = useState<RainValue[]>(initialObj);
  const [acceptedLimit, setAcceptedLimit]  = useState(0.2);


  let initialized = false;



  useImperativeHandle(ref, () => ({
    updateAcceptedRainValue(value:number) {
      setAcceptedLimit(value);

    }
  })
  );

  useEffect(() => {

    if (initialized) {
      return;
    }


    let rainValues :Array<RainValue> = [];

    let currentDate = new Date();

    let startDate = new Date();
    startDate.setDate(currentDate.getDate() - 7);
   
    const startDateString = startDate.toISOString();
    const endDateString = currentDate.toISOString();

    let STATIONS = ["hervanta", "lahti", "helsinki", "pirttikoski", "sulkavankylä", "Simanala", "Kaaresuvanto", "Mustikkamäki",
                    "Purola", "Palokki", "Kumpula", "Sallila", "Kontiojärvi", "Inari", "Kärjenkoski", "Huhtilampi",
                    "Pyhäselkä", "Pärnämäki", "Hyytiälä", "Muuratjärvi", "Paltaniemi", "Mehtäkylä", "Pitkäsenkylä",
                    
                    "Kangasniemi", "Tastula", "Pulju", "Korpijoki", "Rausenkulma", "Kattilamaa", "Utti",

                    "Voikoski", "Apaja", "Karttula", "Hirvijärvi", "Pyörni", "Teeriranta", "Lamminkäyrä", "Leppäkorpi",
                    "Tuorila", "Pitkäaho", "Pirttiperä", "Riimala", "Tottijärvi", "Mujejärvi", "Ylimarkku", "Teinikivi", "Viuruniemi", 
                    "Utö", "Pelkosenniemi", "Raistakka", "Jaurakkajärvi", "Sarakylä", "Kotila", "Hiidenniemi", "Yläne",
                    "Ylä-Luosta", "Mustavaara", "Kotaniemi",  "Värriötunturi", "Laukansaari", "Savonranta", "Kelloselkä",
                    "Savukoski", "Kestilä", "Sjundby","Näljänkä", "Pesiö", "Iisvesi", "Inkee", "Kauppilankylä",
                     "Särkijärvi", "Itätulli",  "Kaarakkala", "Hiiskula", "Koivuniemi", "Vähäkangas", "Kalaniemi",
                  ];

    //STATIONS = ["hervanta"];

    STATIONS.forEach(station => {

      fetch("https://opendata.fmi.fi/wfs?service=WFS&version=2.0.0&request=getFeature&storedquery_id=fmi::observations::weather::daily::simple&place="+station+"&starttime="+startDateString+"&endtime="+endDateString)
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
  

        let val = latestRainValue;

        if (position !== "") {
          
            if (rainValues.some(e => e.lat == val.lat && e.lon == val.lon)) {
            }
            else {
              //setMarkers(markers =>[...markers, val]);
              rainValues.push(val);
              rainValues.sort((a, b) => (a.date > b.date) ? 1 : -1);

              setMarkers(rainValues);

            }
  
        }

        
        
        });

      });
      
      initialized = true;

    });


}, []);

  const canDisplayMarker = (value:RainValue, ind:number) => {

    let proximitylimit = 0.1//degrees
    let collides = false;
    if (ind > 0) {
      for (let i = 0; i < ind-1; i++ ) {
        let elem = markers.at(i)!;
        if (  Math.abs(elem.lon - value.lon) < proximitylimit && Math.abs(elem.lat - value.lat) < proximitylimit) { //
          collides = true;
        }
      }
  
    }
    return !collides;
  }

  return (
    <MapContainer center={{ lat: 60.17523, lng: 24.94459 }} zoom={3} zoomControl={false} >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright%22%3EOpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      
      {markers.map((elem, idx) => 

        {if (canDisplayMarker(elem, idx)) {
          return <Pane name={elem.position} style={{ zIndex: 1000+idx*3 }}>
          <Marker key={`marker-${idx}`} position={elem.getPosition()} icon={getIcon(elem.value, acceptedLimit)} >
            <Pane name={elem.position +"_tooltip"} style={{ zIndex: 1001+idx*3 }}>
                    <Tooltip direction="center" offset={[0, 0]} opacity={1}  permanent={true} className={"tooltip"} ><b>{elem.value+"mm"}</b>   </Tooltip>
            </Pane>
            <Pane name={elem.position +"_popup"} style={{ zIndex: 5001 }}>
              <Popup>
                <span>{elem.date.toLocaleDateString()}</span>
              </Popup>
            </Pane>
        </Marker>
      </Pane>

        }}
      )}


      <InnerObj mapRef={props.mapRef}/>

    </MapContainer>

  );
});

export default MapComponent;

