import React from "react";
import spaceship from "../../../assets/SVGs/spaceship.svg";
import styles from "./playerStyle.css";

function PlayerContainer(props) {
  const { xPos, yPos, sum } = props;
  return (
    <div className={styles.playerContainer} style={{ left: xPos, top: yPos }}>
      <img src={spaceship} />
      <h3>{sum}</h3>
    </div>
  );
}

export default PlayerContainer;
