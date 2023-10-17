import { useEffect, useState } from "react";
import { getProfileFeed, getFeed } from "../../api/feed";
import Post from "../Post/Post";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import debounce from "lodash/debounce";

function InfiniteFeed({ reload, refresh, userId = false }) {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [isFetching, setIsFetching] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    setIsFetching(true);

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!isFetching) return;
    loadPosts();
  }, [isFetching]);

  useEffect(() => {
    refreshPosts();
  }, [refresh]);

  const loadPosts = async () => {
    setIsFetching(true);

    if (userId) {
      getProfileFeed(userId, page).then((res) => {
        res.json().then((newPosts) => {
          setPosts((prevState) => [...prevState, ...newPosts]);
          setPage((prevState) => prevState + 1);
          if (newPosts.length < 10) setHasMore(false);
          setIsFetching(false);
        });
      });
    } else {
      getFeed(page).then((res) => {
        res.json().then((newPosts) => {
          setPosts((prevState) => [...prevState, ...newPosts]);
          setPage((prevState) => prevState + 1);
          if (newPosts.length < 10) setHasMore(false);
          setIsFetching(false);
        });
      });
    }
  };

  const handleScroll = debounce(() => {
    const threshold = 50;

    if (
      window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - threshold &&
      !isFetching &&
      hasMore
    ) {
      setIsFetching(true);
    }
  }, 100);

  const refreshPosts = async () => {
    setPage(1);
    setPosts([]);
    setHasMore(true);
    setIsFetching(true);
  };

  return (
    <div className="fade-in">
      {posts.map((post) => (
        <Post reload={reload} key={post._id} post={post} />
      ))}
      {isFetching && <LoadingSpinner />}
      {!hasMore && (
        <p className="padding margin">You scrolled to the bottom!</p>
      )}
    </div>
  );
}

export default InfiniteFeed;
