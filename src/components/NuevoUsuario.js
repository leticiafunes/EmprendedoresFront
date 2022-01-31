import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import SessionContext from "../context/LanguageContext";
import { useNavigate, useParams } from "react-router-dom"; //hook

import "./Login.css";

export default function NuevoUsuario(props) {
  const [edit, setEdit] = useState({ editing: false, id: "" });

  const { session, handleSession } = useContext(SessionContext); //Para leer la Session  global

  const [login, setLogin] = useState("");

  const [user, setUser] = useState({
    username: "",
    password: "",
    nivel: 0,
    nombre: "",
    apellido: "",
  });

  const navigate = useNavigate();

  const { id } = useParams(); //Para ver que user tengo que editar

  useEffect(() => {
    const obtenerDatos = async () => {
      if (id) {
        const res = await axios.get(
          process.env.REACT_APP_INITIAL_PATH + "/api/users/" + id
        );

        if (res.data) {
          const user = res.data;

          setUser({
            ...user,
            username: user.username,
            password: user.password,
            nivel: user.nivel,
            nombre: user.nombre,
            apellido: user.apellido,
          });

          setEdit({ ...edit, editing: true, _id: id });
        }
      }
    };
    obtenerDatos();
  }, []);

  const updateUser = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const updateUserActivo = (e) => {
    setUser({ ...user, [e.target.name]: e.target.checked });
  };

  const mostrarMensaje = (mensaje) => {
    alert(mensaje);
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const updateUser = {
      ...user,
      username: user.username,
      password: user.password,
      nivel: user.nivel,
      nombre: user.nombre,
      apellido: user.apellido,
    };

    if (edit.editing) {
      try {
        await axios.put(
          process.env.REACT_APP_INITIAL_PATH + "/api/users/" + edit._id,
          updateUser
        );
        mostrarMensaje("Usuario Editado Exitosamente");
      } catch (err) {
        mostrarMensaje("Fallo al grabar Usuario: ", err);
      }
    } else {
      try {
        await axios.post(
          process.env.REACT_APP_INITIAL_PATH + "/api/users/",
          updateUser
        );
        mostrarMensaje("Usuario Grabado Exitosamente");
      } catch (err) {
        mostrarMensaje("Fallo al grabar Usuario: ", err);
      }
    }
  };

  const volverUsers = () => {
    navigate("/user");
  };

  return (
    <div>
      <form className="formCrearUser" onSubmit={onSubmit}>
        <div className="tituloCrearUserContainer">
          <div className="titulo">
            {" "}
            {edit.editing ? <p>Editar usuario</p> : <p>Nuevo usuario</p>}
          </div>


        </div>

        <div className="row mb-4">
          <label htmlFor="nombre_id" className="col-sm-4 col-form-label oscuro">
            Nombre de Usuario
          </label>

          <div className="col-sm-8">
            <input
              type="text"
              className="form-control"
              placeholder="userName"
              name="username"
              onChange={updateUser}
              value={user.username}
              required
            />
          </div>
        </div>

        <div className="row mb-3">
          <label htmlFor="nombre_id" className="col-sm-4 col-form-label oscuro">
            Password
          </label>

          <div className="col-sm-8">
            <input
              type="text"
              className="form-control"
              placeholder="Password"
              name="password"
              onChange={updateUser}
              value={user.password}
              required
            />
          </div>
        </div>

        <div className="row mb-3">
          <label htmlFor="nombre_id" className="col-sm-4 col-form-label oscuro">
            Nombre
          </label>

          <div className="col-sm-8">
            <input
              type="text"
              className="form-control"
              placeholder="Nombre"
              name="nombre"
              onChange={updateUser}
              value={user.nombre}
              required
            />
          </div>
        </div>

        <div className="row mb-3">
          <label htmlFor="nombre_id" className="col-sm-4 col-form-label oscuro">
            Apellido
          </label>

          <div className="col-sm-8">
            <input
              type="text"
              className="form-control"
              placeholder="Apellido"
              name="apellido"
              onChange={updateUser}
              value={user.apellido}
              required
            />
          </div>
        </div>

        <div className="row mb-3">
          <label htmlFor="nombre_id" className="col-sm-4 col-form-label oscuro">
            Nivel
          </label>

          <div className="col-sm-8">
            <select
              className="form-control"
              name="nivel"
              value={user.nivel}
              onChange={updateUser}
              required
            >
              <option> 0 </option>
              <option> 1 </option>
              <option> 2 </option>
              <option> 3 </option>
            </select>
          </div>
        </div>

        <div className="grabarUserContainer">
          <button type="submit" className="grabarUser">
            Guardar
          </button>
          <button type="button" className="cancelarUser" onClick={volverUsers}>
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}
