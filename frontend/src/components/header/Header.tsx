import { NavLink } from "react-router";
import styles from "./Header.module.css";

export const Header = () => {
  return (
    <header className={styles.header}>
      <NavLink className={styles.homeLink} to="/">
        <h1 className={styles.banner}>Find Geeks</h1>
      </NavLink>
    </header>
  );
};
