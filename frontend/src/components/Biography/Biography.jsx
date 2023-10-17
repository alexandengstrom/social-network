import { useState } from "react";
import TextField from "../TextField/TextField";
import styles from "./Biography.module.css";
import { updateBiography } from "../../api/updateBiography";
import { capitalize } from "lodash";

function Biography({ user, ownProfile }) {
  const [editOpen, setEditOpen] = useState(false);
  const [biography, setBiography] = useState(user.biography);
  const [isBiographyValid, setIsBiographyValid] = useState(true);

  const onChange = (e) => {
    setBiography(e.target.value);
    setIsBiographyValid(e.target.value.length <= 140);
  };

  const onSave = () => {
    const body = {
      bio: biography,
    };
    updateBiography(body).then((res) => {
      res.json().then((updatedUser) => {
        setBiography(updatedUser.biography);
        setEditOpen(!editOpen);
      });
    });
  };

  return (
    <>
      <div
        className={`flex-column rounded shadow padding gap space-between ${styles["biography-container"]}`}
      >
        <div className="flex-column gap">
          <h3>{capitalize(user.firstname)}s story:</h3>
          {!editOpen && <p>{biography}</p>}
        </div>
        {editOpen && (
          <>
            <div className={`padding rounded ${styles["edit-biography"]}`}>
              {" "}
              <TextField value={biography} onChange={onChange} fontSize={15} />
            </div>
          </>
        )}
        {!isBiographyValid && <p className="warning">Biography is too long</p>}
        {ownProfile && (
          <div className="flex-row grow-x justify-right">
            <button
              className={styles["edit-biography-button"]}
              onClick={
                !editOpen ? () => setEditOpen(!editOpen) : () => onSave()
              }
              disabled={!isBiographyValid}
            >
              {editOpen ? "Save" : "Edit"}
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export default Biography;
