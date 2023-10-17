import RegisterForm from "../../components/RegisterForm/RegisterForm";
import Logo from "../../components/Logo/Logo";
import styles from "./Register.module.css";

function Register() {
  return (
    <>
      <main
        className={`rounded-desktop shadow ${styles["register-page-card"]}`}
      >
        <div className="flex-row center grow-x">
          <Logo dimension={100} />
          <h1>Facebook</h1>
        </div>

        <h2>Join the social network today!</h2>

        <RegisterForm />
      </main>
    </>
  );
}

export default Register;
