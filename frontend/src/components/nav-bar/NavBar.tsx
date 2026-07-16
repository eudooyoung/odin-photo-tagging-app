import { NavLink } from "react-router";

export const NavBar = () => {
  return (
    <nav>
      <NavLink to="/game">game</NavLink>
      <NavLink to="/score">score</NavLink>
    </nav>
  );
};
