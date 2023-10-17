import React, { useRef } from "react";
import styles from "./UploadProfilePicture.module.css";
import { editProfilePicture } from "../../api/editProfilePicture";

function UploadProfilePicture({ reload }) {
  const fileInputRef = useRef(null);

  const handleImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      handleSubmit(event.target.files[0]);
    }
  };

  const handleSubmit = (image) => {
    if (!image) {
      return;
    }

    const formData = new FormData();
    formData.append("image", image);

    editProfilePicture(formData)
      .then((post) => {
        reload();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <>
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        className={styles["hidden-input"]}
        onChange={handleImageChange}
      />
      <a
        href="#"
        className={styles["upload-image-link"]}
        onClick={(e) => {
          e.preventDefault();
          fileInputRef.current.click();
        }}
      >
        Edit image
      </a>
    </>
  );
}

export default UploadProfilePicture;
