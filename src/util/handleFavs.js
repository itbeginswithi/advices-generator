const alreadyAddedToFavs = (text) => { 
    const advices = JSON.parse(localStorage.getItem("advices"));
    
    if(advices.find(advice => advice === text)) return true;

    return false;
}

const removeFromFavs = (text) => { 
    const advices = JSON.parse(localStorage.getItem("advices"));
    
    const adviceIndex = advices.indexOf(text);
    
    if(adviceIndex !== -1){
        advices.splice(adviceIndex, 1);
        localStorage.setItem('advices', JSON.stringify(advices));
        return {advices, adviceIsRemoved: true, adviceLength: advices.length};
    }
    
    return {advices, adviceIsRemoved: false, adviceLength: advices.length};
}

export {alreadyAddedToFavs, removeFromFavs};