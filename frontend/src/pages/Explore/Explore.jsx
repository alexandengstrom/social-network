import { useState, useEffect } from "react";
import { searchUsers } from "../../api/searchUsers";
import UserCard from "../../components/UserCard/UserCard";

import styles from "./Explore.module.css";

function Explore() {
  const [searchPrompt, setSearchPrompt] = useState("");
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (searchPrompt.length < 1) {
      setResults([]);
    } else {
      fetchUsers();
    }
  }, [searchPrompt]);

  const fetchUsers = () => {
    searchUsers(searchPrompt).then((res) => {
      res.json().then((searchResults) => {
        setResults([]);
        setResults(searchResults);
        setIsLoading(false);
      });
    });
  };

  return (
    <>
      <input
        className={styles["search-input-field"]}
        value={searchPrompt}
        onChange={(e) => setSearchPrompt(e.target.value)}
        placeholder="Debugging buddies: only a search away!"
      />
      {results.length != 0 &&
        results.map((user) => {
          return <UserCard user={user._id} />;
        })}
    </>
  );
}

export default Explore;
