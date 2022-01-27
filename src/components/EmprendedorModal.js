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

  const buscarIconoRed = (nombre) => {
    switch (nombre) {
      case "Facebook":
        return "fab fa-facebook";
      case "Instagram":
        return "fab fa-instagram";
      case "Twiter":
        return "fab fa-twitter";
      case "Linkedin":
        return "fab fa-linkedin-in";
      default:
        return null;
    }
  };

  return ReactDom.createPortal(
    <div className="modal" ref={modalRef} onClick={closeModal}>
      <div className= "modalTarjeta">
    
      <header className = "headerModal">
      
      <div className="tituloContainer">
         
         <section className="modalTitulo">
           <div className="marcaEmprendedorCoontainer">
             <h3 className="marcaEmprendimiento">
               {emprendedor.nombre_emprendimiento}
             </h3>
           </div>

           <div className="botonCerrar">
             <i
               className="fas fa-times"
               ref={botonCerrarRef}
               onClick={closeModal}
             />
           </div>
         </section>
      
      
       <div className="imagenContainer">
       <img 
           className="imagenModal"
           src={emprendedor.imagen}
           alt={emprendedor.nombre_emprendimiento}
         />
       </div>
       

       </div>

        <div className="resenaContainer">
          <div className="resena">
            <section className="etiqueta">Nuestro emprendimiento: </section>
            <section className="resena">{emprendedor.resena}</section>
          </div>

          <div className="botonCerrarAncho">
            <i
              className="fas fa-times"
              ref={botonCerrarRef2}
              onClick={closeModal}
            />
          </div>
        </div>

        <div className="contactoContainer">
          <div>
            <section className="resena">
              <span className="etiqueta">Contáctenos: </span>
            </section>

            <section className="resena">
              <span className="etiqueta">Tel : </span> {emprendedor.telefono}
            </section>
            <section className="resena">
              <span className="etiqueta">Mail : </span> {emprendedor.mail}
            </section>
          </div>
        </div>
      </header>

      <footer className="footerModal">
        <div htmlFor="nombre_id" className="etiqueta">
          {" "}
          Redes
        </div>
        <div className="listaRedes">
          {emprendedor.redes &&
            emprendedor.redes.map((red, indice) => (
              <div className="row mb-3" key={indice}>
                <a href={emprendedor.redes[indice].link} target="_blank">
                  {buscarIconoRed(emprendedor.redes[indice].nombre) && (
                    <i className={buscarIconoRed(emprendedor.redes[indice].nombre)}/>
                  )}
                  {!buscarIconoRed(emprendedor.redes[indice].nombre) &&
                    emprendedor.redes[indice].nombre}{" "}
                </a>
              </div>
            ))}
        </div>
      </footer>
      </div>
     

    </div>,

    document.getElementById("modal")
  );
}
