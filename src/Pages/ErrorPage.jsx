import React from "react";
import { useNavigate } from "react-router-dom";
const ErrorPage = () => {
  const navigate = useNavigate();
  return (
    <React.Fragment>
      <h1 style={{ fontSize: "4rem", textAlign: "center" }}>
        OOPS You Came Too Far 🥴
      </h1>
      <button
        onClick={() => {
          navigate("/");
        }}
        style={{
          backgroundColor: "black",
          color: "aliceblue",
          fontSize: "2rem",
          padding: "0.2em 1em",
          margin: "1em 2em",
          border: "transparent",
          borderRadius:"10em",
          cursor:"pointer"
        }}
      >
        Go Back
      </button>
    </React.Fragment>
  );
};

export default ErrorPage;
