import React, {useEffect, useState} from 'react'
import { removeFromFavs } from '../util/handleFavs';

import classes from './sidebar.module.css';

const Sidebar = ({newFavAdded, setIncrement, setAdviceArray, setFavIcon, advice}) => {
  const [favourites, setFavourites] = useState([]);

  useEffect(() =>{
    setFavourites(JSON.parse(localStorage.getItem('advices')));
  }, [newFavAdded])
  
  const removeAdviceFromFavs = (text) => { 
    setIncrement(prevState => prevState + 1);
    const {adviceLength} = removeFromFavs(text);

    if(advice === text){
      setFavIcon(false);
    }

    if(!adviceLength){
      setAdviceArray([]);
    }
  }

  return (
    <div className={classes.sidebar}>
      <div className={classes.container}>
        {
            favourites?.length ? favourites.map((advice, index) => (
                <div className={classes.advice} key={index}>
                    <h1>{advice}</h1>
                    <sup style={{
                      cursor: "pointer",
                      background: 'black',
                      borderRadius: "10%",
                      color: 'white',
                      padding: '5px',
                      textAlign: "right",
                      lineHeight: "23px",
                    }} onClick={() => removeAdviceFromFavs(advice)}>remove</sup>
                </div>
            )): (
              <p>Add new fav</p>
            )
        }
      </div>
    </div>
  )
}

export default Sidebar