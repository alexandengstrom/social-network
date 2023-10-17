import { useEffect, useState } from "react";
import { getPost } from "../../api/getPost";
import styles from "./InteractionBar.module.css";

import heartActive from "./assets/heartActive.png";
import heartInactive from "./assets/heartInactive.png";
import deletePostIcon from "./assets/delete.png";
import replyIcon from "./assets/reply.png";

import { getUserId } from "../../utils/jwt";
import { likePost } from "../../api/likePost";
import { unlikePost } from "../../api/unlikePost";
import { deletePost } from "../../api/deletePost";
import Comments from "../Comments/Comments";

function InteractionBar({ reload, post }) {
  const [updatedPost, setUpdatedPost] = useState(post);
  const [refresh, setRefresh] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [commentsOpen, setCommentsOpen] = useState(false);
  const [commentsCount, setCommentsCount] = useState(0);

  useEffect(() => {
    getPost(updatedPost._id).then((res) => {
      res.json().then((newPost) => {
        setIsLiked(newPost.likes.includes(getUserId()));
        setUpdatedPost(newPost);
        setCommentsCount(newPost.comments.length);
      });
    });
  }, [refresh]);

  const toggleLike = () => {
    if (isLiked) {
      unlikePost(updatedPost._id).then((res) => {
        if (res.status == 200) {
          setRefresh(!refresh);
          setIsLiked(false);
        }
      });
    } else {
      likePost(updatedPost._id).then((res) => {
        if (res.status == 200) {
          setRefresh(!refresh);
          setIsLiked(true);
        }
      });
    }
  };

  const onDeletePost = () => {
    deletePost(updatedPost._id).then(() => {
      reload();
    });
  };

  return (
    <>
      <div className="flex-row gap">
        <div className="flex-row">
          <img
            className={styles["interaction-icon"]}
            src={isLiked ? heartActive : heartInactive}
            onClick={() => toggleLike()}
          />
          <p>{updatedPost.likes.length}</p>
        </div>

        <div className="flex-row">
          <img
            className={styles["interaction-icon"]}
            src={replyIcon}
            onClick={() => setCommentsOpen(!commentsOpen)}
          />
          <p>{commentsCount}</p>
        </div>

        <div className="flex-row">
          {updatedPost.sender == getUserId() && (
            <img
              className={styles["interaction-icon"]}
              onClick={() => onDeletePost()}
              src={deletePostIcon}
            />
          )}
        </div>
      </div>
      {commentsOpen && (
        <Comments
          setCommentsCount={setCommentsCount}
          current_post={updatedPost._id}
        />
      )}
    </>
  );
}

export default InteractionBar;
