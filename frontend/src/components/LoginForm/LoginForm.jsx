import { Link, Navigate } from "react-router-dom";
import styles from "./LoginForm.module.css";
import { useState, useEffect } from "react";
import { loginUser } from "../../api/login";
import { isAuthenticated, saveToken } from "../../utils/jwt";
import bcrypt from "bcryptjs-react";

const LOGIN_URL = "/login";

const EMAIL_REGEX = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[\x20-\x7E]{8,24}$/;

function LoginForm() {
  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [pwd, setPwd] = useState("");
  const [pwdFocus, setPwdFocus] = useState(false);

  const [errorMsg, setErrorMsg] = useState("");
  const [success, setSuccess] = useState(false);

  const [userIsAuthenticated, setUserIsAuthenticated] = useState(false);

  useEffect(() => {
    setUserIsAuthenticated(isAuthenticated());
  }, []);

  useEffect(() => {
    setErrorMsg("");
  }, [email, pwd]);

  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(email));
  }, [email]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (email && pwd) {
      const hashedPassword = hashPassword(pwd);

      const data = {
        email: email,
        password: hashedPassword,
      };
      loginUser(data).then((res) => {
        res.json().then((token) => {
          saveToken(token.token);
          setUserIsAuthenticated(true);
        });
      });
    }
  };

  const hashPassword = (password) => {
    const hash = bcrypt.hashSync(password, "$2a$10$aFJI6TD44jOJRyEVmdGZve");
    return hash;
  };

  return (
    <>
      {userIsAuthenticated && <Navigate to="/" />}
      {errorMsg && (
        <div className={styles["login-failed"]}>
          <p>{errorMsg}</p>
        </div>
      )}
      <form className={styles["login-form"]} onSubmit={handleSubmit}>
        <div className={styles["input-group"]}>
          <input
            type="email"
            id="email"
            placeholder="Enter your email..."
            className={styles["login-input"]}
            onChange={(e) => setEmail(e.target.value)}
            required
            onFocus={() => setEmailFocus(true)}
            onBlur={() => setEmailFocus(false)}
          />

          <p
            className={
              !emailFocus && email && !validEmail
                ? styles["login-instructions"]
                : styles["login-offscreen"]
            }
          >
            Enter a valid email-adress
          </p>
        </div>

        <div className={styles["input-group"]}>
          <input
            type="password"
            id="password"
            placeholder="Enter your password..."
            className={styles["login-input"]}
            onChange={(e) => setPwd(e.target.value)}
            required
            onFocus={() => setPwdFocus(true)}
            onBlur={() => setPwdFocus(false)}
          />
        </div>

        <button className={styles["login-button"]} type="submit">
          Login
        </button>
      </form>

      <div className={`${styles["login-no-account"]}`}>
        <p>Dont have an account yet?</p>
        <Link to="/register">Sign up!</Link>
      </div>
    </>
  );
}

export default LoginForm;
