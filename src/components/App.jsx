import React from "react";
import GameAreaContainer from "./Game/GameAreaContainer";
import AppHeaderContainer from "./AppHeader/AppHeaderContainer";
import styles from "./appStyle.css";

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={styles.appRoot}>
        <AppHeaderContainer />
        <GameAreaContainer />
        <h4>Sam May. github: https://github.com/samrmay</h4>
      </div>
    );
  }
}

export default App;
