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
      const response = await axios.get("https://api.adviceslip.com/advice");
      //   const data = await response.json();
      const {advice} = response.data.slip;
      this.setState({advice);
      //   console.info(data);
    } catch (error) {
      console.error(error);
    }
  };

  render() {
    return <div>App</div>;
  }
}

export default App;
