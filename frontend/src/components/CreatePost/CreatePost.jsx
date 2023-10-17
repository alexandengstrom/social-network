import styles from "./CreatePost.module.css";

import { useState } from "react";
import ProfilePicture from "../ProfilePicture/ProfilePicture";
import TextField from "../TextField/TextField";

import uploadImage from "./assets/image.png";
import removeIcon from "./assets/remove.png";
import { createPost } from "../../api/createPost";
import { getUserId } from "../../utils/jwt";

function CreatePost({ reload, receiver, placeholder = "Whats happening?" }) {
  const [postContent, setPostContent] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [messageLength, setMessageLength] = useState(0);
  const [image, setImage] = useState(null);
  const [imagePreviewURL, setImagePreviewURL] = useState("");

  const handleInputChange = (e) => {
    setMessageLength(e.target.value.trim().length);
    setPostContent(e.target.value);
  };

  const handleFocusChange = (value) => {
    setIsFocused(value);
  };

  const onSubmit = () => {
    const formData = new FormData();
    formData.append("content", postContent.trim());
    formData.append("receiver", receiver);
    if (image) {
      formData.append("image", image);
    }

    createPost(formData)
      .then((post) => {
        reload();
        setPostContent("");
        setImagePreviewURL("");
        setMessageLength(0);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <>
      <div
        className={`flex-row space-evenly rounded margin padding ${
          isFocused ? `${styles["in-focus"]} shadow` : `${styles["in-blur"]}`
        }`}
        tabIndex={-1}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      >
        <ProfilePicture user={getUserId()} size={60} />

        <div className="flex-col grow-x" style={{ marginLeft: "40px" }}>
          <TextField
            value={postContent}
            onChange={handleInputChange}
            isFocused={isFocused}
            onFocusChange={handleFocusChange}
            placeholder={placeholder}
          />
          {imagePreviewURL && (
            <img
              src={imagePreviewURL}
              className={`rounded ${styles["image-preview"]}`}
              alt="Preview"
            />
          )}
          <div className="flex-row right">
            <p className={messageLength > 140 ? "apply-warning-color" : ""}>
              {messageLength} / 140
            </p>
            {!imagePreviewURL && (
              <label className={styles["upload-label"]}>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    setIsFocused(true);
                    setImage(e.target.files[0]);
                    setImagePreviewURL(URL.createObjectURL(e.target.files[0]));
                    console.log(imagePreviewURL);
                  }}
                  style={{ display: "none" }}
                />
                <img src={uploadImage} className={styles["create-post-icon"]} />
              </label>
            )}

            {imagePreviewURL && (
              <img
                src={removeIcon}
                className={styles["create-post-icon"]}
                onClick={() => setImagePreviewURL("")}
              />
            )}

            <button
              className={styles["create-post-button"]}
              disabled={messageLength > 140}
              onClick={() => onSubmit()}
            >
              Post
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default CreatePost;
