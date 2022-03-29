import React, {useEffect, useState} from 'react'
import { removeFromFavs } from '../util/handleFavs';
import { ImBin } from "react-icons/im";
import { MdOutlineContentCopy } from "react-icons/md";
import { IoLogoWhatsapp } from "react-icons/io";
import { shareTextToWhatsApp } from "share-text-to-whatsapp";

import classes from './sidebar.module.scss';

const Sidebar = ({newFavAdded, setIncrement, setAdviceArray, setFavIcon, advice}) => {
  const [favourites, setFavourites] = useState([]);

  useEffect(() =>{
    setFavourites(JSON.parse(localStorage.getItem('advices')));
  }, [newFavAdded])
  

  //rename to toggle
  const removeAdviceFromFavs = (text) => { 
    const {adviceLength} = removeFromFavs(text);
    
    if(advice === text){
      setFavIcon(false);
    }
    
    if(!adviceLength){
      setAdviceArray([]);
    }

    setIncrement(prevState => prevState + 1);
  }

  const copyAdviceText = () => {
    window.navigator.clipboard.writeText('"' + advice + '"');
  }

  return (
    <div className={classes.sidebar}>
      <div className={classes.container}>
        {
          favourites.map((advice, index) => (
            <div className={classes.advice} key={index}>
                    <h1>{advice}</h1>
                    <div style={{display: 'flex', gap: '5px', alignItems: 'center', flexWrap: 'wrap'}}>
                      <sup style={{
                        cursor: "pointer",
                        borderRadius: "10%",
                        color: 'rgba(255, 0, 0 , 0.8)',
                        padding: '5px',
                        textAlign: "right",
                        lineHeight: "23px",
                      }} onClick={() => removeAdviceFromFavs(advice)}>
                        <ImBin size="15px"/>
                      </sup>
                      <sup style={{
                        cursor: "pointer",
                        borderRadius: "10%",
                        padding: '5px',
                        textAlign: "right",
                      }} onClick={() => copyAdviceText()}>
                        <MdOutlineContentCopy size="15px"/>
                      </sup>
                      <sup style={{
                        cursor: "pointer",
                        borderRadius: "10%",
                        padding: '5px',
                        textAlign: "right",
                        color: 'turquoise'
                      }} onClick={() => shareTextToWhatsApp('"' + advice + '"')}>
                        <IoLogoWhatsapp size="15px"/>
                      </sup>
                    </div>
                </div>
            ))
            }
      </div>
    </div>
  )
}

export default Sidebar