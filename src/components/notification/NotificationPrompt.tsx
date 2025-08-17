import styles from "./NotificationPromp.module.scss";

const NotificationPrompt = ({ closePrompt }: { closePrompt: () => void }) => {
  const handleClick = () => {
    closePrompt();
  };

  const stopPropagation = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div className={styles.promptBG} onClick={handleClick}>
      <div className={styles.promptBox} onClick={stopPropagation}>
        <p>
          Please enable notifications from the left side of the address bar.
        </p>
        <button className={styles.button} onClick={closePrompt}>
          OK
        </button>
      </div>
    </div>
  );
};

export default NotificationPrompt;
