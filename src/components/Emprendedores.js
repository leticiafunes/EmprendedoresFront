import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
//import moment from 'moment';

import "./Emprendedores.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

import { EmprendedorModal } from "./EmprendedorModal";

export default function Emprendedores({ setNavigationStatus }) {
  const [emprendedores, setEmprendedores] = useState([]);
  const [tablaemprendedores, setTablaemprendedores] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [emprendedor, setEmprendedor] = useState("");

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
      elemento.nombre
        .toString()
        .toLowerCase()
        .includes(busqueda.toLowerCase()) ||
      elemento.resena.toString().toLowerCase().includes(busqueda.toLowerCase())
    );
  }

  const filtrar = (busqueda) => {
    const empFiltrados = tablaemprendedores.filter((elemento) =>
      incluyeElemento(elemento, busqueda)
    );

    console.log(tablaemprendedores);
    console.log(empFiltrados);

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

  return (
    <div>
      <div className="App">
        {showModal ? (
          <EmprendedorModal
            setShowModal={setShowModal}
            emprendedor={emprendedor}
            setNavigationStatus={setNavigationStatus}
          />
        ) : null}
      </div>

      <div className="barraTareas">
        <div className="btn-buscar">
          <input
            type="search"
            className="input-buscar"
            placeholder="Buscar"
            name="input-buscar"
            id="input-buscar"
            value={busqueda}
            onChange={handleChange}
          />

          <div id="icono-buscar">
            <FontAwesomeIcon icon={faSearch} />
          </div>
        </div>

        <div className="container-nuevo ">
          <Link
            className="btn btn-secondary btn-sm"
            to={"/emprendedores/create"}
          >
            Emprendedor Nuevo
          </Link>
        </div>
      </div>

      <div className="emprendedor">
        {emprendedores.map((emprendedor, index) => (
          <div className="emprendedor-tarjeta" key={emprendedor._id}>
            <div className="container text-center">
              <div className="empre-imagen">
                <img
                  className="imagen-empre-chica"
                  src={emprendedor.imagen}
                  alt="Emprendedor"
                  onClick={handleClick(index)}
                />
              </div>
            </div>
            <div className="container text-center">
              <div className="empre-marca text" data-open="modal1" >
                <h3 className="nombre_emprendimiento" claves="platería">
                  {" "}
                  {emprendedor.nombre}{" "}
                </h3>
              </div>
            </div>
            <div className="container text-center">
              <Link
                className="btn btn-outline-secondary  btn-sm"
                to={"/emprendedores/edit/" + emprendedor._id}
              >
                Modificar
              </Link>
            </div>

            <div className="claves oculto"> {emprendedor.tags} </div>
          </div>
        ))}
      </div>

      <i className="fas fa-arrow-circle-up ir-arriba"></i>
    </div>
  );
}
