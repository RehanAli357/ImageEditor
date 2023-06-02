import React, { useEffect, useState } from 'react'
import {useNavigate} from "react-router-dom";
import "../Assets/Style/HomePage/homePage.css";
import {ACCESS_KEY} from "../apiKeys"
const HomePage = () => {
  const [imgURL,seImgURL]=useState("");
  const navigate=useNavigate();
  useEffect(()=>{
    let no=(Math.random()*9+1);
    const getData = async()=>{
      try{
        const res= await fetch(`https://api.unsplash.com/search/photos?page=1&query=standard&client_id=${ACCESS_KEY}`);
        const data = await res.json();
        seImgURL(data.results[parseInt(no)].urls.raw);
      }catch (err){
        console.log(err);
      }
    }
    getData();

  },[seImgURL]);
  return (
    <React.Fragment>
      <div className="HomePage">
        <div className="BgImage FC">
          <img src={imgURL} alt="bodyImage" />
          <div className="HeroSection FC">
            <h1><q>Bring Your Imagination To <span>Life</span></q></h1>
          </div>
          <div className="ExploreBtn">
            <button onClick={()=>{navigate("/Images/AllImages")}}>Lets Explore</button>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default HomePage;