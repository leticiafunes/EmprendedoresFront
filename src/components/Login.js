import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { useParams } from "react-router-dom"; //hook
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import SessionContext from "../context/SessionContext";

import "./Login.css";

export default function Login(props) {
  //const [edit, setEdit] = useState({ editing: false, id: "" });

  const { session, handleSession, closeSession } = useContext(SessionContext); //Para leer la Session  global

  const [login, setLogin] = useState("");

  const [user, setUser] = useState({
    username: "franciscoatencio@gmail.com",
    password: "miclave2022",
    nivel: 0,
  });



  useEffect(() => {
   
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
    };

  
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
            handleSession(nuevaSession); //En session están guardados los datos del usuario que LOGRO loguearse
          } else {
           
            mostrarMensaje("Usuario o Clave Incorrecta");
          }
        } else {
          mostrarMensaje("Usuario o Clave Incorrecta");
        }
      } catch (err) {
        mostrarMensaje("Usuario o Clave Incorrecta");
      }
    } else {
      mostrarMensaje("Cierre primero la sesión activa");
    }
  };

  const volverUsers = () => {
    window.location.href = "/user";
  };

  const cerrarSession = () => {

  
    if (!session.username) {

       return (
          <span>
            
          </span>
        );

    }     

    return ( <span>"Cerrar sesión"</span> )

   
  }


  return (
  
    

    <div> 
    {!session.username && 
    <form className="formCrearUser" onSubmit={onSubmit}>     

      <div className="tituloCrearUserContainer">
   
        <div> {!session.username && <span className= "oscuro" >Login</span>}
        </div>
        <div> {session.username && <span className= "oscuro" >{session.username}</span>}
        </div>
        <div className="btnVolver">
          <label className="col-sm-6 col-form-label oscuro">Volver</label>

          <button type="button" className="icono " onClick={volverUsers}>
            <i className="fas fa-arrow-right"></i>
          </button>
        </div>
      </div>

      <div className="row mb-3">
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

      <div className="grabarUserContainer">
        <button type="submit" className="grabarUser">
          Aceptar
        </button>
        <button type="button" className="cancelarUser" onClick={volverUsers}>
          Cancelar
        </button>
      
      </div>
    </form>}

    
   
    </div>)

    

   
}
