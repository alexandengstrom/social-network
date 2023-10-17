import { Link, Navigate, NavLink } from "react-router-dom";
import ProfilePicture from "../ProfilePicture/ProfilePicture";
import styles from "./Post.module.css";
import { dateFormatter } from "../../utils/dateFormatter";
import InteractionBar from "../InteractionBar/InteractionBar";

const capitalize = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

function Post({ reload, post }) {
  return (
    <>
      <article
        className={`shadow flex-row padding margin-on-desktop rounded-desktop ${styles["post-container"]}`}
      >
        <ProfilePicture user={post.sender._id} size={50} />
        <div className="flex-col padding-left maximize-width">
          <div className="flex-row">
            <Link
              className={styles["post-title"]}
              to={`/user/${post.sender._id}`}
            >
              {capitalize(post.sender.firstname)}{" "}
              {capitalize(post.sender.lastname)}
            </Link>

            {post.sender._id != post.receiver._id && (
              <>
                <p className={styles["post-title"]}>
                  &nbsp;is talking to&nbsp;
                </p>
                <Link
                  className={styles["post-title"]}
                  to={"/user/" + post.receiver._id}
                >
                  {capitalize(post.receiver.firstname)}{" "}
                  {capitalize(post.receiver.lastname)}
                </Link>
              </>
            )}
          </div>
          <p className="light small">{dateFormatter(post.date)}</p>
          <p className={styles["main-post-content"]}>{post.content}</p>
          {post.image && (
            <img
              className={`rounded shadow ${styles["post-image"]}`}
              src={post.image}
              alt="image"
            />
          )}
          <InteractionBar reload={reload} post={post} />
        </div>
      </article>
    </>
  );
}

export default Post;
