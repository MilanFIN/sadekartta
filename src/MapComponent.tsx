import { MapContainer, TileLayer, useMap, Marker, Popup, Tooltip, Pane} from 'react-leaflet'

import 'leaflet/dist/leaflet.css';
import React, { useRef, useEffect, useState, useImperativeHandle, forwardRef } from "react";
import Leaflet from 'leaflet'
import { isNull } from 'util';
import { LatLng } from 'leaflet';
import iconUrl from "./marker.svg";//"./marker.svg";

import InnerObj from "./innerobj"
import STATIONS from "./Constants"

//TODO:
/**
 * - tee haku kahdessa osassa 0-98 ja loput
 * - ennen toisen osan lisäämistä pitää sortata kaikki
 * - välimatkan filtteröinti saa ottaa huomioon vain ne, jotka on näkyvissä, nyt käydään läpi kaikki
 * 
 * 
 */

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
  loadingDone: () => void;

};

const MapComponent = forwardRef<MapComponentHandle, MapComponentProps>((props, ref) => {

  let initialObj: RainValue[] | (() => RainValue[]) = [];
  const [markers, setMarkers]  = useState<RainValue[]>(initialObj);
  const [acceptedLimit, setAcceptedLimit]  = useState(0.2);
  const [proximityLimit, setProximityLimit]  = useState(20 / 3 -1);


  let initialized = false;



  useImperativeHandle(ref, () => ({
    updateAcceptedRainValue(value:number) {
      setAcceptedLimit(value);

    }
  })
  );

  const addAndSortMarkers = (newValue:RainValue) => {
    markers.push(newValue);
    let newMarkers = markers.sort((a, b) => (a.date > b.date) ? 1 : -1);

    setMarkers(markers =>[...newMarkers] )
    //markers.push(newValue);
    //setMarkers(markers);

  }

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

    /*
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
    */
    //STATIONS = ["hervanta"];

    //STATIONS.forEach(station => {

      /*
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
          
            if (markers.some(e => e.lat == val.lat && e.lon == val.lon)) {
            }
            else {
              addAndSortMarkers(val)
            }
  
        }

        
        
        });

      });*/



      let stationBatches = [STATIONS.slice(95), STATIONS.slice(95)]; //

      stationBatches.forEach(subStations => {
        let url = "https://opendata.fmi.fi/wfs?service=WFS&version=2.0.0&request=getFeature&storedquery_id=fmi::observations::weather::daily::simple";

        subStations.forEach(station => {
          url += "&fmisid=" + station;
        });
        //finally setting date limits for data
        url += "&starttime="+startDateString+"&endtime="+endDateString;
  
        console.log(url)
  
        fetch(url).then(response => {
          response.text().then(responseText => {
  
            let rainValueMap:Map<String, RainValue> = new Map();
  
            const parser = new DOMParser();
            const xml = parser.parseFromString(responseText, 'text/xml');
            const elems = xml.getElementsByTagName('BsWfs:BsWfsElement')
  
            let position = "";
            let latestRainValue = new RainValue("",0,0,new Date,0);
            for (let i = 0; i < elems.length; i++) {
              let item = elems[i];
              let type = item.getElementsByTagName('BsWfs:ParameterName')[0].textContent;
              if (type === "rrday") {
  
                let valueStr = item.getElementsByTagName('BsWfs:ParameterValue')[0].textContent!;
                if (valueStr != "NaN") {
                  let digitValue = parseFloat(valueStr);
                  if (digitValue >= 0) {
                    let dateString = item.getElementsByTagName('BsWfs:Time')[0].textContent!;
                    let date = new Date(Date.parse(dateString));
                    let position =  item.getElementsByTagName('gml:pos')[0].textContent!.trim();
  
                    let lat = parseFloat(position.split(" ")[0])
                    let lon = parseFloat(position.split(" ")[1])
                    let value = parseFloat(valueStr);
  
                    let valueObj = new RainValue(position, lat, lon, date, value);
  
                    if (rainValueMap.has(position)) {
                      if (rainValueMap.get(position)!.date < valueObj.date) {
                        rainValueMap.set(position, valueObj);
                      }
                    }
                    else {
                      rainValueMap.set(position, valueObj);
                    }
  
                  }  
                }
  
  
              }
              
            }  
  
  
            let values = Array.from(rainValueMap.values());
            let sortedValues = values.concat(markers).sort((a, b) => (a.date > b.date) ? 1 : -1);;
            setMarkers(markers =>[...sortedValues] )

            props.loadingDone();
          });
      });

  
      });
      initialized = true;

    //});


}, []);


  const getValidMarkers = () => {

    let validMarkers = Array<RainValue>();

    markers.forEach(marker => {
      let collides = false;
      validMarkers.every(validMarker => {
        if (Math.abs(validMarker.lon - marker.lon) < proximityLimit && Math.abs(validMarker.lat - marker.lat) < proximityLimit) { //
          collides = true;
          return false;
        }
        return true;
      });
      if (!collides) {
        validMarkers.push(marker);
      }

    });

    return validMarkers;
  }



  const zoomChanged = (zoomLevel:number) => {
    let scaleMap:Map<number, number> = new Map<number, number>([
      [0, 40],
      [1, 10],
      [2, 6],
      [3, 5],
      [4, 1.5],//1.9
      [5, 1],
      [6, 0.5],
      [7, 0.2],
      [8, 0.1]
    ]);


    let proxLimit = 0;

    if (scaleMap.has(zoomLevel)) {
      proxLimit = scaleMap.get(zoomLevel)!;
    }
    setProximityLimit(proxLimit)
  }

  return (
    <MapContainer center={{ lat: 60.17523, lng: 24.94459 }} zoom={3} zoomControl={false} >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright%22%3EOpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      
      {
        getValidMarkers().map((elem, idx) => 

        {
          let currentTime = (new Date()).getMilliseconds().toString();
          return <Pane name={elem.position + currentTime} style={{ zIndex: 1000+idx*3 }}>
          <Marker key={`marker-${idx}`} position={elem.getPosition()} icon={getIcon(elem.value, acceptedLimit)} >
            <Pane name={elem.position + currentTime +"_tooltip"} style={{ zIndex: 1001+idx*100 }}>
                    <Tooltip direction="center" offset={[0, 0]} opacity={1}  permanent={true} className={"tooltip"} ><b>{elem.value+"mm"}</b>   </Tooltip>
            </Pane>
            <Pane name={elem.position + currentTime +"_popup"} style={{ zIndex: 5001 }}>
              <Popup>
                <span>{elem.date.toLocaleDateString()}</span>
              </Popup>
            </Pane>
        </Marker>
      </Pane>

        }
      )
      /*
      markers.map((elem, idx) => 

        {if (canDisplayMarker(elem, idx)) {
          let currentTime = (new Date()).getMilliseconds().toString();
          return <Pane name={elem.position + currentTime} style={{ zIndex: 1000+idx*3 }}>
          <Marker key={`marker-${idx}`} position={elem.getPosition()} icon={getIcon(elem.value, acceptedLimit)} >
            <Pane name={elem.position + currentTime +"_tooltip"} style={{ zIndex: 1001+idx*100 }}>
                    <Tooltip direction="center" offset={[0, 0]} opacity={1}  permanent={true} className={"tooltip"} ><b>{elem.value+"mm"}</b>   </Tooltip>
            </Pane>
            <Pane name={elem.position + currentTime +"_popup"} style={{ zIndex: 5001 }}>
              <Popup>
                <span>{elem.date.toLocaleDateString()}</span>
              </Popup>
            </Pane>
        </Marker>
      </Pane>

        }}
      )
      */}


      <InnerObj mapRef={props.mapRef} zoomChanged={zoomChanged}/>

    </MapContainer>

  );
});

export default MapComponent;

