import { Link } from "react-router-dom";
import styles from "./RegisterForm.module.css";
import { useState, useEffect } from "react";
import { registerUser } from "../../api/register";
import { Navigate } from "react-router-dom";
import bcrypt from "bcryptjs-react";

const LOGIN_URL = "/login";

const EMAIL_REGEX = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[\x20-\x7E]{8,24}$/;

function LoginForm() {
  const [firstname, setFirstname] = useState("");
  const [validFirstname, setValidFirstname] = useState(false);
  const [firstnameFocus, setFirstnameFocus] = useState(false);

  const [lastname, setLastname] = useState("");
  const [validLastname, setValidLastname] = useState(false);
  const [lastnameFocus, setLastnameFocus] = useState(false);

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [confirmPwd, setConfirmPwd] = useState("");
  const [validConfirmPwd, setValidConfirmPwd] = useState(false);
  const [confirmPwdFocus, setConfirmPwdFocus] = useState(false);

  const [errorMsg, setErrorMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    setErrorMsg("");
  }, [email, pwd]);

  useEffect(() => {
    setValidFirstname(firstname.length > 0 && firstname.length < 25);
  }, [firstname]);

  useEffect(() => {
    setValidLastname(lastname.length > 0 && lastname.length < 25);
  }, [lastname]);

  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(email));
  }, [email]);

  useEffect(() => {
    setValidPwd(PWD_REGEX.test(pwd));
  }, [pwd]);

  useEffect(() => {
    setValidConfirmPwd(confirmPwd && pwd == confirmPwd);
  }, [confirmPwd]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const hashedPassword = hashPassword(pwd);

    const data = {
      firstname: firstname,
      lastname: lastname,
      email: email,
      password: hashedPassword,
    };

    registerUser(data)
      .then((res) => {
        if (res.status == 200) {
          setSuccess(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const hashPassword = (password) => {
    const hash = bcrypt.hashSync(password, "$2a$10$aFJI6TD44jOJRyEVmdGZve");
    return hash;
  };

  return (
    <>
      {success && <Navigate to="/login" />}
      {errorMsg && (
        <div className={styles["login-failed"]}>
          <p>{errorMsg}</p>
        </div>
      )}
      <form className={styles["login-form"]} onSubmit={handleSubmit}>
        <div className={styles["input-group"]}>
          <input
            type="text"
            id="firstname"
            placeholder="First name..."
            className={styles["login-input"]}
            onChange={(e) => setFirstname(e.target.value)}
            required
            onFocus={() => setFirstnameFocus(true)}
            onBlur={() => setFirstnameFocus(false)}
          />

          <p
            className={
              !firstnameFocus && firstname && !validFirstname
                ? styles["login-instructions"]
                : styles["login-offscreen"]
            }
          >
            First name must be between 1-24 characters.
          </p>
        </div>

        <div className={styles["input-group"]}>
          <input
            type="text"
            id="lastname"
            placeholder="Last name..."
            className={styles["login-input"]}
            onChange={(e) => setLastname(e.target.value)}
            required
            onFocus={() => setLastnameFocus(true)}
            onBlur={() => setLastnameFocus(false)}
          />

          <p
            className={
              !lastnameFocus && lastname && !validLastname
                ? styles["login-instructions"]
                : styles["login-offscreen"]
            }
          >
            Lastname must be between 1-24 characters.
          </p>
        </div>

        <div className={styles["input-group"]}>
          <input
            type="email"
            id="email"
            placeholder="Email..."
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
            placeholder="Password..."
            className={styles["login-input"]}
            onChange={(e) => setPwd(e.target.value)}
            required
            onFocus={() => setPwdFocus(true)}
            onBlur={() => setPwdFocus(false)}
          />

          <p
            className={
              !pwdFocus && pwd && !validPwd
                ? styles["login-instructions"]
                : styles["login-offscreen"]
            }
          >
            Password must contain one uppercase letter, one lowercase letter,
            one number and be between 8-24 characters.
          </p>
        </div>

        <div className={styles["input-group"]}>
          <input
            type="password"
            id="password"
            placeholder="Confirm password..."
            className={styles["login-input"]}
            onChange={(e) => setConfirmPwd(e.target.value)}
            required
            onFocus={() => setConfirmPwdFocus(true)}
            onBlur={() => setConfirmPwdFocus(false)}
          />

          <p
            className={
              pwd.length == confirmPwd.length && confirmPwd && !validConfirmPwd
                ? styles["login-instructions"]
                : styles["login-offscreen"]
            }
          >
            Passwords doesnt match.
          </p>
        </div>

        <button
          className={styles["login-button"]}
          type="submit"
          disabled={
            !(validFirstname && validLastname && validEmail && validConfirmPwd)
          }
        >
          Register
        </button>
      </form>

      <div className={`${styles["login-no-account"]}`}>
        <p>Already have an account?</p>
        <Link to="/login">Sign in!</Link>
      </div>
    </>
  );
}

export default LoginForm;
