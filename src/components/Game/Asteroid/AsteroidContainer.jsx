import React from "react";
import ReactDOM from "react-dom";
import asteroid from "../../../assets/SVGs/asteroid.svg";
import styles from "./asteroidStyle.css";

class AsteroidContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      yPos: this.props.initialY,
    };
    this.updateYPos = this.updateYPos.bind(this);
  }

  componentDidMount() {
    this.updateYPos();
  }

  updateYPos() {
    const rect = ReactDOM.findDOMNode(this).getBoundingClientRect();

    const updateLoop = setInterval(() => {
      const {
        playerX,
        playerY,
        xPos,
        bottomY,
        handleAsteroidCatch,
        handleAsteroidMiss,
        index,
        num,
      } = this.props;
      const newY = this.state.yPos + 40;
      if (newY > playerY && newY < playerY + 50) {
        if (xPos > playerX && xPos < playerX + 50) {
          handleAsteroidCatch(index, num);
        }
      }

      if (newY > bottomY) {
        handleAsteroidMiss(index, num);
      }

      this.setState((prevState) => {
        return { yPos: newY };
      });
    }, 750);
    this.setState({ updateLoop: updateLoop });
  }

  componentWillUnmount() {
    clearInterval(this.state.updateLoop);
  }

  render() {
    const { xPos, num } = this.props;
    const { yPos } = this.state;
    return (
      <div
        className={styles.asteroidContainer}
        style={{ top: yPos, left: xPos }}
      >
        <span className={styles.asteroidNumContainer}>{num}</span>
        <img src={asteroid} style={{ width: "40px" }} />
      </div>
    );
  }
}

export default AsteroidContainer;
