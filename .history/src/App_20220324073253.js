import React from "react";

class App extends React.Component {
  state = {
    advice: "",
  };
  
    componentDidMount(){
        this.fetchAdvice()
    }

  fetchAdvice = async () => {
    try {
      const response = await fetch("https://api.adviceslip.com/advice");
      const data = await response.text();
      console.info(data);
    } catch (error) {
      console.error(error);
    }
  };

  render() {
    return <div>App</div>;
  }
}

export default App;
