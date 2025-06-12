import styles from "./TimeAdjustButton.module.scss";

interface Props {
  type: "increment" | "decrement";
}

const TimeAdjustButton = ({ type }: Props) => {
  return (
    <button className={`${styles.button} ${styles[type]}`}>
      {type === "increment" ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="28px"
          viewBox="0 -960 960 960"
          width="28px"
          fill="#FFFFFF"
        >
          <path d="m280-400 200-200.67L680-400H280Z" />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="28px"
          viewBox="0 -960 960 960"
          width="28px"
          fill="#FFFFFF"
        >
          <path d="M480-360 280-559.33h400L480-360Z" />
        </svg>
      )}
    </button>
  );
};

export default TimeAdjustButton;
