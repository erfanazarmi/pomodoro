import styles from "./Setting.module.scss";
import TimeSetter from "./TimeSetter";

const Setting = () => {
  return (
    <div className={styles.container}>
      <TimeSetter mode="session" />
      <TimeSetter mode="break" />
    </div>
  );
};

export default Setting;
