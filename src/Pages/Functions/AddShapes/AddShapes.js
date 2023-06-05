import { fabric } from "fabric";

export const addRect = (editor,setlayers) => {
  const rectangle = new fabric.Rect({
    left: 100,
    top: 100,
    height: 50,
    width: 100,
    fill: "rgba(0,0,0,0)",
    stroke: "black",
    strokeWidth: 1,
  });
  editor.canvas.add(rectangle);
  setlayers((pdata)=>{
    return[...pdata,"layer rectangle"]
  });
};

export const addCircle = (editor,setlayers) => {
  const circle = new fabric.Circle({
    left: 100,
    top: 100,
    radius: 20,
    fill: "rgba(0,0,0,0)",
    stroke: "black",
    strokeWidth: 1,
  });
  editor.canvas.add(circle);
  setlayers((pdata)=>{
    return[...pdata,"layer circle"]
  });
};

export const addTriangle = (editor,setlayers) => {
  const triangle = new fabric.Triangle({
    left: 100,
    top: 100,
    height: 100,
    width: 70,
    fill: "rgba(0,0,0,0)",
    stroke: "black",
    strokeWidth: 1,
  });
  editor.canvas.add(triangle);
  setlayers((pdata)=>{
    return[...pdata,"layer triangle"]
  });
};

export const addPolygon = (editor,setlayers) => {
  const polygon = new fabric.Polygon(
    [
      { x: 200, y: 10 },
      { x: 250, y: 50 },
      { x: 250, y: 180 },
      { x: 150, y: 180 },
      { x: 150, y: 50 },
    ],
    {
      fill: "rgba(255,155,155,0)",
      strokeWidth: 1,
      stroke: "black",
      top:100,
      left:100
    }
  );
  editor.canvas.add(polygon);
  setlayers((pdata)=>{
    return[...pdata,"layer polygon"]
  });
};
