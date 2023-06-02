import React from "react";
import "../../Assets/Style/Footer/footer.css";
import NaviBarLinks from "./NaviBarLinks";
import Logo from "../../Assets/Images/logo.png";
import {useNavigate} from "react-router-dom";
const Footer = () => {
    const navigate = useNavigate();
  return (
    <React.Fragment>
      <footer>
        <div className="Fone">
          <p>
          <i>
            "Photography is the art of capturing a moment, but image editing is
            the art of shaping that moment into something extraordinary."
          </i>
          </p>
        </div>
        <div className="Fone ">
            <NaviBarLinks/>
        </div>
        <div className="Fone">
            <ul>Contact Us
                <a href="mailto:mohdrehanali40@gmail.com"><li>Email</li></a>
                <a href="tel:7017337726"><li>PhoneNo</li></a>
                <a href="https://www.google.com/maps?q=27.1504934,78.0606074"><li>Location</li></a>

            </ul>
        </div>
        <div className="Fone FC" onClick={()=>{navigate("/")}}>
            <img src={Logo} alt="logo" />
            <p>Image<span>Editor</span></p>
        </div>
      </footer>
    </React.Fragment>
  );
};

export default Footer;
