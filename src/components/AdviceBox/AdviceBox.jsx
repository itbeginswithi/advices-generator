import React from 'react'
import { BsFillBookmarkPlusFill, BsFillBookmarkCheckFill} from 'react-icons/bs';
import classes from './AdviceBox.module.scss';

import { useBookmarkContext } from '../../context/contextProvider';

const AdviceBox = ({advice, favIcon, fetchAdvice}) => {
  const { toggleFav } = useBookmarkContext();
  
  return (
    <div className={classes.advice__container}>
    <h1 className={classes.advice__text}>{advice}</h1>
    <button className={classes.advice__btn_refresh} onClick={fetchAdvice}>
      <span>Refresh</span>
    </button>
    <div
      className={classes.advice__btn_addToFav}
      style={favIcon ? {backgroundColor: "#000", color: '#fff'} : {}}
      onClick={() => toggleFav(advice)}
      >
      {favIcon ?  <BsFillBookmarkCheckFill /> : <BsFillBookmarkPlusFill/>}
    </div>
  </div>
  )
}

export default AdviceBox