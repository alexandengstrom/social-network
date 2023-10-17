import { getUser } from "../../api/getUser";
import { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import ProfilePicture from "../ProfilePicture/ProfilePicture";
import { capitalize } from "../../utils/capitalizeString";
import FriendRequestButton from "../FriendRequestButton/FriendRequestButton";

import styles from "./UserCard.module.css";

function UserCard({ user }) {
  const [userInfo, setUserInfo] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    updateInfo();
  }, [user]);

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
        <div className="flex-change borderbox padding grow-x space-between">
          <div className="flex-change center gap">
            <ProfilePicture user={userInfo._id} />
            <Link
              className={styles["user-card-link"]}
              to={"/user/" + userInfo._id}
            >
              {capitalize(userInfo.firstname)} {capitalize(userInfo.lastname)}
            </Link>
          </div>
          <div className={styles["user-card-button-container"]}>
            <FriendRequestButton user={userInfo._id} />
          </div>
        </div>
      )}
    </>
  );
}

export default UserCard;
