import { useContext, createContext, useState } from "react";
import { removeFromFavs } from "../util/handleFavs";

const context = createContext();

export const useBookmarkContext = () => useContext(context);

export const ContextProvider = ({ children }) => {
  //handling fav
  const [increment, setIncrement] = useState(0);
  const [favIcon, setFavIcon] = useState(false);
  const [advice, setAdvice] = useState("");
  const [adviceArray, setAdviceArray] = useState([]);

  const addToFav = () => {
    const adviceExists = adviceArray.find((text) => text === advice);

    if (!adviceExists) {
      /*
        Adding a new advice to the adviceArray using the setAdviceArray function requires me to add
        two different advices (a, b) in order to add (a) to the localstorage for some reason.
        That's why I opted for this way instead.
      */

      adviceArray.unshift(advice);
      localStorage.setItem("advices", JSON.stringify(adviceArray));

      /* 
        Using setIncrement to trigger changes in the sidebar component (To show newly added favs) 
        since Object.is doesnt dig deep into the adviceArray when comparing the old state to the current one.
        see: https://github.com/facebook/react/issues/15858 
      */
      setIncrement((prevState) => prevState + 1);
    }
  };

  function toggleFav(text, fromSidebar) {
    if(!favIcon && !fromSidebar) {
        addToFav();
        setFavIcon(true);
        return;
    }

    if (favIcon || fromSidebar) {
        const { advices, adviceIsRemoved, adviceLength } = removeFromFavs(text);

        if(adviceIsRemoved){ 
            setFavIcon(false);
            setAdviceArray(advices);
            setIncrement((prevState) => prevState + 1);
        }

        /*
          Clears the advice list stored in the browser storage when the the user 
          remove all bookmarked advices from the sidebar
        */
        if (!adviceLength) {
          setAdviceArray([]);
        }
    }

    setIncrement((prevState) => prevState + 1);
  }

  return (
    <context.Provider
      value={{
        increment,
        setIncrement,
        favIcon,
        setFavIcon,
        advice,
        setAdvice,
        toggleFav,
        adviceArray,
        setAdviceArray,
      }}
    >
      {children}
    </context.Provider>
  );
};
