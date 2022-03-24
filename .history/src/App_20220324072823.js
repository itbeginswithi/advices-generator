import React from "react";

class App extends React.Component {
  state = {
    advice: "",
  };
  
  fetchAdvice = async () => { 
     try {
         const response = fetc.get('https://api.adviceslip.com/advice');
         console.info(response);
     } catch (error) {
         console.error(error);
     }
  }

  render() {
    return <div>App</div>;
  }
}

export default App;
