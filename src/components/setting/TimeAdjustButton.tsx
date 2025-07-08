import styles from "./TimeAdjustButton.module.scss";
import { useStore } from "../../store/store";

interface Props {
  mode: "session" | "break";
  action: "increment" | "decrement";
}

const TimeAdjustButton = ({ mode, action }: Props) => {
  const { isPlaying, incrementTime, decrementTime } = useStore();

  return (
    <button
      className={`${styles.button} ${styles[action]}`}
      onClick={action === "increment" ? () => incrementTime(mode) : () => decrementTime(mode)}
      disabled={isPlaying}
    >
      {action === "increment" ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="28px"
          viewBox="0 -960 960 960"
          width="28px"
          className={styles.fill}
        >
          <path d="m280-400 200-200.67L680-400H280Z" />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="28px"
          viewBox="0 -960 960 960"
          width="28px"
          className={styles.fill}
        >
          <path d="M480-360 280-559.33h400L480-360Z" />
        </svg>
      )}
    </button>
  );
};

export default TimeAdjustButton;
