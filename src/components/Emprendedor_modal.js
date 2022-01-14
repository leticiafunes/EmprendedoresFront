
import React, { useRef } from "react";
import ReactDom from "react-dom";
import "./styles.css";

export  function Emprendedor_modal ({ setShowModal, emprendedor_id }) {

  // se cierra el modal cuando hago click afuera de él
  const modalRef = useRef();
  
  const closeModal = (e) => {

    console.log (e.target + ' - ' + modalRef.current);
    if (e.target === modalRef.current) {        //Si hago click en el contenedor que actualmentte está arriba
      setShowModal(false);                      //Se cierra
    }
  };

  //muestro el modal en el div que cree para el 
  return ReactDom.createPortal(
   
   <div className="container" ref={modalRef} onClick={closeModal}>
      <div className="modal">
        <h2> Emprendedor: {emprendedor_id}</h2>
        <button onClick={() => setShowModal(false)}>X</button>
      </div>
    </div>,
    document.getElementById("portal")

  );
};