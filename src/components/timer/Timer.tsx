import { useEffect, useRef } from "react";
import { useStore } from "../../store/store";
import styles from "./Timer.module.scss";
import { showNotification } from "../notification/Notification";

interface Props {
  audioRef: React.RefObject<HTMLAudioElement | null>;
}

const Timer = ({ audioRef }: Props) => {
  const { isMobile, isPlaying, currentMode, sessionLength, breakLength, displayTime, notificationEnabled, setCurrentMode, setDisplayTime } = useStore();

  const endTimeRef = useRef<number | null>(null);
  const intervalRef = useRef<number | null>(null);

  const formatTime = (time: number) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;
    return (
      (hours > 0 ? hours + ":" : "") +
      (minutes < 10 ? "0" + minutes : minutes) +
      ":" +
      (seconds < 10 ? "0" + seconds : seconds)
    );
  };

  useEffect(() => {
    if (isPlaying) {
      if (!endTimeRef.current) {
        endTimeRef.current = Date.now() + displayTime * 1000;
      }
      intervalRef.current = setInterval(() => {
        const now = Date.now();
        const remaining = Math.max(Math.round((endTimeRef.current! - now) / 1000), 0);
        setDisplayTime(remaining);
        if (remaining === 0) {
          if (!isMobile && notificationEnabled) {
            showNotification(currentMode);
          }
          if (audioRef.current) {
            audioRef.current.play();
          }
          if (currentMode === "session") {
            setCurrentMode("break");
            setDisplayTime(breakLength * 60);
            endTimeRef.current = Date.now() + breakLength * 60 * 1000;
          } else {
            setCurrentMode("session");
            setDisplayTime(sessionLength * 60);
            endTimeRef.current = Date.now() + sessionLength * 60 * 1000;
          }
        }
      }, 1000);
    } else {
      clearInterval(intervalRef.current ?? undefined);
      endTimeRef.current = null;
    }

    return () => {
      clearInterval(intervalRef.current ?? undefined);
    };
  }, [isPlaying, sessionLength, breakLength, currentMode]);

  return (
    <>
      <h2 className={styles.label}>
        {currentMode}&nbsp;
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="20px"
          viewBox="0 -960 960 960"
          width="20px"
          className={styles.fill}
        >
          <path d="M479.33-81.33q-74.33 0-139.83-28.17-65.5-28.17-114-77t-77-114Q120-365.67 120-440.67q0-74.33 28.5-139.83 28.5-65.5 77-114.33 48.5-48.84 114-77Q405-800 479.33-800q74.34 0 139.84 28.17 65.5 28.16 114.33 77 48.83 48.83 77 114.33t28.17 139.83q0 75-28.17 140.17-28.17 65.17-77 114t-114.33 77q-65.5 28.17-139.84 28.17Zm118-194.67L644-322.67 514.67-452v-188H448v214.67L597.33-276Zm-380-590.67L264-820 98-658l-46.67-46.67 166-162Zm524 0 166 162L860.67-658l-166-162 46.66-46.67Z" />
        </svg>
      </h2>
      <div className={styles.timeLeft}>{formatTime(displayTime)}</div>
    </>
  );
};

export default Timer;
