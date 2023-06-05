import React, { useEffect, useState, useContext } from "react";
import { FabricJSCanvas, useFabricJSEditor } from "fabricjs-react";
import { useNavigate, useParams } from "react-router-dom";
import { fabric } from "fabric";
import LoginContext from "../Context/LoginContext";
import { ACCESS_KEY } from "../apiKeys";
import "../Assets/Style/ImageCanva/imageCanva.css";
const ImagePage = () => {
  const [url, seturl] = useState("");
  const [layers, setlayers] = useState([]);
  const [tempcaption, setTempCaption] = useState("");
  const [caption, setCaption] = useState("");
  const [isloading, setisLoading] = useState(true);
  const [isdisplay, setisDisplay] = useState("flex");
  const { isLogin } = useContext(LoginContext);
  const [cropImage] = useState(true);
  const { editor, onReady } = useFabricJSEditor();
  const params = useParams();
  const navigate = useNavigate();
  console.log();
  useEffect(() => {
    const getImg = async () => {
      try {
        if (isloading) {
          setisDisplay("inline-block");
        }
        const res = await fetch(
          `https://api.unsplash.com/photos/${params.id}?&client_id=${ACCESS_KEY}`
        );
        const data = await res.json();
        seturl(data.urls.full);
      } catch (error) {
        alert("Unable To Fetch Data");
        navigate(-1);
      } finally {
        setisLoading(false);
        setisDisplay("none");
      }
    };
    getImg();
  }, [params, navigate]);
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
      editor.canvas.on("mouse:up", function () {
        this.setViewportTransform(this.viewportTransform);
        this.isDragging = false;
        this.selection = true;
      });
    }
    editor.canvas.renderAll();
  }, [editor, cropImage]);

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
  }, [editor?.canvas.backgroundImage]);

  const exportSVG = () => {
    try {
      const svg = editor.canvas.toSVG();
      const blob = new Blob([svg], { type: "image/svg+xml;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "image.svg";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    if (isLogin === false) {
      navigate("/Login");
      alert("Kindly Login");
    } else {
      setlayers((pdata) => {
        return [...pdata, "image"];
      });
    }
  }, [isLogin, navigate]);
  return (
    <React.Fragment>
      <div className="ImageCanva">
        <h1>Add Image Caption</h1>
        <div className="ImgCanvaCard ">
          <div className="ImgCanvaCardPic">
            {isloading ? (
              <React.Fragment>
                <div className="lds-circle" style={{ display: { isdisplay } }}>
                  <div></div>
                </div>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <FabricJSCanvas className="canvas" id="cv" onReady={onReady} />
              </React.Fragment>
            )}
          </div>
          <div className="CanvasOption">
            <div className="CaptionTag">
              <input
                type="text"
                placeholder="Add Caption"
                value={tempcaption}
                onChange={(e) => {
                  setTempCaption(e.target.value);
                  setCaption(e.target.value);
                }}
              />
              <button
                onClick={() => {
                  import("./Functions/AddText/addText").then((data) =>
                    data.addText(
                      setCaption,
                      caption,
                      editor,
                      setTempCaption,
                      tempcaption,
                      setlayers
                    )
                  );
                }}
                disabled={!cropImage}
              >
                Add Caption
              </button>
            </div>

            <button
              name="circle"
              onClick={() => {
                import("./Functions/AddShapes/AddShapes").then((data) =>
                  data.addCircle(editor, setlayers)
                );
              }}
            >
              Add circle
            </button>
            <button
              onClick={() => {
                import("./Functions/AddShapes/AddShapes").then((data) =>
                  data.addTriangle(editor, setlayers)
                );
              }}
            >
              Add Triangle
            </button>
            <button
              onClick={() => {
                import("./Functions/AddShapes/AddShapes").then((data) =>
                  data.addRect(editor, setlayers)
                );
              }}
            >
              Add Rectangle
            </button>
            <button
              onClick={() => {
                import("./Functions/AddShapes/AddShapes").then((data) =>
                  data.addPolygon(editor, setlayers)
                );
              }}
            >
              Add Polygon
            </button>
            <button
              onClick={() => {
                import("./Functions/RemoveLayer/removeLayer").then((data) =>
                  data.removeAll(editor, setlayers, setCaption)
                );
              }}
              disabled={!cropImage}
            >
              Clear
            </button>
            <button
              onClick={() => {
                import("./Functions/RemoveLayer/removeLayer").then((data) =>
                  data.removeSelectedObj(editor)
                );
              }}
              disabled={!cropImage}
            >
              Delete
            </button>

            <button
              onClick={() => {
                import("./Functions/SaveCanvas/saveCanvas").then((data) =>
                  data.exportSVG(editor)
                );
              }}
              id="dwnld"
              disabled={!cropImage}
            >
              {" "}
              ToSVG
            </button>
            <button
              onClick={() => {
                import("./Functions/ShowLayers/showLayers").then((data) =>
                  data.showLayers(layers)
                );
              }}
            >
              {" "}
              ShowLayers
            </button>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ImagePage;
