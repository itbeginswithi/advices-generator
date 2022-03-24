import React from "react";

class App extends React.Component {
  state = {
    advice: "",
  };

  fetchAdvice = async () => {
    try {
      const response = fetch("https://api.adviceslip.com/advice");
      console.info(response);
    } catch (error) {
      console.error(error);
    }
  };

  compo

  render() {
    return <div>App</div>;
  }
}

export default App;
