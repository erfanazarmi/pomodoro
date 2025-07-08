import styles from "./TimeSetter.module.scss";
import TimeAdjustButton from "./TimeAdjustButton";
import { useStore } from "../../store/store";

interface Props {
  mode: "session" | "break";
};

const TimeSetter = ({ mode }: Props) => {
  const { isPlaying, sessionLength, breakLength, setTime } = useStore();

  return (
    <div className={styles.container}>
      <h3 className={styles.label}>{mode}</h3>
      <TimeAdjustButton action="increment" mode={mode} />
      <input
        type="number"
        value={String(mode === "session" ? sessionLength : breakLength)}
        className={styles.timeDuration}
        onChange={(e) => setTime(mode, parseInt(e.target.value || "0"))}
        disabled={isPlaying}
      />
      <TimeAdjustButton action="decrement" mode={mode} />
    </div>
  );
};

export default TimeSetter;
