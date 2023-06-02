import React, { useContext, useState } from "react";

import { useNavigate } from "react-router-dom";

import Logo from "../../Assets/Images/logo.png";
import Navigation from "../../Assets/Images/navigation.png";
import Close from "../../Assets/Images/close.png";
import "../../Assets/Style/NavBar/navBar.css";
import LoginContext from "../../Context/LoginContext";
import NaviBarLinks from "./NaviBarLinks";
import { auth } from "../../firebase/firebase";
const NavBar = () => {
  const [mobNav, setMobnav] = useState("translateY(-1000em)");
  const {isLogin, setIsLogin}=useContext(LoginContext);
  const navigate = useNavigate();

  const MobNavBtn = () => {
    if (mobNav === "translateY(-1000em)") {
      setMobnav("translateY(0em)");
    } else {
      setMobnav("translateY(-1000em)");
    }
  };
  return (
    <React.Fragment>
      <nav className="NavigationBar FC">
        <div
          className="Logo FC"
          onClick={() => {
            navigate("/");
          }}
        >
          <img src={Logo} alt="logo" />
          <b>
            Image<span>Editor</span>
          </b>
        </div>
        <div className="navBar">
          <ul className="FC">
            <NaviBarLinks setMobnav={setMobnav}
              mobNav={mobNav}/>
            {
              isLogin===true ? (<li><img src={auth.currentUser.photoURL} alt="user" /></li>) :
              (<></>)
            }
          </ul>
        </div>
        <div className="MobNav FC">
          <div className="MobNavBtn">
            {mobNav === "translateY(-1000em)" ? (
              <img src={Navigation} alt="OpenMobNav" onClick={MobNavBtn} />
            ) : (
              <img src={Close} alt="closeMobNav" onClick={MobNavBtn} />
            )}
          </div>
          <div className="MobNavBar" style={{transform:mobNav}}>
            <ul className="FC">
              <NaviBarLinks setMobnav={setMobnav}
              mobNav={mobNav}/>
            </ul>
          </div>
        </div>
      </nav>
    </React.Fragment>
  );
};

export default NavBar;
