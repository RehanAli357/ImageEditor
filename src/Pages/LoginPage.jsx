import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "../Assets/Style/LoginPage/login.css";
import google from "../Assets/Images/google.png";
import { ACCESS_KEY } from "../apiKeys";
import { auth, provider } from "../firebase/firebase";
import { signInWithPopup } from "firebase/auth";
import LoginContext from "../Context/LoginContext";
const LoginPage = () => {
  const [imgURL, setImgURL] = useState("");
  const {  setIsLogin } = useContext(LoginContext);
  const navigate = useNavigate();
  useEffect(() => {
    let no = Math.random() * 9 + 1;
    const getData = async () => {
      try {
        const res = await fetch(
          `https://api.unsplash.com/search/photos?page=1&query=creative&client_id=${ACCESS_KEY}`
        );
        const data = await res.json();
        setImgURL(data.results[parseInt(no)].urls.raw);
      } catch (err) {
        console.log(err);
      }
    };
    getData();
  }, [setImgURL]);

  const GoogleLogin = () => {
    signInWithPopup(auth, provider).then(() => {
      setIsLogin(true);
      navigate("/");
  })
  };
  return (
    <React.Fragment>
      <div className="Login FC">
        <h1>LgoinPage</h1>
        <div className="LoginCard">
          <div className="LoginOne">
            <img src={imgURL} alt="google-login" />
          </div>
          <div className="LoginTwo">
            <div className="Heading">
              <h1>SignUp With</h1>
              <img src={google} alt="google" />
            </div>
            <div className="SignUpBtn">
              <button className="FC" onClick={GoogleLogin}>
                <img src={google} alt="google" /> SignUp
              </button>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default LoginPage;
