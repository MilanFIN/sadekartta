import React, {useRef, useState} from 'react';
import logo from './logo.svg';
import './App.css';

import MapComponent, { MapComponentHandle } from "./MapComponent";
import MapControls from "./MapControls";

import  Loop  from "@mui/icons-material/Loop";
import Button from '@mui/material/Button';


function App() {

  const mapRef = useRef();
  const mapContainerRef = useRef<MapComponentHandle>(null);
  const [showLoadView, setShowLoadView] = useState(true);
  const [showAbout, setShowAbout] = useState(false);

  const hideLoadView = () => {
    setShowLoadView(false);
  }


  return (
    <div className="App">


<link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.3/dist/leaflet.css"
     integrity="sha256-kLaT2GOSpHechhsozzB+flnD+zUyjE2LlfWPgU04xyI="
     />

    <Button onClick={() => setShowAbout(true)}>Mikä tämä on?</Button>

        <div>
        <MapControls mapRef={mapRef} updateAcceptedRainValue={(value:number) => {
                                        mapContainerRef.current!.updateAcceptedRainValue(value);
                                      }}
          />
  
        {showLoadView ? 
          <div>
          <div className="loadingBkgDiv loadingDiv" >
  
          </div>
          <div className="loadingDiv"> 
            <Loop className="loadingSpinner"/>
  
          </div>
  
          </div>
          : null
  
        }
          <div id="container">
  
          <MapComponent mapRef={mapRef} ref={mapContainerRef} loadingDone={() => hideLoadView()}/>
  
          </div>

        </div>


        {showAbout ? 
        <div>
          
          <div className="aboutBkg">

          </div>
          <div className="aboutDiv">
            <Button id="closeButton" onClick={(() => setShowAbout(false))}>Sulje</Button>
           <h2>Mikä tämä on?</h2>
           <p>
            Sivun tarkoitus on visualisoida mittausajankohtaa edeltävän vuorokauden sademääriä eri puolella
            Suomea. Sivusto hyödyntää Ilmatieteen laitoksen avoimen datan palvelua, josta voit lukea 
            lisää <a href="https://www.ilmatieteenlaitos.fi/kysymyksia-avoimesta-datasta" target="_blank">täältä</a>
            </p>
            <p>
            Mittausdata päivittyy mittausasemasta riippuen pääsääntöisesti kerran vuorokaudessa. Asemaa klikkaamalla näet asemakohtaisen 
            edellisen raportointipäivämäärän.
            </p>
            <p>
            <b>
              Kartalla näkyvästä kontrolliboksista voit säätää hyväksyttävän sademäärän. 
              Valitun arvon alittavat havaintoasemat näkyvät kartalla vihreinä.
            </b>
            </p>
            <p>
            Idea sivuston toteuttamiseen tuli siitä, että jotkut ulkona suoritettavat harrastukset eivät sovi yhten märän ympäristön kanssa.
            Sademäärän arviointi olemassaolevien palveluiden perusteella on kuitenkin kömpelöä verrattuna siihen, että säähavainnot näkisi suoraan kartalta.
           </p>
           <p>
            Sivusto on toteutettu Reactilla (ts). Lähdekoodi on
            saatavissa <a href="https://github.com/MilanFIN/rainmap" target="_blank">githubissa</a>
           </p>
           <ul>
            <li></li>
           </ul>


          </div>
        </div>
        :null
        }

    </div>
  );
}

export default App;
