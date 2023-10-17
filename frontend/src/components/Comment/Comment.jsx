import { capitalize } from "../../utils/capitalizeString";
import { dateFormatter } from "../../utils/dateFormatter";
import ProfilePicture from "../ProfilePicture/ProfilePicture";
import { Link } from "react-router-dom";

function Comment({ comment }) {
  return (
    <>
      <div className="flex-row gap margin">
        <ProfilePicture user={comment.sender._id} size={30} />
        <div>
          <Link to={`/user/${comment.sender._id}`}>
            {capitalize(comment.sender.firstname)}{" "}
            {capitalize(comment.sender.lastname)}
          </Link>
          <p className="small light">{dateFormatter(comment.date)}</p>
          <p className="small">{comment.content}</p>
        </div>
      </div>
    </>
  );
}

export default Comment;
