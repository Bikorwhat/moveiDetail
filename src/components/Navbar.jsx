import { NavLink } from "react-router-dom";
import '../styles.css';
const Nav = () => {
  return (
    <div className="menuIcon">
      <NavLink exact to="/search" activeClassName="activeLink">
        <img src="./image/searchh.png" alt="logo" />
      </NavLink>
      <div className="navlist-bar">
          <NavLink exact to="/" >Home</NavLink>
          <NavLink to="/Toprated" >TopRated</NavLink>
          <NavLink to="/Trending">Trending</NavLink>
        </div>
      
    </div>
  );
};

export default Nav;
