




import React from "react";

import Button from '@mui/material/Button';


export interface AboutProps {
    open: boolean;
    onClose: () => void;
  }

  
export default function SimpleDialog(props: AboutProps) {
    const { onClose, open } = props;

    const handleClose = () => {
      onClose();
    };


    return (

      <div>
      {open ? 
      <div>
          <div className="aboutBkg">

          </div>
          <div className="aboutDiv">
            <Button id="closeButton" onClick={() => handleClose()}>Sulje</Button>
           <h2>Mikä tämä on?</h2>
           <div className="aboutContent">
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
          </div>



          </div>
        </div>
      :null}
      </div>
  );
 }
