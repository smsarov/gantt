import React from "react";
import { useRef } from "react";
import styles from "./bar.module.css";

function Bar({ config }) {
  const owner = config.owner;
  const showInfo = config.open;
  return (
    <div
      onClick={() => {
        showInfo(config.task);
      }}
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        gridColumn: `${config.colStart} / ${config.colEnd}`,
        gridRow: `${config.rowStart} / ${config.rowEnd}`,
      }}
    >
      <div className={styles.bar} id={"task_" + config.task.id}>
        <p>{config.task.name}</p>
      </div>
    </div>
  );
}

export default Bar;
