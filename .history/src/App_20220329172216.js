import React, { useEffect, useState } from "react";
import axios from "axios";
import { MdFavorite } from 'react-icons/md';

import Sidebar from "./components/Sidebar";
import "./App.css";
import { alreadyAddedToFavs, removeFromFavs } from "./util/handleFavs";

const App = () => {
  const [advice, setAdvice] = useState('');
  const [adviceArray, setAdviceArray] = useState([]);
  const [favIcon, setFavIcon] = useState(false);
  const [increment, setIncrement] = useState(0);

  useEffect(() => {
    fetchAdvice();
  }, []);

  useEffect(() => {
    if (!localStorage.getItem("advices")) {
      return localStorage.setItem("advices", JSON.stringify([]));
    }

    setAdviceArray(JSON.parse(localStorage.getItem("advices")));
  }, []);

  const addToFav = () => {
      const adviceExists = adviceArray.find((saying) => saying === advice);

      if (!adviceExists) {
        //Adding a new advice to the adviceArray using the set function requires me to add two different advices (a, b) just to add (a) to the localhost for some reason.
        //That's why I opted for this way instead.
        adviceArray.unshift(advice);
        localStorage.setItem("advices", JSON.stringify(adviceArray));

        /* Using setIncrement to trigger changes in the sidebar component (To show newly added favs) 
           since Object.is doesnt dig deep into the adviceArray when comparing the old state to the current one.
           see: https://github.com/facebook/react/issues/15858 
        */
        setIncrement(prevState => prevState + 1);
    }
  };

  const fetchAdvice = async () => {
    try {
      const response = await axios.get("https://api.adviceslip.com/advice");
      const { advice } = response.data.slip;
      setAdvice(advice);

      if(alreadyAddedToFavs(advice)){
        setFavIcon(true);
      }else{ 
        setFavIcon(false);
      }
    } catch (error) {
      console.error(error);
    }
  };
                                        
  function clickedBtn(){
    if(favIcon){ 
        const {advices, adviceIsRemoved} = removeFromFavs(advice);
        //remove fav   
        if(adviceIsRemoved){ 
            setAdviceArray(advices);
            setIncrement(prevState => prevState + 1);
            setFavIcon(false);
        }
    }else{                   
        addToFav();
        setFavIcon(true);
    }
  };

  return (
    <div style={{display: 'flex', height: "100%"}}>
    <div className="app">
      <div className="advice">
        <h1>{advice}</h1>
        <button className="button" onClick={fetchAdvice}>
          <span>Refresh</span>
        </button>
        <div
          style={{
            position: "absolute",
            right: "0",
            top: "0",
            cursor: "pointer",
            borderRadius: "50%",
            width: '25px',
            height: '25px',
            textAlign: "center",
            lineHeight: "23px",
            background: "#ecege5",
            color:  favIcon ? "red" : "white",
            transition: "all .4s ease",
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onClick={clickedBtn}
          >
          <MdFavorite />
        </div>
      </div>
    </div>
      <Sidebar newFavAdded={increment} setIncrement={setIncrement} setAdviceArray={setAdviceArray}  advice={advice} setFavIcon={setFavIcon}/>
    </div>
  );
};

export default App;
