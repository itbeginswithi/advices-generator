import React from "react";

class App extends React.Component {
  state = {
    advice: "",
  };
  
  fetchAdvice = async () => { 
     try {
         
     } catch (error) {
         console.error(error)
     }
  }

  render() {
    return <div>App</div>;
  }
}

export default App;
