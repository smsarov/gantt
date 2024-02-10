import styles from './dates.module.css'

const DatesByDay = (config) => {
    const {diffDate, minDate} = config;

    return new Array(diffDate).fill(0).map((_, index) => {
      const date = new Date(new Date().setDate(minDate.getDate() + index));
      return (
        <div
          key={date}
          className={styles.dateDays}
          style={{ overflowWrap: "break-word", wordWrap: "break-word" }}
        >
          <p>
            {date.toLocaleDateString(undefined, {month: 'numeric', day: 'numeric'})}
          </p>
        </div>
      );
    });
};

const DatesByWeek = (config) => {
    const {diffDate, minDate, maxDate} = config;
    const weeks = Math.ceil(diffDate / 7);

    return new Array(weeks).fill(0).map((e, index) => {
      const dateStart = new Date(
        new Date().setDate(minDate.getDate() + index * 7)
      );
  
      const dateEnd = new Date(
        Math.min(
          new Date().setDate(minDate.getDate() + (index + 1) * 7 - 1),
          maxDate
        )
      );
  
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
          <p>{dateStart.toLocaleDateString(undefined, {month: 'numeric', day: 'numeric'})}</p>
          <p>-</p>
          <p>{dateEnd.toLocaleDateString(undefined, {month: 'numeric', day: 'numeric'})}</p>
        </div>
      );
    });
  };

export {DatesByDay, DatesByWeek}