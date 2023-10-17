import LoginForm from "../../components/LoginForm/LoginForm";
import Logo from "../../components/Logo/Logo";
import styles from "./Login.module.css";

function Login() {
  return (
    <>
      <main className={`rounded-desktop shadow ${styles["login-page-card"]}`}>
        <div className="flex-row center grow-x">
          <Logo dimension={100} />
          <h1>Facebook</h1>
        </div>

        <h2>Connect with friends and the world around you on Facebook.</h2>

        <LoginForm />
      </main>
    </>
  );
}

export default Login;
