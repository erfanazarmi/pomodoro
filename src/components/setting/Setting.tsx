import styles from "./Setting.module.scss";
import TimeSetter from "./TimeSetter";

const Setting = () => {
  return (
    <div className={styles.container}>
      <TimeSetter type="session" />
      <TimeSetter type="break" />
    </div>
  );
};

export default Setting;
