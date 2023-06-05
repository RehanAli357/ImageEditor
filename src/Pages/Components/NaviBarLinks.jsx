import React, { useContext } from "react";
import LoginContext from "../../Context/LoginContext";
import { NavLink } from "react-router-dom";
import { auth } from "../../firebase/firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import "../../Assets/Style/NavLinks/navLinks.css";
const NaviBarLinks = ({ setMobnav }) => {
  const { isLogin, setIsLogin } = useContext(LoginContext);
  const navigate = useNavigate();
  const CloseNav = () => {
    setMobnav("translateY(-1000em)");
  };
  const GoogleLogOut = () => {
    signOut(auth).then(() => {
      navigate("/");
      setIsLogin(false);
    });
    CloseNav();
  };

  return (
    <React.Fragment>
      <>
      </>
      <NavLink to="/">
        <li
          onClick={() => {
            CloseNav();
          }}
        >
          HomePage
        </li>
      </NavLink>
      <NavLink to="/Images/AllImages">
        <li
          onClick={() => {
            CloseNav();
          }}
        >
          Images
        </li>
      </NavLink>
      <NavLink to="/Login">
        {isLogin == !true ? (
          <li
            onClick={() => {
              navigate("/Login");
              CloseNav();
            }}
          >
            Login
          </li>
        ) : (
          <>
            <li onClick={GoogleLogOut}>Logout</li>{" "}
          </>
        )}
      </NavLink>
      {isLogin == !true ? (
          <></>
        ) : (
          <>
            <img
              src={auth.currentUser.photoURL}
              alt={auth.currentUser.displayName}
            />
          </>
        )}
    </React.Fragment>
  );
};

export default NaviBarLinks;
