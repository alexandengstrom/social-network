import { useParams } from "react-router-dom";
import { getUser } from "../../api/getUser";
import { useEffect, useState } from "react";
import { getUserId } from "../../utils/jwt";
import ProfileInformation from "../../components/ProfileInformation/ProfileInformation";
import CreatePost from "../../components/CreatePost/CreatePost";
import InfiniteFeed from "../../components/InfiniteFeed/InfiniteFeed";
import { capitalize } from "../../utils/capitalizeString";
import lockImg from "./assets/lock.png";

import styles from "./Profile.module.css";
import UserCard from "../../components/UserCard/UserCard";

function Profile() {
  const { userId } = useParams();
  const [userInfo, setUserInfo] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);
  const [isFriend, setIsFriend] = useState(false);
  const [ownProfile, setOwnProfile] = useState(false);
  const [viewFriends, setViewFriends] = useState(false);

  const reload = () => {
    setRefresh(!refresh);
  };

  useEffect(() => {
    fetchUser();
  }, [userId]);

  const fetchUser = () => {
    setIsLoading(true);
    getUser(userId)
      .then((res) => {
        res
          .json()
          .then((user) => {
            setUserInfo(user);
            setOwnProfile(user._id == getUserId());
            setIsFriend(user.friends.includes(getUserId()));
            setIsLoading(false);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const toggleMenu = () => {
    setViewFriends(!viewFriends);
  };

  return (
    <>
      {isLoading ? (
        "Loading..."
      ) : (
        <>
          <ProfileInformation
            user={userInfo}
            reload={reload}
            ownProfile={ownProfile}
          />
        </>
      )}
      <div className="flex-row space-evenly margin padding">
        <div>
          <h2 className={styles["menu-option-h2"]} onClick={() => toggleMenu()}>
            Feed
          </h2>
          <div
            className={
              !viewFriends
                ? styles["menu-underline-choosen"]
                : styles["menu-underline-not-choosen"]
            }
          ></div>
        </div>
        <div>
          <h2 className={styles["menu-option-h2"]} onClick={() => toggleMenu()}>
            Friends
          </h2>
          <div
            className={
              viewFriends
                ? styles["menu-underline-choosen"]
                : styles["menu-underline-not-choosen"]
            }
          ></div>
        </div>
      </div>

      {!isLoading &&
        viewFriends &&
        userInfo.friends.map((friend, index) => {
          return <UserCard key={userInfo._id + index} user={friend} />;
        })}

      {!viewFriends && (isFriend || ownProfile) && (
        <CreatePost
          receiver={userId}
          placeholder={
            ownProfile
              ? "Who needs therapy when you have your own wall, right?"
              : `Thinking of outsourcing your coding problems to ${capitalize(
                  userInfo.firstname
                )}?`
          }
          reload={reload}
        />
      )}
      {!viewFriends && (isFriend || ownProfile) && (
        <InfiniteFeed userId={userInfo._id} refresh={refresh} reload={reload} />
      )}
      {!viewFriends && !ownProfile && !isFriend && (
        <div
          className={`center flex-row grow-x ${styles["not-friend-message"]}`}
        >
          <img src={lockImg} className={styles["lock-icon"]} alt="lock" />
          <p>You must be friends to post and see the feed</p>
        </div>
      )}
    </>
  );
}

export default Profile;
