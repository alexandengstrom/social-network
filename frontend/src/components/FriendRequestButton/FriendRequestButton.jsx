import { useEffect, useState } from "react";
import styles from "./FriendRequestButton.module.css";
import { getUserId } from "../../utils/jwt";
import { getUser } from "../../api/getUser";
import { addFriend, removeFriend } from "../../api/friendRequests";

function FriendRequestButton({ user, reload = null }) {
  const [me, setMe] = useState({});
  const [other, setOther] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [buttonText, setButtonText] = useState("Loading...");

  const fetchUsers = () => {
    setIsLoading(true);
    getUser(getUserId()).then((res) => {
      res.json().then((firstUser) => {
        setMe(firstUser);
        getUser(user).then((res) => {
          res.json().then((secondUser) => {
            setOther(secondUser);
          });
        });
      });
    });
  };

  const updateButton = () => {
    if (me.friends.includes(other._id)) {
      setButtonText("Remove friend");
    } else if (me.requests.includes(other._id)) {
      setButtonText("Accept request");
    } else if (other.requests.includes(me._id)) {
      setButtonText("Cancel request");
    } else {
      setButtonText("Send request");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    if (Object.keys(me).length != 0 && Object.keys(me).length != 0) {
      setIsLoading(false);
    }
  }, [me, other]);

  useEffect(() => {
    if (
      !isLoading &&
      Object.keys(me).length !== 0 &&
      Object.keys(other).length !== 0
    ) {
      updateButton();
    }
  }, [isLoading, me, other]);

  const onSubmit = () => {
    if (buttonText == "Send request" || buttonText == "Accept request") {
      addFriend(other._id).then((res) => {
        if (res.status == 200) {
          fetchUsers();
          if (reload != null) {
            reload();
          }
        }
      });
    } else {
      removeFriend(other._id).then((res) => {
        if (res.status == 200) {
          fetchUsers();
          if (reload != null) {
            reload();
          }
        }
      });
    }
  };

  return (
    <>
      {!isLoading && me._id != other._id && (
        <button
          onClick={() => onSubmit()}
          className={`shadow ${styles["send-request-button"]} ${
            buttonText == "Send request" || buttonText == "Accept request"
              ? "green"
              : "red"
          }`}
        >
          {buttonText}
        </button>
      )}
    </>
  );
}

export default FriendRequestButton;
