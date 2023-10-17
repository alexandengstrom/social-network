import { capitalize } from "../../utils/capitalizeString";
import { dateFormatter } from "../../utils/dateFormatter";
import Biography from "../Biography/Biography";
import FriendRequestButton from "../FriendRequestButton/FriendRequestButton";
import ProfilePicture from "../ProfilePicture/ProfilePicture";
import UploadProfilePicture from "../UploadProfilePicture/UploadProfilePicture";
import styles from "./ProfileInformation.module.css";

function ProfileInformation({ user, reload, ownProfile }) {
  return (
    <>
      <div
        className={`center gap padding ${styles["profile-information-container"]}`}
      >
        <div className="flex-column center gap">
          <ProfilePicture user={user._id} size={200} />
          {ownProfile && <UploadProfilePicture reload={reload} />}
        </div>

        <div className="flex-column gap center">
          <h2>
            {capitalize(user.firstname)} {capitalize(user.lastname)}
          </h2>
          <p className="light">Registered: {dateFormatter(user.registered)}</p>
          <FriendRequestButton user={user._id} reload={reload} />
        </div>
        <Biography user={user} ownProfile={ownProfile} />
      </div>
    </>
  );
}

export default ProfileInformation;
