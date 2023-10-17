import { getUser } from "../../api/getUser.js";
import { useState, useEffect } from "react";
import { capitalize } from "../../utils/capitalizeString.js";
import styles from "./FriendOnlineStatus.module.css";

function FriendOnlineStatus({ user, isOnline, onClick }) {
  const [userInfo, setUserInfo] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    updateInfo();
  }, []);

  const updateInfo = () => {
    setIsLoading(true);

    getUser(user).then((res) => {
      res.json().then((newUserInfo) => {
        setUserInfo(newUserInfo);
        setIsLoading(false);
      });
    });
  };

  return (
    <>
      {!isLoading && (
        <div
          className={`flex-row gap ${styles["friend-online-status"]}`}
          onClick={() => onClick(user)}
        >
          <div
            className={
              isOnline
                ? styles["friend-is-online"]
                : styles["friend-is-offline"]
            }
          ></div>
          <p>
            {capitalize(userInfo.firstname)} {capitalize(userInfo.lastname)}
          </p>
        </div>
      )}
    </>
  );
}

export default FriendOnlineStatus;
