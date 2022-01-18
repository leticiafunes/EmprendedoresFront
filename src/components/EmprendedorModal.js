import { faGlasses } from "@fortawesome/free-solid-svg-icons";
import React, { useRef } from "react";
import ReactDom from "react-dom";

import "./EmprendedorModal.css";
//import "./Emprendedores.css";

export function EmprendedorModal({
  setShowModal,
  emprendedor,
  setNavigationStatus,
}) {
  // Se cierra el modal cuando hago click en lo oscuro

  const modalRef = useRef(); //Guardo la referencia del contenedor del modal
  const botoncerrarRef = useRef();

  const closeModal = (e) => {
    if (e.target === modalRef.current) {
      //Si hago click en el contenedor y actualmente está activo
      setShowModal(false); //Se cierra. Ver que puedo actualizar el state del padre.
      setNavigationStatus(true);
    }
    if (e.target === botoncerrarRef.current) {
      //Si hago click en el contenedor y actualmente está activo. Dentro de un section
      setShowModal(false); //Se cierra. Ver quefalse puedo actualizar el state del padre.
      setNavigationStatus(true);
    }
  };

  //muestro el modal en el div que cree para el
  /*El primer argumento (child) es cualquier hijo renderizable por React, 
  como un elemento, cadena de caracteres o fragmento. 
  El segundo argumento (container) es un elemento DOM.*/

  return ReactDom.createPortal(
    <div className="container" ref={modalRef} onClick={closeModal}>
      <div className="modal emprendedor-tarjeta-modal" id={emprendedor._id}>
        <div className="modal-dialog">
          <header className="modal-header">
            <img
              className="imagen-empre-chica-modal"
              src={emprendedor.imagen}
              alt={emprendedor.nombre}
            />
          </header>

          <div className="texto-modal">
            <div>
              <section className="modal-content">{emprendedor.nombre}</section>
              <section className="modal-content">{emprendedor.resena}</section>
            </div>
            <div>
              <section className="modal-content">
                <button>
                  <i className="fas fa-times" ref={botoncerrarRef} />
                </button>
              </section>
            </div>
          </div>

          <footer className="modal-footer">
            <label htmlFor="nombre_id" className="col-sm-6 col-form-label">
              {" "}
              Redes
            </label>

            {emprendedor.redes &&
              emprendedor.redes.map((red, indice) => (
                <div className="row mb-3" key={indice}>
                  <label
                    htmlFor="nombre_id"
                    className="col-sm-3 col-form-label"
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
    document.getElementById("portal")
  );
}
