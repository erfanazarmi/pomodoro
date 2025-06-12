import styles from "./TimeSetter.module.scss";
import TimeAdjustButton from "./TimeAdjustButton";

interface Props {
  type: "session" | "break";
};

const TimeSetter = ({ type }: Props) => {
  return (
    <div className={styles.container}>
      <h3 className={styles.label}>{type}</h3>
      <TimeAdjustButton type="increment" />
      <input
        type="number"
        value={0}
        className={styles.timeDuration}
      />
      <TimeAdjustButton type="decrement" />
    </div>
  );
};

export default TimeSetter;
