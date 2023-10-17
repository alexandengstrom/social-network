import React, { useEffect, useRef } from "react";
import styles from "./TextField.module.css";

function TextField({ value, onChange, placeholder, fontSize = 20 }) {
  const textareaRef = useRef(null);

  useEffect(() => {
    const textarea = textareaRef.current;
    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
  }, [value]);

  return (
    <textarea
      ref={textareaRef}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={styles["textfield"]}
      style={{
        fontSize: `${fontSize}px`,
      }}
    />
  );
}

export default TextField;
