import styles from "./LoadingSpinner.module.css";

function LoadingSpinner() {
  return (
    <div className={styles["spinner-container"]}>
      <div className={styles["spinner"]}></div>
    </div>
  );
}

export default LoadingSpinner;
