import { useEffect, useState } from "react";
import TextField from "../TextField/TextField";
import styles from "./Comments.module.css";
import { postComment } from "../../api/postComment";
import { getComments } from "../../api/getComments";
import Comment from "../Comment/Comment";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

function Comments({ setCommentsCount, current_post }) {
  const [isLoading, setIsLoading] = useState(false);
  const [comment, setComment] = useState("");
  const [commentLength, setCommentLength] = useState(0);
  const [comments, setComments] = useState([]);

  const handleInputChange = (e) => {
    setCommentLength(e.target.value.length);
    setComment(e.target.value);
  };

  const onSubmit = () => {
    const body = {
      content: comment,
    };

    postComment(current_post, body)
      .then((res) => {
        if (res.status == 200) {
          fetchComments();
          setCommentsCount((prevCommentsCount) => prevCommentsCount + 1);
          setComment("");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = () => {
    setIsLoading(true);
    getComments(current_post)
      .then((res) => {
        res
          .json()
          .then((posts) => {
            setComments(posts.comments);
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

  return (
    <>
      {isLoading && <LoadingSpinner />}
      <div className={`flex-col rounded padding gap`}>
        {comments.map((comment) => {
          return <Comment key={comment._id} comment={comment} />;
        })}

        <div
          className={`flex-row rounded padding ${styles["create-comment-container"]}`}
        >
          <TextField
            value={comment}
            placeholder="The stage is yours! What's your take on this?"
            fontSize={15}
            onChange={handleInputChange}
          />
          <button
            disabled={commentLength > 140}
            onClick={onSubmit}
            className={styles["post-comment-button"]}
          >
            Post
          </button>
        </div>
      </div>
      {commentLength > 140 && <p>Your comment is too long...</p>}
    </>
  );
}

export default Comments;
