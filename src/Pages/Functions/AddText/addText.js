export const addText = (setCaption,caption,editor,setTempCaption,tempcaption,setlayers) => {
    if (tempcaption) {
        setCaption((pdata) => {
            return (pdata = tempcaption);
        });
        editor.addText(caption);
        setTempCaption("");
        setlayers((pdata) => {
            return [...pdata, "text"];
        });
    }
    else{
        alert("Enter the Data");
    }
  };