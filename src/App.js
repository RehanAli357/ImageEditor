import React, { useState } from "react";
import AllRoutes from "./Routes/AllRoutes";
import LoginContext from "./Context/LoginContext";
import NavBar from "./Pages/Components/NavBar";
import Footer from "./Pages/Components/Footer";
const App = () => {
  const [isLogin, setIsLogin] = useState(false);
  return (
    <React.Fragment>
      <LoginContext.Provider value={{ isLogin, setIsLogin }}>
        <NavBar />
        <AllRoutes />
        <Footer/>
      </LoginContext.Provider>
    </React.Fragment>
  );
};

export default App;
