import styles from "./Controls.module.scss";
import ControlButton from "./ControlButton";

const Controls = () => {
  return (
    <div className={styles.container}>
      <ControlButton type="play-pause" />
      <ControlButton type="reset" />
    </div>
  );
};

export default Controls;
