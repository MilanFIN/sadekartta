import React from "react";

import Button from "@mui/material/Button";
import { ReactComponent as MarkerLayerIcon } from "./assets/hide.svg";
import { ReactComponent as CloudLayerIcon } from "./assets/cloud.svg";

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
        <div
          className={`absolute h-[50%] top-1/10 inset-x-1/10  bg-white z-6000 rounded-3xl text-start px-5 py-5 transition-all duration-500 ${
            open ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
        >
          <button
            className={`absolute right-5 top-5 bg-slate-100 border border-black slate-900 rounded-lg px-2 py-2`}
            onClick={() => handleClose()}
          >
            Sulje
          </button>
          <h2 className={` h-1/6 text-center text-lg slate-900`}>
            Mikä tämä on?
          </h2>
          <div className="h-4/6 mt-10 mb-10 mx-10 overflow-y-scroll">
            <p className={"mb-2"}>
              Sivun tarkoitus on visualisoida mittausajankohtaa edeltävän
              vuorokauden sademääriä ja ennusteita eri puolella Suomea. Sivusto
              hyödyntää Ilmatieteen laitoksen avoimen datan palvelua.
            </p>

            <p className={"mb-2"}>
              <b>Iconit</b>
            </p>

            <p className={"mb-2"}>
              <div className="flex items-center">
                <MarkerLayerIcon className="h-12 w-12" />
                <span className="ml-2">
                  Edellisen vuorokauden sademäärä sijainnissa. Päivittyy
                  pääsääntöisesti kerran vuorokaudessa.
                </span>
              </div>

              <div className="flex items-center">
                <CloudLayerIcon className="h-12 w-12" />
                <span className="ml-2">
                  Sademäärän (1h) ennuste sijainnissa valitun ajan kuluttua
                </span>
              </div>
            </p>

            <p className={"mb-2"}>
              Kartalla näkyvästä kontrolliboksista voit säätää hyväksyttävän
              sademäärän. Valitun arvon alittavat havaintoasemat näkyvät
              kartalla vihreinä.
            </p>

            <p className={"mb-2"}>Sivusto on toteutettu Reactilla (ts).</p>
          </div>
        </div>
      </div>
    </div>
  );
}
