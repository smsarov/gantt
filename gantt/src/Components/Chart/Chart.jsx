import React, { useState, useRef, Fragment } from "react";
import styles from "./chart.module.css";

import Bar from "./Bar/Bar";
import TaskInfo from "./TaskInfo/TaskInfo";
import tasks from "/Users/smsarov/gantt/gantt/src/tasks.js";

const lerp = (x, y, a) => x * (1 - a) + y * a;

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

const groups = Object.groupBy(tasks, (task) => task.group_id);

let arr = Object.keys(groups)
  .map((key, index) => {
    const group = groups[key];
    return group.map((task) => {
      return {
        colStart: (task.from - minDate) / (1000 * 3600 * 24) + 1,
        colEnd: (task.to - minDate) / (1000 * 3600 * 24) + 2,
        rowStart: index + 2,
        rowEnd: index + 2,
        task: task,
      };
    });
  })
  .flat();

const DatesByDay = () => {
  return new Array(diffDate).fill(0).map((e, index) => {
    const date = new Date(new Date().setDate(minDate.getDate() + index));
    let day = date.getDate();
    if (day < 10) day = "0" + day;
    let month = date.getMonth() + 1;
    if (month < 10) month = "0" + month;
    return (
      <div
        key={date}
        className={styles.dateDays}
        style={{ overflowWrap: "break-word", wordWrap: "break-word" }}
      >
        <p>
          {day + "."}
          <wbr />
          {month}
        </p>
      </div>
    );
  });
};

const DatesByWeek = () => {
  const weeks = Math.ceil(diffDate / 7);
  return new Array(weeks).fill(0).map((e, index) => {
    const dateStart = new Date(
      new Date().setDate(minDate.getDate() + index * 7)
    );
    let dayStart = dateStart.getDate();
    if (dayStart < 10) dayStart = "0" + dayStart;
    let monthStart = dateStart.getMonth() + 1;
    if (monthStart < 10) monthStart = "0" + monthStart;

    const dateEnd = new Date(
      Math.min(
        new Date().setDate(minDate.getDate() + (index + 1) * 7 - 1),
        maxDate
      )
    );
    let dayEnd = dateEnd.getDate();
    if (dayEnd < 10) dayEnd = "0" + dayEnd;
    let monthEnd = dateEnd.getMonth() + 1;
    if (monthEnd < 10) monthEnd = "0" + monthEnd;

    return (
      <div
        key={dateStart}
        className={styles.dateWeeks}
        style={{
          gridColumnStart: index * 7 + 1,
          gridColumnEnd: Math.min((index + 1) * 7 + 1, diffDate + 1),
          gridRow: "0 / 0",
        }}
      >
        <p>{dayStart + "." + monthStart}</p>
        <p>-</p>
        <p>{dayEnd + "." + monthEnd}</p>
      </div>
    );
  });
};


function Chart() {
  const [scaleName, setScaleName] = useState("day");
  const chart = useRef();
  const dummy = useRef();
  const container = useRef();
  const info = useRef();

  const [task, setTask] = useState(null);

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
          ? DatesByDay(scaleName).map((date) => date)
          : DatesByWeek(scaleName).map((date) => date)}

        {arr.map((task) => (
          <Bar
            key={task.id}
            config={{ ...task, container: container, open: toggleInfo }}
          />
        ))}
      </div>
      <div
        ref={dummy}
        className={styles.dummy}
        onScroll={() => {
          let maxScroll = 10000 - chart.current.clientWidth;
          let curScroll = dummy.current.scrollLeft;
          let width = lerp(20, 100 / diffDate, curScroll / maxScroll);

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
        onMouseUp={(e) => {
          startX = null;
          dummy.current.style.cursor = "";
        }}
        onMouseLeave={(e) => {
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
