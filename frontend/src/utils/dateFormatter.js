export const dateFormatter = (time) => {
  const seconds = Math.floor((new Date() - new Date(time)) / 1000);

  if (seconds < 30) {
    return "Just now";
  }

  if (seconds < 60) {
    return `${seconds} seconds ago`;
  }

  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) {
    return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
  }

  const hours = Math.floor(seconds / 3600);
  if (hours < 24) {
    return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  }

  const days = Math.floor(seconds / 86400);
  if (days < 7) {
    return `${days} day${days > 1 ? "s" : ""} ago`;
  }

  const weeks = Math.floor(seconds / 604800);
  if (weeks < 52) {
    return `${weeks} week${weeks > 1 ? "s" : ""} ago`;
  }

  const years = Math.floor(seconds / 31536000);
  return `${years} year${years > 1 ? "s" : ""} ago`;
};
