import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { useParams } from "react-router-dom"; //hook
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import SessionContext from "../context/LanguageContext";

import "./NuevoUsuario.css";

export default function NuevoUsuario(props) {
  
  const [edit, setEdit] = useState({ editing: false, id: "" });

  const {session, handleSession} = useContext(SessionContext) //Para leer la Session  global

  const [login, setLogin]  = useState("");

  const [user, setUser] = useState({
    username: "",
    password: "",
    nivel: 0
  });

  

  useEffect(() => {
   
    const obtenerDatos = async () => {
     
      if (login.length > 0) {     //En login están los datos del usuario que INTENTA Loguearse
        const res = await axios.get(
          process.env.REACT_APP_INITIAL_PATH + "/api/users/userbyusername/" + login.trim()
        );

        if (res.data) {
          const new_user = res.data;

          setUser({
            ...user,
            username: new_user.username,
            password: new_user.password,
            nivel: new_user.nivel,
          });

          handleSession (user);   //En session están guardados los datos del usuario que LOGRO loguearse
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
  }


  const onSubmit = async (e) => {
    e.preventDefault();

    const updateUser = {
      ...user,
      username: user.username,
      password: user.password,
      nivel: user.nivel,
    };

    if (edit.editing) {

      try {
        await axios.put(
          process.env.REACT_APP_INITIAL_PATH + "/api/users/" + edit._id,
          updateUser
        );
        mostrarMensaje ('user Grabado Exitosamente');
       } catch (err) {
        mostrarMensaje ('Fallo al grabar User: ', err);
       
       }
   
    } else {
      try{
      await axios.post(
        process.env.REACT_APP_INITIAL_PATH + "/api/users/",
        updateUser
        );
        mostrarMensaje ('User Grabado Exitosamente');
       } catch (err) {
        mostrarMensaje ('Fallo al grabar user: ', err);
       
       }
    }

   
  };



  const volverUsers = () => {
    window.location.href = "/user";
  }


  return (
  
  <form className="formCrearUser" onSubmit={onSubmit}>
    <div className= "tituloCrearUserContainer">
      <div className="titulo"> {edit.editing && <p>Editar usuario</p>}</div>
      <div className="titulo"> {!edit.editing && <p>Crear usuario</p>}</div>

      <div className="btnVolver">
          <label className="col-sm-6 col-form-label oscuro">
            Volver
          </label>

          <button type="button" className="icono " onClick={volverUsers}>
             <i className="fas fa-arrow-right"></i>
          </button>
      </div>
  
    </div>
      


      <div className="row mb-3">
        <label htmlFor="nombre_id" className="col-sm-2 col-form-label oscuro">
          Nombre de Usuario
        </label>

        <div className="col-sm-10">
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
        <label htmlFor="nombre_id" className="col-sm-2 col-form-label oscuro">
          Password
        </label>

        <div className="col-sm-10">
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
          Guardar
        </button>
        <button type="button" className="cancelarUser" onClick={volverUsers}>
          Cancelar
        </button>
        
      </div>
    </form>
  );
}
