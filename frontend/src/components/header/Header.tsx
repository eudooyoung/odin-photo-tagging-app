import { NavLink } from "react-router";

export const Header = () => {
  return (
    <header>
      <NavLink to="/">
        <h1>Find Geeks</h1>
      </NavLink>
    </header>
  );
};
