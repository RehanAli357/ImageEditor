import React, { useEffect, useState,useContext } from "react";
import { FabricJSCanvas, useFabricJSEditor } from "fabricjs-react";
import {useNavigate} from "react-router-dom"
import { fabric } from "fabric";
import LoginContext from "../Context/LoginContext";
import { useParams } from "react-router-dom";
import { ACCESS_KEY } from "../apiKeys";
import "../Assets/Style/ImageCanva/imageCanva.css";
const ImagePage = () => {
  const [url, seturl] = useState("");
  const [layers,setlayers]=useState([]);
  const {isLogin}=useContext(LoginContext);
  const [cropImage, setCropImage] = useState(true);
  const { editor, onReady } = useFabricJSEditor();
  const history = [];
  const params = useParams();
  const navigate= useNavigate();
  useEffect(() => {
    const getImg = async () => {
      const res = await fetch(
        `https://api.unsplash.com/photos/${params.id}?&client_id=${ACCESS_KEY}`
      );
      const data = await res.json();
      seturl(data.urls.full);
    };
    getImg();
  }, [params]);
  useEffect(() => {
    if (!editor || !fabric) {
      return;
    }
    if (cropImage) {
      editor.canvas.__eventListeners = {};
      return;
    }
    if (!editor.canvas.__eventListeners["mouse:wheel"]) {
      editor.canvas.on("mouse:wheel", function (opt) {
        var delta = opt.e.deltaY;
        var zoom = editor.canvas.getZoom();
        zoom *= 0.999 ** delta;
        if (zoom > 20) zoom = 20;
        if (zoom < 0.01) zoom = 0.01;
        editor.canvas.zoomToPoint({ x: opt.e.offsetX, y: opt.e.offsetY }, zoom);
        opt.e.preventDefault();
        opt.e.stopPropagation();
      });
    }
    if (!editor.canvas.__eventListeners["mouse:down"]) {
      editor.canvas.on("mouse:down", function (opt) {
        var evt = opt.e;
        if (evt.ctrlKey === true) {
          this.isDragging = true;
          this.selection = false;
          this.lastPosX = evt.clientX;
          this.lastPosY = evt.clientY;
        }
      });
    }
    if (!editor.canvas.__eventListeners["mouse:move"]) {
      editor.canvas.on("mouse:move", function (opt) {
        if (this.isDragging) {
          var e = opt.e;
          var vpt = this.viewportTransform;
          vpt[4] += e.clientX - this.lastPosX;
          vpt[5] += e.clientY - this.lastPosY;
          this.requestRenderAll();
          this.lastPosX = e.clientX;
          this.lastPosY = e.clientY;
        }
      });
    }
    if (!editor.canvas.__eventListeners["mouse:up"]) {
      editor.canvas.on("mouse:up", function (opt) {
        // on mouse up we want to recalculate new interaction
        // for all objects, so we call setViewportTransform
        this.setViewportTransform(this.viewportTransform);
        this.isDragging = false;
        this.selection = true;
      });
    }
    editor.canvas.renderAll();
  }, [editor]);

  const addBackground = () => {
    if (!editor || !fabric) {
      return;
    }
    fabric.Image.fromURL(url, (image) => {
      image.scaleToWidth(editor.canvas.width);
      editor.canvas.setBackgroundImage(
        image,
        editor.canvas.renderAll.bind(editor.canvas)
      );
    });
  };
  useEffect(() => {
    if (!editor || !fabric) {
      return;
    }
    editor.canvas.setHeight(500);
    editor.canvas.setWidth(500);
    addBackground();
    editor.canvas.renderAll();
    setlayers((pdata)=>{
      return [...pdata,"image"]
    })
    
  }, [editor?.canvas.backgroundImage]);

  const clear = () => {
    editor.canvas._objects.splice(0, editor.canvas._objects.length);
    history.splice(0, history.length);
    editor.canvas.renderAll();
    setlayers((pdata)=>{
      return pdata.slice(0,layers.length-1);
    })
  };
  const removeSelectedObject = () => {
    editor.canvas.remove(editor.canvas.getActiveObject());
  };
  const addText = () => {
    editor.addText("inset text");
    setlayers((pdata)=>{
      return [...pdata,"text"]
    })
  };
  const onAddCircle = () => {
    editor.addCircle();
    setlayers((pdata)=>{
      return [...pdata,"shape-circle"]
    })
  };
  const onAddRectangle = () => {
    editor.addRectangle();
    setlayers((pdata)=>{
      return [...pdata,"shape-rectangle"]
    })
  };
  const exportSVG = () => {
     const svg = editor.canvas;
     console.info(svg);

  };
  useEffect(()=>{
    if (isLogin===false) {
      navigate("/Login");
      alert("Kindly Login")
    }
  },[isLogin])

  return (
    <React.Fragment>
      <div className="ImageCanva">
        <h1>Add Image Caption</h1>
        <div className="ImgCanvaCard FC">
          <div className="ImgCanvaCardPic">
            <FabricJSCanvas className="canvas" id="cv" onReady={onReady} />
          </div>
          <div className="CanvasOption">
            <button onClick={addText} disabled={!cropImage}>
              Add Text
            </button>
            <button onClick={onAddCircle}>Add circle</button>
            <button onClick={onAddRectangle} disabled={!cropImage}>
              Add Rectangle
            </button>

            <button onClick={clear} disabled={!cropImage}>
              Clear
            </button>
            <button onClick={removeSelectedObject} disabled={!cropImage}>
              Delete
            </button>

            <button onClick={exportSVG} disabled={!cropImage}>
              {" "}
              ToSVG
            </button>
            <button onClick={()=>{console.log(layers);}}> ShowLayers</button>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ImagePage;
