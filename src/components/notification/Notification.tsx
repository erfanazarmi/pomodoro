import styles from "./Notification.module.scss";
import { useStore } from "../../store/store";
import messages from "./notificationMessages.json";

export const showNotification = (currentMode: "session" | "break") => {
  if ("Notification" in window && Notification.permission === "granted") {
    new Notification("Pomodoro", {
      body: messages[currentMode][Math.floor(Math.random() * messages[currentMode].length)],
    });
  }
};

const NotificationButton = () => {
  const { isMobile, notificationEnabled, toggleNotification } = useStore();

  if (isMobile) {
    return null;
  }

  return (
    <button className={styles.notificationButton} onClick={toggleNotification} >
      {notificationEnabled ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#ffffff"
          >
            <path d="M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160Zm120-160h240q17 0 28.5-11.5T560-360q0-17-11.5-28.5T520-400H280q-17 0-28.5 11.5T240-360q0 17 11.5 28.5T280-320Zm160-160h240q17 0 28.5-11.5T720-520q0-17-11.5-28.5T680-560H440q-17 0-28.5 11.5T400-520q0 17 11.5 28.5T440-480Zm-160 0q17 0 28.5-11.5T320-520q0-17-11.5-28.5T280-560q-17 0-28.5 11.5T240-520q0 17 11.5 28.5T280-480Zm400 160q17 0 28.5-11.5T720-360q0-17-11.5-28.5T680-400q-17 0-28.5 11.5T640-360q0 17 11.5 28.5T680-320Z"/>
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px" viewBox="0 -960 960 960"
            width="24px"
            fill="#ffffff"
          >
            <path d="M280-480q17 0 28.5-11.5T320-520q0-17-11.5-28.5T280-560q-17 0-28.5 11.5T240-520q0 17 11.5 28.5T280-480Zm600-240v429q0 27-24.5 37.5T812-262L594-480h86q17 0 28.5-11.5T720-520q0-17-11.5-28.5T680-560H514L342-732q-19-19-8.5-43.5T371-800h429q33 0 56.5 23.5T880-720ZM160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800l320 320H368L54-794q-11-11-11-28t11-28q11-11 28-11t28 11l740 740q11 11 11.5 27.5T850-54q-11 11-28 11t-28-11L686-160H160Zm286-240H280q-17 0-28.5 11.5T240-360q0 17 11.5 28.5T280-320h246l-80-80Z"/>
          </svg>
        )}
      <span className={styles.tooltip}>Notification : {notificationEnabled ? "On" : "Off"}</span>
    </button>
  )
};

export default NotificationButton;
