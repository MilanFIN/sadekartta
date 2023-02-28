




import React, { useRef, useEffect, useState } from "react";

import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import PersonIcon from '@mui/icons-material/Person';
import AddIcon from '@mui/icons-material/Add';
import Typography from '@mui/material/Typography';
import { blue } from '@mui/material/colors';
import { borderRadius } from "@mui/system";


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
      <Dialog 
        onClose={handleClose} open={open} className={"AboutDialog"}
        maxWidth="xl"
        sx={{zIndex: 6000}}
      >
        <DialogTitle>Mikä tämä on?
        <Button id="closeButton" onClick={() => handleClose()}>Sulje</Button>
        </DialogTitle>

        
        <div className={"AboutContent"} >



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
      </Dialog>
    );
  }
  