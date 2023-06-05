export const removeAll = (editor, setlayers,setCaption) => {
  editor.canvas._objects.splice(0, editor.canvas._objects.length);
  editor.canvas.renderAll();
  setlayers([]);
  setCaption("");
  setlayers(() => {
    return ["image"];
  });
};

export const removeSelectedObj = (editor)=>{
    editor.canvas.remove(editor.canvas.getActiveObject());
}