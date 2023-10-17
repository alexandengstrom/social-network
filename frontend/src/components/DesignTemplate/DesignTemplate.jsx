import { Outlet } from "react-router-dom";
import styles from "./DesignTemplate.module.css";
import Navbar from "../Navbar/Navbar";
import Chat from "../Chat/Chat";

function DesignTemplate() {
  return (
    <>
      <main
        className={`flex-column rounded-desktop shadow ${styles["main-container"]}`}
      >
        <Navbar />
        <Outlet />
      </main>
      <Chat />
    </>
  );
}

export default DesignTemplate;
