




import React from "react";

import Button from '@mui/material/Button';


export interface AboutProps {
    open: boolean;
    onClose: () => void;
  }

  
export default function AboutDialog(props: AboutProps) {
    const { onClose, open } = props;

    const handleClose = () => {
      onClose();
    };

    return (

      <div className="">
        <div>
          <div className={`absolute h-min top-1/10 inset-x-1/10  bg-white z-6000 rounded-3xl text-start px-5 py-5 transition-all duration-500 ${open ? "opacity-100 visible" : "opacity-0 invisible"}`}>
            

            
            <button className={`absolute right-5 top-5 bg-slate-100 border border-black slate-900 rounded-lg px-2 py-2`} onClick={() => handleClose()}>Sulje</button>
            <h2 className={`text-lg slate-900`}>Mikä tämä on?</h2>
            <div className="h-min mt-10 mb-10 mx-10 overflow-y-scroll">
              <p className={"mb-2"}>
                Sivun tarkoitus on visualisoida mittausajankohtaa edeltävän vuorokauden sademääriä eri puolella
                Suomea. Sivusto hyödyntää Ilmatieteen laitoksen avoimen datan palvelua.
                </p>
                <p className={"mb-2"}>
                Mittausdata päivittyy mittausasemasta riippuen pääsääntöisesti kerran vuorokaudessa. Asemaa klikkaamalla näet asemakohtaisen 
                edellisen raportointipäivämäärän.
                </p>
                <p className={"mb-2"}>
                <b>
                  Kartalla näkyvästä kontrolliboksista voit säätää hyväksyttävän sademäärän. 
                  Valitun arvon alittavat havaintoasemat näkyvät kartalla vihreinä.
                </b>
                </p>
                <p className={"mb-2"}>
                Idea sivuston toteuttamiseen tuli siitä, että jotkut ulkona suoritettavat harrastukset eivät sovi yhten märän ympäristön kanssa.
                Sademäärän arviointi olemassaolevien palveluiden perusteella on kuitenkin kömpelöä verrattuna siihen, että säähavainnot näkisi suoraan kartalta.
              </p>
              <p className={"mb-2"}>
                Sivusto on toteutettu Reactilla (ts).
              </p>
            </div>

          </div>


        </div>





      </div>
  );
 }
