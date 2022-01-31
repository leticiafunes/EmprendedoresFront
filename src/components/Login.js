import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom"; //hook
import SessionContext from "../context/SessionContext";

import "./Login.css";

export default function Login(props) {
  //const [edit, setEdit] = useState({ editing: false, id: "" });

  const { session, handleSession } = useContext(SessionContext); //Para leer la Session  global

  const [mensaje, setMensaje] = useState("");
  const [user, setUser] = useState({
    username: "solatencio@gmail.com",
    password: "miclave2022",
    nivel: 0,
  });

  const navigate = useNavigate();

  useEffect(() => {}, []);

  const updateUser = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const cambiarMensaje = (mensaje) => {
    setMensaje(mensaje);
  };

  const mostrarMensaje = () => {
    return <p>{mensaje}</p>;
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!session.username) {
      try {
        const res = await axios.get(
          process.env.REACT_APP_INITIAL_PATH +
            "/api/users/userbyusername/" +
            user.username
        );

        if (res.data) {
          if (res.data[0].password === user.password) {
            const nuevaSession = res.data[0];
            setMensaje("");
            handleSession(nuevaSession); //En session están guardados los datos del usuario que LOGRO loguearse
            navigate("/emprendedores");
          } else {
            cambiarMensaje("Usuario o Clave Incorrecta");
          }
        } else {
          cambiarMensaje("Usuario o Clave Incorrecta");
        }
      } catch (err) {
        cambiarMensaje("Usuario o Clave Incorrecta");
      }
    } else {
      cambiarMensaje("Cierre primero la sesión activa");
    }
  };

  const volverEmprendedores = () => {
    navigate("../emprendedores");
  };

  return (
    <div>
      {mensaje && <div className="mensajeLogin">{mostrarMensaje()}</div>}

      {!session.username && (
        <form className="formCrearUser" onSubmit={onSubmit}>
          <div className="tituloCrearUserContainer">
            <div>
              {" "}
              {!session.username && <span className="oscuro">Login</span>}
            </div>
            <div>
              {" "}
              {session.username && (
                <span className="oscuro">{session.username}</span>
              )}
            </div>

          </div>

          <div className="row mb-3">
            <label
              htmlFor="nombre_id"
              className="col-sm-4 col-form-label oscuro"
            >
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
            <label
              htmlFor="nombre_id"
              className="col-sm-4 col-form-label oscuro"
            >
              Clave
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

          <div className="grabarUserContainer">
            <button type="submit" className="grabarUser">
              Aceptar
            </button>
            <button
              type="button"
              className="cancelarUser"
              onClick={volverEmprendedores}
            >
              Cancelar
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
