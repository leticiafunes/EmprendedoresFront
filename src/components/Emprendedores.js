import React from "react";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
//import moment from 'moment';

import "./Emprendedores.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

import { EmprendedorModal } from "./EmprendedorModal";
import SessionContext from "../context/SessionContext";

import "./Animaciones.css";

export default function Emprendedores({ setNavigationStatus }) {
  const [emprendedores, setEmprendedores] = useState([]);
  const [tablaemprendedores, setTablaemprendedores] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [emprendedor, setEmprendedor] = useState("");
  const { session } = useContext(SessionContext); //Para leer la Session  global

  useEffect(() => {
    obtenerDatos();
  }, []);

  const obtenerDatos = async () => {
    const res = await axios.get(
      process.env.REACT_APP_INITIAL_PATH + "/api/emprendedores"
    );

    if (res.data) {
      setEmprendedores(res.data);
      setTablaemprendedores(res.data);
    } else {
      console.log("No hay emprendedores cargados");
    }
  };

  /*
    const deleteEmprendedor = async (id) =>  {
        await axios.delete (process.env.REACT_APP_INITIAL_PATH + "/api/emmprendedor/" + id);
        obtenerDatos();
    }
    */

  const handleChange = (e) => {
    setBusqueda(e.target.value);
    filtrar(e.target.value);
  };

  function incluyeElemento(elemento, busqueda) {
    return (
      elemento.nombre_emprendimiento
        .toString()
        .toLowerCase()
        .includes(busqueda.toLowerCase()) ||
      elemento.resena
        .toString()
        .toLowerCase()
        .includes(busqueda.toLowerCase()) ||
      elemento.rubro
        .toString()
        .toLowerCase()
        .includes(busqueda.toLowerCase()) 


    );
  }

  const filtrar = (busqueda) => {
    const empFiltrados = tablaemprendedores.filter((elemento) =>
      incluyeElemento(elemento, busqueda)
    );

    setEmprendedores(empFiltrados);
  };

  const handleClick = (index) => () => {
    //Buscar los datos del emprendedor
    //cargarlos en la variable de estado emprendedor
    //Mostrar el Modal

    setEmprendedor(emprendedores[index]);

    setNavigationStatus(false);

    setShowModal(true);
  };

  const botonEditar = () => {
    if (session.username) {
      return "btn btn-outline-secondary  btn-sm";
    }

    return "btn btn-outline-secondary  btn-sm oculto";
  };

  return (
    <div className="pantallaEmprendedores">
      <div className="modalEmprendedor">
        {showModal ? (
          <EmprendedorModal
            setShowModal={setShowModal}
            emprendedor={emprendedor}
            setNavigationStatus={setNavigationStatus}
          />
        ) : null}
      </div>

      <div className="barraTareas">
        <div className="btnBuscarContainer">
          <input
            type="search"
            className="input-buscar"
            placeholder="Buscar"
            name="input-buscar"
            id="input-buscar"
            value={busqueda}
            onChange={handleChange}
            title="Buscar x nombre de emprendimiento o categor??a"
          />

          <div id="icono-buscar">
            <FontAwesomeIcon icon={faSearch} />
          </div>
        </div>

        {session.username && (
          <div className="btnNuevoContainer ">
            <Link
              className="btn btn-outline-secondary btn-sm sinBorde"
              to={"/emprendedores/create"}
            >
              <button
                className="iconoAgregar"
                alt="Agregar Emprendedor"
                title="Nuevo Emprendedor"
              >
                <i className="fas fa-plus"></i>
              </button>
            </Link>
          </div>
        )}
      </div>

      {!session.username && (
        <div className="tituloAnimado">
          <div className="animadoTitulo animadoTitulo1">
            {" "}
            Todo lo que busc??s....{" "}
          </div>
          <div className="animadoTitulo animadoTitulo2">
            {" "}
            <span>EN UN SOLO LUGAR! </span>{" "}
          </div>
        </div>
      )}

      <div className="emprendedoresContainer">
        {emprendedores.map((emprendedor, index) => (
          <div className="tarjetaEmprendedor" key={emprendedor._id}>
            <div className="imagenEmprendedorContainer">
              <img
                className="imagenEmprendedor"
                src={emprendedor.imagen}
                alt={"Logo: " + emprendedor.nombre_emprendimiento}
                onClick={handleClick(index)}
              />
            </div>

            <div className="marcaEmprendedorCoontainer" data-open="modal1">
              <h3 className="marcaEmprendimiento">
                {emprendedor.nombre_emprendimiento}
              </h3>
            </div>

            <div className="marcaEmprendedorCoontainer">
              <h3 className="rubroEmprendimiento">{emprendedor.rubro}</h3>
            </div>
            <div className="marcaEmprendedorContainer">
              <h3 className="descripcionEmprendimiento">
                {emprendedor.descripcioncorta}
              </h3>
            </div>

            <div
              className="irEmprendedorContainer"
              title="Ver informaci??n del Emprendedor"
            >
              <div className="editarEmprendedorCoontainer">
                <Link
                  className="btn btn-outline-secondary  btn-sm oculto"
                  to={"/"}
                >
                  <i className="fas fa-user-edit"></i>
                </Link>
              </div>

              <button className="irEmprendedor" onClick={handleClick(index)}>
                Ir a Emprendedor
              </button>

              <div className="editarEmprendedorCoontainer">
                <Link
                  className={botonEditar()}
                  title="Editar Emprendedor"
                  to={"/emprendedores/edit/" + emprendedor._id}
                >
                  <i className="fas fa-user-edit"></i>
                </Link>
              </div>
            </div>

            <div className="claves oculto"> {emprendedor.tags} </div>
          </div>
        ))}
      </div>

      <footer className="footerEmprendedores">
        <div className="lineaFooter">
          Desarrollado por Leticia Funes - Todos los derechos reservados . 2022
        </div>
      </footer>
    </div>
  );
}
