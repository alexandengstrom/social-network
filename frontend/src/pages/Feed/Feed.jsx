import CreatePost from "../../components/CreatePost/CreatePost";
import { getUserId } from "../../utils/jwt";
import { useState } from "react";
import InfiniteFeed from "../../components/InfiniteFeed/InfiniteFeed";

function Feed() {
  const [refresh, setRefresh] = useState(false);

  const reload = () => {
    setRefresh(!refresh);
  };

  return (
    <>
      <CreatePost
        reload={reload}
        receiver={getUserId()}
        placeholder="Ever written code that haunts your dreams? Tell us!"
      />
      <InfiniteFeed reload={reload} refresh={refresh} />
    </>
  );
}

export default Feed;
