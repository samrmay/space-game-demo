import React from "react";
import ReactDOM from "react-dom";
import PlayerContainer from "./Player/PlayerContainer";
import AsteroidContainer from "./Asteroid/AsteroidContainer";
import spaceBackground from "../../assets/PNGs/spaceBackground.png";
import styles from "./gameStyle.css";

class GameAreaContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playerXPos: 0,
      playerYPos: 0,
      playerSum: 0,
      asteroidInitialY: 0,
      bottomY: 0,
      asteroidArr: [],
      asteroidIndex: 0,
    };
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleAsteroidCatch = this.handleAsteroidCatch.bind(this);
    this.handleAsteroidMiss = this.handleAsteroidMiss.bind(this);
    this.generateAsteroids = this.generateAsteroids.bind(this);
  }

  componentDidMount() {
    const rect = ReactDOM.findDOMNode(this).getBoundingClientRect();
    const playerY = rect.bottom - 75;
    const playerX = rect.width / 2 + rect.left;
    const initialY = rect.top + 50;
    this.setState({
      playerYPos: playerY,
      playerXPos: playerX,
      asteroidInitialY: initialY,
      bottomY: rect.bottom,
    });
    this.generateAsteroids();
  }

  handleKeyPress(event) {
    const { key } = event;
    if (key == "a") {
      this.setState((prevState) => {
        return { playerXPos: prevState.playerXPos - 8 };
      });
    }

    if (key == "d") {
      this.setState((prevState) => {
        return { playerXPos: prevState.playerXPos + 8 };
      });
    }
  }

  handleAsteroidCatch(index, num) {
    this.setState((prevState) => {
      let newArr = prevState.asteroidArr;
      newArr.splice(
        newArr.findIndex((asteroid) => {
          return asteroid.index == index;
        }),
        1
      );
      return { asteroidArr: newArr, playerSum: prevState.playerSum + num };
    });
  }

  handleAsteroidMiss(index, num) {
    this.setState((prevState) => {
      let newArr = prevState.asteroidArr;
      newArr.splice(
        newArr.findIndex((asteroid) => {
          return asteroid.index == index;
        }),
        1
      );
      return { asteroidArr: newArr, playerSum: prevState.playerSum - num };
    });
  }

  generateAsteroids() {
    const gameAreaRect = ReactDOM.findDOMNode(this).getBoundingClientRect();
    setInterval(() => {
      this.setState((prevState) => {
        const xPos =
          Math.random() * (gameAreaRect.width - 50) + gameAreaRect.left;
        const num = Math.ceil(Math.random() * 10);

        const newArr = prevState.asteroidArr;
        newArr.push({ xPos: xPos, num: num, index: prevState.asteroidIndex });
        return {
          asteroidArr: newArr,
          asteroidIndex: prevState.asteroidIndex + 1,
        };
      });
    }, 5000);
  }

  render() {
    const {
      playerXPos,
      playerYPos,
      playerSum,
      asteroidInitialY,
      bottomY,
    } = this.state;
    const asteroidArr = this.state.asteroidArr.map((asteroid) => {
      return (
        <AsteroidContainer
          initialY={asteroidInitialY}
          bottomY={bottomY}
          xPos={asteroid.xPos}
          num={asteroid.num}
          playerX={playerXPos}
          playerY={playerYPos}
          playerWidth={50}
          key={asteroid.index}
          index={asteroid.index}
          handleAsteroidCatch={this.handleAsteroidCatch}
          handleAsteroidMiss={this.handleAsteroidMiss}
        />
      );
    });

    return (
      <div
        className={styles.gameArea}
        onKeyPress={this.handleKeyPress}
        tabIndex={-1}
        style={{ backgroundImage: "url(" + spaceBackground + ")" }}
      >
        {asteroidArr}
        <PlayerContainer xPos={playerXPos} yPos={playerYPos} sum={playerSum} />
      </div>
    );
  }
}

export default GameAreaContainer;
