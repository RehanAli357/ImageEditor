import { useFabricJSEditor } from 'fabricjs-react/lib/hooks';
import React, { useEffect } from 'react';
import {fabric} from "fabric";

const FabricJS = ({url}) => {
  const [fabricCanvas, setFabricCanvas] = useFabricJSEditor();

  useEffect(() => {
    const loadImage = async () => {
      const imageElement = await new Promise((resolve) => {
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.onload = () => resolve(img);
        img.src = url;
      });

      const fabricImage = new fabric.Image(imageElement);
      fabricCanvas.add(fabricImage);
      fabricCanvas.renderAll();
    };

    loadImage();
  }, [fabricCanvas]);

  return <canvas ref={setFabricCanvas} />;
};

const App = () => {
  return (
    <div>
      <h1>React Fabric.js Example</h1>
      <FabricJS />
    </div>
  );
};

export default App;
