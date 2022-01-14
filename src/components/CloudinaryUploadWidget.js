import React, { Component } from "react";


export const url = "";


export function CloudinaryUploadWidget (setUrl) {  
 
   let openWidget = (setUrl) => {
  
    var myWidget = window.cloudinary.createUploadWidget(
      {
        cloudName: "dlujwnnwv",
        uploadPreset: "emprendedores"
      },
      (error, result) => {
        if (!error && result && result.event === "success") {
          console.log("Done! Here is the image info: ", result.info.secure_url);
          const imageurl = result.info.secure_url
       
          setUrl(imageurl)
          
         
       

        }
      }
    );
   
   
    myWidget.open();
    
    }

    return (
      <button id="upload_widget" className="cloudinary-button" onClick= {openWidget} >
        Upload
        
      </button>
    );
  
}


// despues importo asi import { CloudinaryUploadWidget, test, } from 'path/to/App';