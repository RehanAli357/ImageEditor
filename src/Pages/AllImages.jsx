import React, { useContext, useEffect, useState } from "react";

import "../Assets/Style/AllImagesPage/allImages.css";
import ImageCard from "./Components/ImageCard";
import { ACCESS_KEY } from "../apiKeys";
import LoginContext from "../Context/LoginContext";
import { auth } from "../firebase/firebase";
const AllImages = () => {
  const [tempSearch, settempSearch] = useState("");
  const [searchData, setSearchData] = useState("dog");
  const [allData, setAllData] = useState([]);
  const { isLogin } = useContext(LoginContext);
  const OnSubmit = () => {
    if (tempSearch) {
      setSearchData(tempSearch);
      settempSearch("");
      console.log(allData);
    } else {
      alert("Invalid Data");
    }
  };
  useEffect(() => {
    const searchdata = async () => {
      try {
        const res = await fetch(
          `https://api.unsplash.com/search/photos?page=1&query=${searchData}&client_id=${ACCESS_KEY}`
        );
        const dataJ = await res.json();
        const data = dataJ.results;
        setAllData(() => {
          return [data];
        });
        console.log("hi");
      } catch (err) {
        console.log(err);
      } 
    };
    searchdata();
  }, [searchData]);
  const SetResult = (e) => {
    settempSearch(e.target.value);
  };

  return (
    <React.Fragment>
      <div className="ImagePage">
        <h1>Explore Your Creativity</h1>
        <div className="ImagePageOne">
          <div className="Data">
            {isLogin === true ? (
              <React.Fragment>
                <h2>Welocome {auth.currentUser.displayName}</h2>
                <h3>EmailID {auth.currentUser.email}</h3>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <h2>Welcome Unknown User</h2>
                <h3>EmailID unknown</h3>
              </React.Fragment>
            )}
          </div>
        </div>
        <div className="ImagePageSearch">
          <input
            type="search"
            placeholder="Try to type 'cat' or 'car'"
            value={tempSearch}
            onChange={(e) => {
              SetResult(e);
            }}
          />
          <button onClick={OnSubmit}>Submit</button>
        </div>
        <div className="Images FC">
          {allData.map((val) => {
            if (val.urls && val.urls.small) {
              return (
                <React.Fragment key={val.id}>
                  <ImageCard image={val.urls.small} id={val.id} />
                </React.Fragment>
              );
            } else {
              return (
                <React.Fragment>
                  <ImageCard image={val[0].urls.small} id={val[0].id} />
                  <ImageCard image={val[1].urls.small} id={val[1].id} />
                  <ImageCard image={val[2].urls.small} id={val[2].id} />
                  <ImageCard image={val[3].urls.small} id={val[3].id} />
                  <ImageCard image={val[4].urls.small} id={val[4].id} />
                  <ImageCard image={val[5].urls.small} id={val[5].id} />
                  <ImageCard image={val[6].urls.small} id={val[6].id} />
                  <ImageCard image={val[7].urls.small} id={val[7].id} />
                  <ImageCard image={val[8].urls.small} id={val[8].id} />
                  <ImageCard image={val[9].urls.small} id={val[9].id} />
                </React.Fragment>
              );
            }
          })}
        </div>
      </div>
    </React.Fragment>
  );
};

export default AllImages;
