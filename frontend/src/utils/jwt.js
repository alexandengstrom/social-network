import jwtDecode from "jwt-decode";

export const removeToken = () => {
  localStorage.removeItem("token");
};

export const saveToken = (token) => {
  localStorage.setItem("token", token);
};

export const getToken = () => {
  return localStorage.getItem("token");
};

const isTokenExpired = (token) => {
  const current_time = Date.now().valueOf() / 1000;

  return token.exp < current_time;
};

export const isAuthenticated = () => {
  const token = getToken();
  if (!token || token == "undefined") return false;

  const decodedToken = jwtDecode(token);

  const authenticated = !isTokenExpired(decodedToken);
  if (!authenticated) {
    document.cookie = "";
  }

  return authenticated;
};

export const getUserId = () => {
  const token = getToken();
  if (!token) return undefined;

  const decodedToken = jwtDecode(token);

  return decodedToken._id || undefined;
};
