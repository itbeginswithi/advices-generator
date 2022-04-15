import React, { useEffect, useState } from "react";
import axios from "axios";
import { BsJournalBookmarkFill } from "react-icons/bs";

import "./App.scss";
import { alreadyAddedToFavs } from "./util/handleFavs";
import { AdviceBox, Sidebar } from "./components";
import { useBookmarkContext } from "./context/contextProvider";
import CSSTransition from "react-transition-group/CSSTransition";
import "./components/Sidebar/keyframes.scss";

const App = () => {
  const { favIcon, setFavIcon, advice, setAdvice, setAdviceArray } =
    useBookmarkContext();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    fetchAdvice();
  }, []);

  useEffect(() => {
    if (!localStorage.getItem("advices")) {
      return localStorage.setItem("advices", JSON.stringify([]));
    }

    setAdviceArray(JSON.parse(localStorage.getItem("advices")));
  }, []);

  const fetchAdvice = async () => {
    try {
      const response = await axios.get("https://api.adviceslip.com/advice");
      const { advice } = response?.data?.slip;
      setAdvice(advice);

      if (alreadyAddedToFavs(advice)) {
        setFavIcon(true);
      } else {
        setFavIcon(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container">
      <div className="app">
        <AdviceBox
          advice={advice}
          favIcon={favIcon}
          fetchAdvice={fetchAdvice}
        />
        <div className="sidebar-open">
          <button type="button" onClick={() => setIsOpen(true)}>
            <BsJournalBookmarkFill />
          </button>
        </div>
      </div>

      <CSSTransition
        mountOnEnter
        unmountOnExit
        in={isOpen}
        timeout={450}
        classNames={{
          enterActive: "SidebarOpen",
          exitActive: "SidebarClose",
        }}
      >
        <Sidebar setIsOpen={setIsOpen} isOpen={isOpen} />
      </CSSTransition>
    </div>
  );
};

export default App;
