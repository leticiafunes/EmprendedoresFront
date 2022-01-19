import React, { useRef } from "react";
import ReactDom from "react-dom";

import "./EmprendedorModal.css";

export function EmprendedorModal({
  setShowModal,
  emprendedor,
  setNavigationStatus,
}) {
  // Se cierra el modal cuando hago click en lo oscuro
  // ref={modalRef} lo pongo en el elemento del DOM al que hace referencia

  //Guardo la referencia del contenedor del modal
  const modalRef = useRef();

  //Guardo la referencia del botón que cierra el  modal (para que se cierre en navegador en mobile)
  const botonCerrarRef = useRef();
  const botonCerrarRef2 = useRef();

  const closeModal = (e) => {
    if (e.target === modalRef.current) {
      //Si hago click en el contenedor y actualmente está activo
      setShowModal(false); //Se cierra. Ver que puedo actualizar el state del padre.
      setNavigationStatus(true); //Actualizo el state del abuelo.
    }
    if (e.target === botonCerrarRef.current) {
      //Si hago click en el contenedor y actualmente está activo. Dentro de un section
      setShowModal(false); //Se cierra. Ver que puedo actualizar el state del padre.
      setNavigationStatus(true); //Actualizo el state del abuelo.
    }
    if (e.target === botonCerrarRef2.current) {
      //Si hago click en el contenedor y actualmente está activo. Dentro de un section
      setShowModal(false); //Se cierra. Ver que puedo actualizar el state del padre.
      setNavigationStatus(true); //Actualizo el state del abuelo.
    }
  };

  /*Con ReactDom.createPortal muestro elementos en un div

  El primer argumento (child) es cualquier hijo renderizable por React, 
  como un elemento, cadena de caracteres o fragmento. 
  El segundo argumento (container) es un elemento DOM.*/

  return ReactDom.createPortal(
    
    <div className="containerModal" ref={modalRef} onClick={closeModal}>
      <div className="modal" id={emprendedor._id}>
        <div className="modal-dialog-modal">
        
        
          <div className="imagenContainer">
          
              <section className="modalTitulo">
                <div>
                  <h1> {emprendedor.nombre_emprendimiento} </h1>
                </div>

                <div className="botonCerrar" >
                  <i className="fas fa-times" ref={botonCerrarRef}  onClick={closeModal}/>
                </div>
              </section>
           

            
              <img
                className="imagenModal"
                src={emprendedor.imagen}
                alt={emprendedor.nombre_emprendimiento}
              />
           
          </div>

          <div className="resenaContainer">
            <div className="resena">
              <section className="etiqueta">Nuestro emprendimiento: </section>
              <section className="resena">{emprendedor.resena}</section>
            </div>

            <div className="botonCerrarAncho">
              <i className="fas fa-times" ref={botonCerrarRef2} onClick={closeModal} />
            </div>
          </div>

          <div className="contactoContainer">
            <div>
              <section className="resena">
                <span className="etiqueta">Tel : </span> {emprendedor.telefono}
              </section>
              <section className="resena">
                <span className="etiqueta">Mail : </span> {emprendedor.mail}
              </section>
            </div>
          </div>
        
        
          <footer className="footerModal">
            <label htmlFor="nombre_id" className="col-sm-6 col-form-label etiqueta">
              {" "}
              Redes
            </label>

            {emprendedor.redes &&
              emprendedor.redes.map((red, indice) => (
                <div className="row mb-3" key={indice}>
                  <label
                    htmlFor="nombre_id"
                    className="col-sm-3 col-form-label etiquetaColor"
                  >
                    {emprendedor.redes[indice].nombre}
                  </label>

                  <label
                    htmlFor="nombre_id"
                    className="col-sm-9 col-form-label"
                  >
                    {emprendedor.redes[indice].link}
                  </label>
                </div>
              ))}
          </footer>
        </div>
      </div>
    </div>,
    document.getElementById("modal")
  );
}
