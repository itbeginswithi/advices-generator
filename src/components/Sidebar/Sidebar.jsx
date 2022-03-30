import React, {useEffect, useState} from 'react'
import CSSTransition from 'react-transition-group/CSSTransition';
import Lottie from 'react-lottie';
import { ImBin } from "react-icons/im";
import { MdOutlineContentCopy } from "react-icons/md";
import { FiChevronRight } from "react-icons/fi";
import { IoLogoWhatsapp } from "react-icons/io";
import { shareTextToWhatsApp } from "share-text-to-whatsapp";


import classes from './Sidebar.module.scss';
import { useBookmarkContext } from '../../context/contextProvider';
import noDataAnimation from '../../animations/89841-no-records-found.json';
import './keyframes.scss';

const Sidebar = ({isOpen, setIsOpen}) => {
  const {toggleFav, increment, advice} = useBookmarkContext();
  const [favourites, setFavourites] = useState([]);

  useEffect(() =>{
    setFavourites(JSON.parse(localStorage.getItem('advices')));
  }, [increment])

  const copyAdviceText = () => {
    window.navigator.clipboard.writeText('"' + advice + '"');
  }

  const animationOptions = { 
    loop: true,
    autoPlay: true,
    animationData: noDataAnimation,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  }

  const animationTiming = {enter: 250, exit: 200};

  return (
      <div className={classes.container}>
        <button className={classes.close} type="button" onClick={() => setIsOpen(false)}><FiChevronRight/></button>
        <div className={classes.sidebar__container}>
          <ul className={classes.sidebar}>
            {
              favourites.map((advice, index) => (
                <li className={classes.advice} key={index}>
                        <h1 className={classes.advice__text}>{advice}</h1>
                        <div className={classes.advice__cta}>
                          <button type="button" title="remove" className={classes.advice__cta_btn} onClick={() => toggleFav(advice, true)}>
                            <ImBin size="15px" color="rgba(255,0,0,0.8)"/>
                          </button>
                          <button type="button" title="copy" className={classes.advice__cta_btn} onClick={() => copyAdviceText()}>
                            <MdOutlineContentCopy size="15px"/>
                          </button>
                          <button type="button" title="whatsapp" className={classes.advice__cta_btn} onClick={() => shareTextToWhatsApp('"' + advice + '"')}>
                            <IoLogoWhatsapp size="15px" color="rgba(0, 255, 32)"/>
                          </button>
                        </div>
                    </li>
              ))
            }

            {!favourites.length && 
             ( <div style={{height: '100%' ,display: 'flex', justifyContent: 'center', alignItems: "center"}}> 
                <Lottie  options={animationOptions} width={'25rem'} height="auto"/>
               </div>
             )
            }
          </ul>
        </div>
      </div>
  )
}

export default Sidebar