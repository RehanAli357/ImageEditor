import React,{lazy,Suspense} from 'react'
import {Route,Routes} from "react-router-dom"

import HomePage from "../Pages/HomePage";
import AllImages from "../Pages/AllImages";
const ErrorPage=lazy(()=>import("../Pages/ErrorPage"));
const LoginPage=lazy(()=>import("../Pages/LoginPage"));
const ImagePage=lazy(()=>import("../Pages/ImagePage"));

const AllRoutes = () => {
  return (
    <React.Fragment>
      <Suspense fallback={<h1>Loading...</h1>}>
        <Routes>
            <Route path='/' element={<HomePage/>}/>
            <Route path='/Login' element={<LoginPage/>}/>
            <Route path='/Images'>
                <Route path="AllImages" element={<AllImages/>}/>
                <Route path=':id' element={<ImagePage/>}/>
            </Route>
            <Route path='*' element={<ErrorPage/>}/>
        </Routes>
      </Suspense>
    </React.Fragment>
  )
}

export default AllRoutes
