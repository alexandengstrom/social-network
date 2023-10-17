import { useEffect, useState } from "react";
import image from "./dummy.jpg";
import styles from "./ProfilePicture.module.css";
import { getUser } from "../../api/getUser";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

function ProfilePicture({ user, size = 100 }) {
  const [isLoading, setIsLoading] = useState(true);
  const [url, setUrl] = useState("");

  useEffect(() => {
    getUser(user).then((res) => {
      res.json().then((userInfo) => {
        setUrl(userInfo.image);
        setIsLoading(false);
      });
    });
  });

  return (
    <>
      {!isLoading && (
        <img
          src={url ? url : image}
          alt="Profile picture"
          className={`scale-image shadow ${styles["profile-picture"]}`}
          style={{
            minWidth: `${size}px`,
            maxWidth: `${size}px`,
            minHeight: `${size}px`,
            maxHeight: `${size}px`,
          }}
        />
      )}
    </>
  );
}

export default ProfilePicture;
