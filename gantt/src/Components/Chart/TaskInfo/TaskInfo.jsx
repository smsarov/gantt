import React from "react";
import styles from "./taskinfo.module.css";

import tasks from "/Users/smsarov/gantt/gantt/src/tasks.js";

function TaskInfo(props) {
  if (props.task == null)
    return <div ref={props._ref} className={styles.info}></div>;

  const { name, from, to, group_id, id } = { ...props.task };
  const task = props.task;

  return (
    <div ref={props._ref} className={styles.info} onClick={() => props.close()}>
      <h1>{name}</h1>
      <p>
        Description:
        <h3>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur
          excepturi iusto ab esse provident dignissimos ex, culpa voluptates
          porro cupiditate dolorem, cum minima velit fugit, aspernatur ducimus
          assumenda sit corrupti
        </h3>
      </p>
      <p>
        Start:
        <h3>
          {from.getDate() +
            "." +
            (from.getMonth() + 1) +
            "." +
            from.getFullYear()}
        </h3>
      </p>
      <p>
        Finish:
        <h3>
          {to.getDate() + "." + (to.getMonth() + 1) + "." + to.getFullYear()}
        </h3>
      </p>
      <p>
        Dependencies:
        <h3>
          <div style={{ display: "flex", flexDirection: "row", gap: "10px" }}>
            {task.deps.length
              ? task.deps.map((id) => {
                  return (
                    <a onMouseOver={() => {
                        const bar = document.getElementById('task_' + id);
                        bar.style.boxShadow = '1px 1px .2em black';

                    }} onMouseLeave={() => {
                        const bar = document.getElementById('task_' + id);
                        bar.style.boxShadow = '';
                    }}>
                      {tasks.find((e) => e.id == id).name}
                    </a>
                  );
                })
              : "no dependencies"}
          </div>
        </h3>
      </p>
    </div>
  );
}

export default TaskInfo;
