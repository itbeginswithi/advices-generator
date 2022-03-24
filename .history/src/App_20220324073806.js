import React from "react";
import axios from "axios";

class App extends React.Component {
  state = {
    advice: "",
  };
  
    componentDidMount(){
        this.fetchAdvice()
    }

  fetchAdvice = async () => {
    try {
    //   const response = await fetch("https://api.adviceslip.com/advice");
      const response = await axios.get("https://api.adviceslip.com/addvice");
    //   const data = await response.json();
      console.info(response);
    //   console.info(data);
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    return <div>App</div>;
  }
}

export default App;
