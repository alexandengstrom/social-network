import { Link, Navigate } from "react-router-dom";
import styles from "./Navbar.module.css";
import { removeToken } from "../../utils/jwt";

function NavbarItem({ link, title, activeItem, setActiveItem }) {
  return (
    <>
      <div className="flex-column">
        <Link
          className={styles["navbar-item-link"]}
          to={link}
          onClick={() => {
            setActiveItem(title);
            if (title == "Log out") {
              removeToken();
            }
          }}
        >
          {title}
        </Link>
        <div
          className={
            activeItem == title
              ? styles["navbar-item-choosen"]
              : styles["navbar-item-not-choosen"]
          }
        ></div>
      </div>
    </>
  );
}

export default NavbarItem;
