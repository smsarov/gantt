import React from "react";
import Bar from "./Bar";

const Bars = (groups, container, open, minDate) => {
  const bars = Object.keys(groups)
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

  return bars.map((task) => (
    <Bar key={task.id} config={{ ...task, container: container, open: open }} />
  ));
};

export default Bars;
