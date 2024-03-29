import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Tooltip,
  Pane,
} from "react-leaflet";

import "leaflet/dist/leaflet.css";
import React, {
  useEffect,
  useState,
  useImperativeHandle,
  forwardRef,
  Ref,
} from "react";
import Leaflet from "leaflet";
import InnerObj from "./innerobj";
import STATIONS from "./Constants";

class RainValue {
  position: string;
  lat: number;
  lon: number;
  date: Date;
  value: number;
  valid: boolean;
  constructor(
    position: string,
    lat: number,
    lon: number,
    date: Date,
    value: number
  ) {
    this.position = position;
    this.lat = lat;
    this.lon = lon;
    this.date = date;
    this.value = value;
    this.valid = false;
  }
  getPosition() {
    return { lat: this.lat, lng: this.lon };
  }
}

class RainPrediction {
  position: string;
  lat: number;
  lon: number;
  date: number;
  dateObj: Date;
  value: number;
  valid: boolean;
  offset: number; //prediction in future
  constructor(
    position: string,
    lat: number,
    lon: number,
    date: number,
    value: number,
    offset: number
  ) {
    this.position = position;
    this.lat = lat;
    this.lon = lon;
    this.date = date;
    this.dateObj = new Date(date);
    this.value = value;
    this.valid = false;
    this.offset = offset;
  }
  getPosition() {
    return { lat: this.lat, lng: this.lon };
  }
}

const CURRENTICON = `<svg
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
`;

const EXPIREDICON = `<svg
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
    <path
       sodipodi:type="star"
       style="fill:#000000;fill-opacity:1;stroke-width:0.264583"
       id="path1124-3-6"
       inkscape:flatsided="false"
       sodipodi:sides="3"
       sodipodi:cx="9.4936028"
       sodipodi:cy="1.3936056"
       sodipodi:r1="1.3862302"
       sodipodi:r2="0.69311517"
       sodipodi:arg1="-1.5707963"
       sodipodi:arg2="-0.52359878"
       inkscape:rounded="0"
       inkscape:randomized="0"
       d="m 9.4936028,0.00737536 0.6002552,1.03967264 0.600255,1.0396727 -1.2005102,1e-7 -1.2005107,-1e-7 0.6002553,-1.0396727 z"
       inkscape:transform-center-y="-0.49083336"
       transform="matrix(1.4160641,0,0,1.4163111,-4.4435504,0.2595542)" />
    <path
       sodipodi:type="star"
       style="fill:#ffff00;fill-opacity:1;stroke-width:0.264583"
       id="path1124-3"
       inkscape:flatsided="false"
       sodipodi:sides="3"
       sodipodi:cx="9.4936028"
       sodipodi:cy="1.3936056"
       sodipodi:r1="1.3862302"
       sodipodi:r2="0.69311517"
       sodipodi:arg1="-1.5707963"
       sodipodi:arg2="-0.52359878"
       inkscape:rounded="0"
       inkscape:randomized="0"
       d="m 9.4936028,0.00737536 0.6002552,1.03967264 0.600255,1.0396727 -1.2005102,1e-7 -1.2005107,-1e-7 0.6002553,-1.0396727 z"
       inkscape:transform-center-y="-0.43300001"
       transform="matrix(1.2494317,0,0,1.2494317,-2.8616526,0.49078499)" />
</g>
</svg>
`;

const CLOUDICON = `

<svg
   width="18mm"
   height="10.5mm"
   viewBox="0 0 18 10.5"
   version="1.1"
   id="svg5">
  <defs
     id="defs2" />
  <g
     id="layer1"
     transform="matrix(0.38819156,0,0,0.38819156,-2.398147,-0.20170788)">
    <g
       id="layer1-5"
       transform="matrix(1.0098434,0,0,1.0146323,-0.02785507,0.05003499)">
      <ellipse
       style="fill:#000000;fill-opacity:1;stroke-width:0.250843"
       id="path234"
       cx="17.604137"
       cy="17.848032"
       rx="9.5"
       ry="9.5" />
    <ellipse
       style="fill:#000000;fill-opacity:1;stroke-width:0.264583"
       id="path236"
       cx="30.449924"
       cy="11.693625"
       rx="10.5"
       ry="10.5" />
    <ellipse
       style="fill:#000000;fill-opacity:1;stroke-width:0.264583"
       id="path238"
       cx="41.237068"
       cy="17.742826"
       rx="9.5"
       ry="9.5" />
    <rect
       style="fill:#000000;fill-opacity:1;stroke-width:0.234407"
       id="rect292"
       width="24.886675"
       height="10.923985"
       x="17.247795"
       y="16.206539" />
    </g>
    <ellipse
       style="fill:#0000bb;fill-opacity:1;stroke-width:0.250843"
       id="path234"
       cx="17.604137"
       cy="17.848032"
       rx="9.0"
       ry="9.0" />
    <ellipse
       style="fill:#0000bb;fill-opacity:1;stroke-width:0.264583"
       id="path236"
       cx="30.449924"
       cy="11.693625"
       rx="10.0"
       ry="10.0" />
    <ellipse
       style="fill:#0000bb;fill-opacity:1;stroke-width:0.264583"
       id="path238"
       cx="41.237068"
       cy="17.742826"
       rx="9.0"
       ry="9.0" />
    <rect
       style="fill:#0000bb;fill-opacity:1;stroke-width:0.234407"
       id="rect292"
       width="24.486675"
       height="10.523985"
       x="17.247795"
       y="16.206539" />
  </g>
</svg>


`;

function getIcon(marker: RainValue, acceptedLimit: number) {
  const currentDate = new Date();
  let iconSvg = CURRENTICON;

  let overDayAgo = new Date();
  overDayAgo.setDate(currentDate.getDate() - 2);

  if (overDayAgo > marker.date) {
    iconSvg = EXPIREDICON;
    iconSvg = iconSvg.replace("ICONCOLOR", "#737373"); //#737373
  } else {
    if (marker.value > acceptedLimit) {
      iconSvg = iconSvg.replace("ICONCOLOR", "#aa1515"); //#aa1515
    } else {
      iconSvg = iconSvg.replace("ICONCOLOR", "#15aa15"); //15aa15
    }
  }

  const svgIcon = Leaflet.divIcon({
    html: iconSvg,
    className: "",
    iconSize: [50, 50],
    popupAnchor: [0, -25],
    //iconAnchor: [12, 40],
  });

  return svgIcon;
}

function getPredictionIcon(marker: RainPrediction, acceptedLimit: number) {
  const currentDate = new Date();
  let iconSvg = CLOUDICON;

  const svgIcon = Leaflet.divIcon({
    html: iconSvg,

    className: "",
    iconSize: [70, 50],
    popupAnchor: [0, -25],
    //iconAnchor: [12, 40],
  });

  return svgIcon;
}

// Define the handle types which will be passed to the forwardRef
export type MapComponentHandle = {
  updateAcceptedRainValue: (value: number) => void;
  updatePredictionDistance: (value: number) => void;
  setMarkerVisibility: (value: boolean) => void;
  setPredictionVisibility: (value: boolean) => void;
};

type MapComponentProps = {
  mapRef: React.RefObject<MapComponentHandle>;
  loadingDone: () => void;
};

const MapComponent = forwardRef<MapComponentHandle, MapComponentProps>(
  (props, ref) => {
    let initialObj: RainValue[] | (() => RainValue[]) = [];
    let initialPredictionObj: RainPrediction[] | (() => RainPrediction[]) = [];
    let initialRainMap:
      | Map<number, RainPrediction[]>
      | (() => Map<number, RainPrediction[]>) = new Map();

    const [markers, setMarkers] = useState<RainValue[]>(initialObj);
    const [acceptedLimit, setAcceptedLimit] = useState(0.2);
    const [predictionDistance, setPredictionDistance] = useState(1);
    const [proximityLimit, setProximityLimit] = useState(1);
    //const [initialized, setInitialized] = useState(false);
    let initialized = false;

    const [markerCache, setMarkerCache] = useState<Map<number, RainValue[]>>(
      new Map()
    );
    const [predictionCache, setPredictionCache] = useState<
      Map<string, RainPrediction[]>
    >(new Map());

    //let markerCache:Map<number, RainValue[]> = new Map();

    const [showHistoryMarkers, setShowHistoryMarkers] = useState(true);
    const [showPredictionMarkers, setShowPredictionMarkers] = useState(true);
    const [contentLoaded, setContentLoaded] = useState(false);

    //const [predictionMarkers, setPredictionMarkers] = useState<RainPrediction[]>(initialPredictionObj);
    const [predictionMarkers, setPredictionMarkers] =
      useState<Map<number, RainPrediction[]>>(initialRainMap);

    const [predictionDates, setPredictionDates] = useState<number[]>([]);

    useImperativeHandle(ref, () => ({
      updateAcceptedRainValue(value: number) {
        setAcceptedLimit(value);
      },
      updatePredictionDistance(value: number) {
        setPredictionDistance(value);
      },
      setMarkerVisibility(value: boolean) {
        setShowHistoryMarkers(value);
      },
      setPredictionVisibility(value: boolean) {
        setShowPredictionMarkers(value);
      },
    }));

    const getMarkerPopupMessage = (marker: RainValue) => {
      let message = "Sijainti: " + marker.position + "\n";
      message +=
        "Pvm: <b>" +
        marker.date.toLocaleDateString("en-GB").replaceAll("/", ".") +
        "</b>\n";
      message += "Sade: <b>" + marker.value + "mm";

      const currentDate = new Date();

      let overDayAgo = new Date();
      overDayAgo.setDate(currentDate.getDate() - 2);

      if (overDayAgo > marker.date) {
        message += "\nHUOM: yli päivän vanha havainto!";
      }
      return message;
    };

    const getPredictionPopupMessage = (marker: RainPrediction) => {
      let message = "Sijainti: " + marker.position + "\n";
      message += "Ennuste (";
      message += marker.offset;
      message += "h): <b>" + marker.value + "mm";

      const currentDate = new Date();

      return message;
    };

    const checkContentLoaded = (batches: number) => {
      if (batches >= 3) {
        props.loadingDone();
        setContentLoaded(true);
        zoomChanged(5);
      }
    };

    useEffect(() => {
      if (initialized) {
        return;
      }
      initialized = true;

      let rainValues: Array<RainValue> = [];

      let currentDate = new Date();

      let startDate = new Date();
      startDate.setDate(currentDate.getDate() - 7);

      const startDateString = startDate.toISOString();
      const endDateString = currentDate.toISOString();

      let stationBatches = [STATIONS.slice(95), STATIONS.slice(95)]; //[STATIONS.slice(0)];//

      let processedBatches = 0;

      stationBatches.forEach((subStations) => {
        let url =
          "https://opendata.fmi.fi/wfs?service=WFS&version=2.0.0&request=getFeature&storedquery_id=fmi::observations::weather::daily::simple";

        subStations.forEach((station) => {
          url += "&fmisid=" + station;
        });
        //finally setting date limits for data
        url += "&starttime=" + startDateString + "&endtime=" + endDateString;

        fetch(url).then((response) => {
          response.text().then((responseText) => {
            let rainValueMap: Map<String, RainValue> = new Map();

            const parser = new DOMParser();
            const xml = parser.parseFromString(responseText, "text/xml");
            const elems = xml.getElementsByTagName("BsWfs:BsWfsElement");

            let position = "";
            let latestRainValue = new RainValue("", 0, 0, new Date(), 0);
            for (let i = 0; i < elems.length; i++) {
              let item = elems[i];
              let type = item.getElementsByTagName("BsWfs:ParameterName")[0]
                .textContent;
              if (type === "rrday") {
                let valueStr = item.getElementsByTagName(
                  "BsWfs:ParameterValue"
                )[0].textContent!;
                if (valueStr != "NaN") {
                  let digitValue = parseFloat(valueStr);
                  if (digitValue < 0) {
                    digitValue = 0.0;
                  }
                  let dateString =
                    item.getElementsByTagName("BsWfs:Time")[0].textContent!;
                  let date = new Date(Date.parse(dateString));
                  let position = item
                    .getElementsByTagName("gml:pos")[0]
                    .textContent!.trim();

                  let lat = parseFloat(position.split(" ")[0]);
                  let lon = parseFloat(position.split(" ")[1]);
                  let value = digitValue;

                  let valueObj = new RainValue(position, lat, lon, date, value);

                  if (rainValueMap.has(position)) {
                    if (rainValueMap.get(position)!.date < valueObj.date) {
                      rainValueMap.set(position, valueObj);
                    }
                  } else {
                    rainValueMap.set(position, valueObj);
                  }
                }
              }
            }

            let values = Array.from(rainValueMap.values());
            let sortedValues = values
              .concat(markers)
              .sort((a, b) => (a.date < b.date ? 1 : -1));
            setMarkers([...sortedValues]); //markers =>

            processedBatches++;
            checkContentLoaded(processedBatches);
          });
        });
      });

      let predUrl =
        "https://opendata.fmi.fi/wfs?service=WFS&version=2.0.0&request=getFeature&storedquery_id=ecmwf::forecast::surface::obsstations::simple";

      let endDate = new Date();
      let lead = 3;
      endDate.setTime(currentDate.getTime() + lead * 60 * 60 * 1000);

      const predStartDString = currentDate.toISOString();
      const predEndDString = endDate.toISOString();

      predUrl +=
        "&starttime=" + predStartDString + "&endtime=" + predEndDString;

      fetch(predUrl).then((response) => {
        response.text().then((responseText) => {
          let responseDates = Array<number>();
          let predictions = Array<RainPrediction>();
          let predictionMap = new Map<number, RainPrediction[]>();

          //let predictions:Map<String, RainValue> = new Map();

          const parser = new DOMParser();
          const xml = parser.parseFromString(responseText, "text/xml");
          const elems = xml.getElementsByTagName("BsWfs:BsWfsElement");
          for (let i = 0; i < elems.length; i++) {
            let item = elems[i];
            let type = item.getElementsByTagName("BsWfs:ParameterName")[0]
              .textContent;
            if (type === "Precipitation1h") {
              let valueStr = item.getElementsByTagName(
                "BsWfs:ParameterValue"
              )[0].textContent!;
              let dateStr =
                item.getElementsByTagName("BsWfs:Time")[0].textContent!;

              if (valueStr != "NaN") {
                let digitValue = parseFloat(valueStr);
                if (digitValue < 0) {
                  digitValue = 0.0;
                }
                let dateNum = Date.parse(dateStr);
                if (!responseDates.includes(dateNum)) {
                  responseDates.push(dateNum);
                  responseDates.sort();
                }
                let position = item
                  .getElementsByTagName("gml:pos")[0]
                  .textContent!.trim();

                let lat = parseFloat(position.split(" ")[0]) - 0.05;
                let lon = parseFloat(position.split(" ")[1]) - 0.05;
                lat = Math.round(lat * 1e5) / 1e5;
                lon = Math.round(lon * 1e5) / 1e5;

                position = lat + ", " + lon;

                let offset = responseDates.indexOf(dateNum) + 1;

                let pred = new RainPrediction(
                  position,
                  lat,
                  lon,
                  dateNum,
                  digitValue,
                  offset
                );
                predictions.push(pred);

                if (predictionMap.has(offset)) {
                  let previousPredictions = predictionMap.get(offset)!;
                  previousPredictions?.push(pred);
                  predictionMap.set(offset, previousPredictions);
                } else {
                  predictionMap.set(offset, [pred]);
                }
              }
            }
          }

          //predictionMap.set(1, predictions);
          //setPredictionMarkers([... predictions]);
          setPredictionMarkers(predictionMap);
          setPredictionDates(responseDates);
          processedBatches++;
          checkContentLoaded(processedBatches);
        });
      });

      //});
    }, []);

    const checkCollision = (
      validLat: number,
      validLon: number,
      newLat: number,
      newLon: number
    ) => {
      if (
        Math.abs(validLon - newLon) < proximityLimit &&
        Math.abs(validLat - newLat) < proximityLimit
      ) {
        //
        return true;
      }
    };

    const getValidMarkers = () => {
      let validMarkers = Array<RainValue>();

      if (markerCache.has(proximityLimit) && contentLoaded) {
        return markerCache.get(proximityLimit)!;
      }

      markers.forEach((marker) => {
        let collides = false;
        validMarkers.every((validMarker) => {
          if (
            checkCollision(
              validMarker.lat,
              validMarker.lon,
              marker.lat,
              marker.lon
            )
          ) {
            //
            collides = true;
            marker.valid = false;
            return false;
          }
          return true;
        });
        if (!collides) {
          marker.valid = true;
          validMarkers.push(marker);
        }
      });

      if (contentLoaded) {
        markerCache.set(proximityLimit, validMarkers);
        setMarkerCache(markerCache);
      }

      //must sort to get around zindex not affecting popups and as such popups get hidden behind other markers
      //validMarkers.sort((a, b) => (a.lat < b.lat) ? 1 : -1);
      return validMarkers;
    };

    const getValidPredictions = () => {
      let validMarkers = new Array<RainPrediction>();

      if (
        predictionCache.has(
          proximityLimit.toString() + predictionDistance.toString()
        ) &&
        contentLoaded
      ) {
        return predictionCache.get(
          proximityLimit.toString() + predictionDistance.toString()
        )!;
      }

      if (predictionMarkers.has(predictionDistance)) {
        let correctDateMarkers = new Array<RainPrediction>();
        correctDateMarkers = predictionMarkers.get(predictionDistance)!;

        correctDateMarkers.forEach((marker) => {
          let collides = false;
          validMarkers.every((validMarker) => {
            if (
              checkCollision(
                validMarker.lat,
                validMarker.lon,
                marker.lat,
                marker.lon
              )
            ) {
              //
              collides = true;
              marker.valid = false;
              return false;
            }
            return true;
          });
          if (!collides) {
            marker.valid = true;
            validMarkers.push(marker);
          }
        });
      }

      if (contentLoaded) {
        predictionCache.set(
          proximityLimit.toString() + predictionDistance.toString(),
          validMarkers
        );
        setPredictionCache(predictionCache);
      }

      //must sort to get around zindex not affecting popups and as such popups get hidden behind other markers
      //validMarkers.sort((a, b) => (a.lat < b.lat) ? 1 : -1);
      return validMarkers;
    };

    const zoomChanged = (zoomLevel: number) => {
      let scaleMap: Map<number, number> = new Map<number, number>([
        [0, 40],
        [1, 10],
        [2, 6],
        [3, 5],
        [4, 2.7], //1.9
        [5, 1.5],
        [6, 0.9],
        [7, 0.6],
        [8, 0.3],
      ]);

      let proxLimit = 0;

      if (scaleMap.has(zoomLevel)) {
        proxLimit = scaleMap.get(zoomLevel)!;
      }
      setProximityLimit(proxLimit);
    };

    return (
      <MapContainer center={{ lat: 65, lng: 27 }} zoom={5} zoomControl={false}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright%22%3EOpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {showHistoryMarkers
          ? getValidMarkers().map((elem, idx) => {
              let currentTime = 0; //(new Date()).getMilliseconds().toString();
              return (
                <Pane
                  key={
                    elem.position +
                    currentTime +
                    "_markerpane" +
                    elem.valid /*`marker-${elem.position}` + Date.now().toString()*/
                  }
                  name={
                    elem.position + currentTime + "_markerpane" + elem.valid
                  } /*elem.position + currentTime + "_marker"*/
                  style={{ zIndex: 1000 + idx }}
                  className={elem.valid ? "fadein" : "fadeout"}
                >
                  <Marker
                    key={elem.position + currentTime + "_markerkey"}
                    position={elem.getPosition()}
                    icon={getIcon(elem, acceptedLimit)}
                  >
                    <Pane
                      name={elem.position + currentTime + "_tooltip"}
                      /*elem.position + currentTime +"_tooltip"*/
                      style={{ zIndex: 2000 + idx }}
                    >
                      <Tooltip
                        direction="center"
                        offset={[0, 0]}
                        opacity={1}
                        permanent={true}
                        className={"tooltip"}
                      >
                        <b>{elem.value + "mm"}</b>{" "}
                      </Tooltip>
                    </Pane>
                    <Pane
                      name={
                        elem.position + currentTime + "_popup"
                      } /*elem.position + currentTime +"_popup"*/
                      style={{ zIndex: 9001 }}
                    >
                      <Popup>
                        <div
                          className="markerPopup"
                          dangerouslySetInnerHTML={{
                            __html: getMarkerPopupMessage(elem).replace(
                              /\n/g,
                              "<br/>"
                            ),
                          }}
                        />
                      </Popup>
                    </Pane>
                  </Marker>
                </Pane>
              );
            })
          : null}

        {showPredictionMarkers
          ? getValidPredictions().map((elem, idx) => {
              let currentTime = 0; //(new Date()).getMilliseconds().toString();

              return (
                <Pane
                  key={
                    elem.position +
                    currentTime +
                    "_predictionpane" +
                    elem.valid /*`marker-${elem.position}` + Date.now().toString()*/
                  }
                  name={
                    elem.position + currentTime + "_predictionpane" + elem.valid
                  } /*elem.position + currentTime + "_marker"*/
                  style={{ zIndex: 1000 + idx }}
                  className={elem.valid ? "fadein" : "fadeout"}
                >
                  <Marker
                    key={elem.position + currentTime + "_predictionkey"}
                    position={elem.getPosition()}
                    icon={getPredictionIcon(elem, acceptedLimit)}
                  >
                    <Pane
                      name={elem.position + currentTime + "_predictiontooltip"}
                      /*elem.position + currentTime +"_tooltip"*/
                      style={{ zIndex: 2000 + idx }}
                    >
                      <Tooltip
                        direction="center"
                        offset={[0, 0]}
                        opacity={1}
                        permanent={true}
                        className={"tooltip"}
                      >
                        <b>{elem.value + "mm"}</b>{" "}
                      </Tooltip>
                    </Pane>
                    <Pane
                      name={
                        elem.position + currentTime + "_predictionpopup"
                      } /*elem.position + currentTime +"_popup"*/
                      style={{ zIndex: 9001 }}
                    >
                      <Popup>
                        <div
                          className="markerPopup"
                          dangerouslySetInnerHTML={{
                            __html: getPredictionPopupMessage(elem).replace(
                              /\n/g,
                              "<br/>"
                            ),
                          }}
                        />
                      </Popup>
                    </Pane>
                  </Marker>
                </Pane>
              );
            })
          : null}

        <InnerObj mapRef={props.mapRef} zoomChanged={zoomChanged} />
      </MapContainer>
    );
  }
);

export default MapComponent;
