import React, { useState, useRef, Fragment } from "react";
import styles from "./chart.module.css";

import TaskInfo from "./TaskInfo/TaskInfo";
import tasks from "./../../tasks";
import { DatesByDay, DatesByWeek } from "./Dates/Dates";
import Bars from "./Bars/Bars";

const minDate = new Date(
  tasks.reduce((cur, e) => {
    return Math.min(e.from, cur);
  }, Infinity)
);
const maxDate = new Date(
  tasks.reduce((cur, e) => {
    return Math.max(e.to, cur);
  }, -Infinity)
);
const diffDate = (maxDate - minDate) / (1000 * 3600 * 24) + 1;
const dateConfig = { minDate: minDate, maxDate: maxDate, diffDate: diffDate };

const groups = Object.groupBy(tasks, (task) => task.group_id);

function Chart() {
  const [scaleName, setScaleName] = useState("day");
  const [task, setTask] = useState(null);

  const chart = useRef();
  const dummy = useRef();
  const container = useRef();
  const info = useRef();

  const toggleInfo = (task) => {
    if (!container.current.style.transform) {
      container.current.style.transform = "scaleX(0.8)";
      container.current.style.transform += " translateX(-5%)";
    } else {
      container.current.style.transform = "";
    }

    if (!info.current.style.transform.length) {
      info.current.style.transform = "translateX(37.5vw)";
      setTask(task);
    } else {
      info.current.style.transform = "";
    }
  };

  let startX = null;

  return (
    <div className={styles.container} ref={container}>

      <div
        ref={chart}
        className={styles.chart}
        style={{
          gridTemplateRows: `2.5em repeat(${
            Object.keys(groups).length
          }, 1fr) 10px`,
          gridTemplateColumns: `repeat(${diffDate}, 20%)`,
        }}
      >
        {scaleName === "day"
          ? DatesByDay(dateConfig).map((date) => date)
          : DatesByWeek(dateConfig).map((date) => date)}
        {Bars(groups, container, toggleInfo, minDate).map(e => e)}
      </div>

      <div
        ref={dummy}
        className={styles.dummy}
        onScroll={() => {
          let maxScroll = 10000 - chart.current.clientWidth;
          let curScroll = dummy.current.scrollLeft;
          let width = Math.lerp(curScroll, 0, maxScroll, 20, 100 / diffDate);

          if (width < 8) {
            setScaleName("week");
          } else {
            setScaleName("day");
          }

          chart.current.style.gridTemplateColumns = `repeat(${diffDate}, ${width}%)`;
        }}
        onMouseDownCapture={(e) => {
          startX = e.clientX;
          dummy.current.style.cursor = "grab";
        }}
        onMouseMove={(e) => {
          if (!startX) return;
          chart.current.scrollLeft += -e.movementX * 2;
        }}
        onMouseUp={() => {
          startX = null;
          dummy.current.style.cursor = "";
        }}
        onMouseLeave={() => {
          startX = null;
          dummy.current.style.cursor = "";
        }}
      >
        <div style={{ width: "10000px", overflowX: "scroll" }}></div>
      </div>

      <TaskInfo _ref={info} task={task} close={() => toggleInfo(null)} />
    </div>
  );
}

export default Chart;
