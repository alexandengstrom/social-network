import { useState } from "react";
import Logo from "../Logo/Logo";
import NavbarItem from "./NavbarItem";
import styles from "./Navbar.module.css";
import { getUserId, removeToken } from "../../utils/jwt";
import { globalSocket } from "../../utils/socket";

function Navbar() {
  const [activeItem, setActiveItem] = useState("Feed");

  return (
    <>
      <nav
        className={`flex-row center grow-x space-evenly ${styles["navbar-container"]}`}
      >
        <Logo dimension={50} hideOnMobile={true} />
        <NavbarItem
          link="/"
          title="Feed"
          activeItem={activeItem}
          setActiveItem={setActiveItem}
        />
        <NavbarItem
          link={`user/${getUserId()}`}
          title="Profile"
          activeItem={activeItem}
          setActiveItem={setActiveItem}
        />
        <NavbarItem
          link="explore"
          title="Explore"
          activeItem={activeItem}
          setActiveItem={setActiveItem}
        />
        <NavbarItem
          link="login"
          title="Log out"
          activeItem={activeItem}
          setActiveItem={setActiveItem}
        />
      </nav>
    </>
  );
}

export default Navbar;
