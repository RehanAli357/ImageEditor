import React from "react";
import {useNavigate} from "react-router-dom"
import "../../Assets/Style/ImageCard/imageCard.css";
const ImageCard = ({image,id}) => {
  const navigate = useNavigate();
  return (
    <React.Fragment >
      <div className="ImageCard" >
        <div className="Image">
            <img src={image} alt="port" />
        </div>
        <div className="ImageCardBtn">
           <button onClick={()=>{navigate(`/Images/${id}`)}}>Add Caption</button>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ImageCard;
