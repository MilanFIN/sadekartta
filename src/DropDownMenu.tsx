

import React from "react";




export interface DropDownMenuProps {
  open: boolean;
  showAbout: () => void;
}




export default function DropDownMenuProps(props:DropDownMenuProps) {
  const { open } = props;

  const handleClose = () => {
  };

    return (

      <div className={`absolute z-6000 flex  bg-gray-600 top-0 right-0
                      ${open ? "opacity-100 visible" : "opacity-0 "}
                      transition-all duration-250` }>
        <ul >
          <button  onClick={() => props.showAbout()}>
            <li className={` h-16 w-44 leading-10 hover:bg-white justify-self-center align-middle`}>Mikä tämä on?</li>
          </button>
          <a href="https://www.ilmatieteenlaitos.fi/kysymyksia-avoimesta-datasta" target="_blank">
            <li className={`h-16 w-44 leading-10 hover:bg-white justify-self-center align-middle`}>API Dokumentaatio</li>
          </a>
          <a href="http://github.com/milanfin/sadekartta" target="_blank">
            <li className={`h-16 w-44 leading-10 hover:bg-white justify-self-center align-middle`}>Lähdekoodi (github)</li>
          </a>


        </ul>
      </div>
  );
 }


 /*
w-1/6 h-2/6
 */