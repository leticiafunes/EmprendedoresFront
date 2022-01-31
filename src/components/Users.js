import React from "react";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import SessionContext from "../context/SessionContext";
import { Link } from "react-router-dom";
import "./Users.css";

// ES6 Modules or TypeScript
import Swal from 'sweetalert2'





export default function Users() {
  const [users, setUsers] = useState([]);

  const { session } = useContext(SessionContext); //Para leer la Session  global

  useEffect(() => {
    obtenerDatos();
  }, []);

  const obtenerDatos = async () => {
    const res = await axios.get(
      process.env.REACT_APP_INITIAL_PATH + "/api/users"
    );

    setUsers(res.data);
  };

  const borrarUser = async (id) => {

    Swal.fire({
      title: 'Está seguro que quiere eliminar el usuario?',
      text: "Esta acción es irreversible!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#8cc2c4',
      cancelButtonColor: '#ff9000',
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'Cancelar',

    }).then((result) => {
      if (result.isConfirmed) {
        eliminarUser (id);
      }
    })

    const eliminarUser = async (id) => {
      await axios.delete(process.env.REACT_APP_INITIAL_PATH + "/api/users/" + id);
      obtenerDatos();
    }
    
    



  };

  const botonEditar = () => {
    if (session.username) {
      return "btn btn-outline-secondary  btn-sm";
    }

    return "btn btn-outline-secondary  btn-sm oculto";
  };

  return (
    <div className="pantallaUsuarios">
      <h1>Usuarios</h1>

      <div className = "grillaUsuarios">
          
        
        <div className="tituloGrillaUser"> Nombre y Apellido</div>
        <div className="tituloGrillaUser"> Nombre de Usuario</div>
        <div className="tituloGrillaUser"> Clave</div>
        <div className="tituloGrillaUser">Nivel</div>
        <div className="tituloGrillaUser">Ed.</div>
        <div className="tituloGrillaUser">El.</div>
        </div>
        {users.map( (user) => (
           
           <div className = "grillaUsuarios">
     
                <div className="lineaUser"> {user.nombre} {user.apellido}</div>
                <div className="lineaUser">{user.username}</div>
                <div className="lineaUser">{user.password}</div>
                <div className="lineaUser">{user.nivel} </div>
                <div className="editarEmprendedorContainer">
                  <Link
                  className={botonEditar()}
                  title="Editar Usuario"
                  to={"/user/edit/" + user._id}
                >
                  <i className="fas fa-user-edit"></i>
                </Link>
                 </div>
             
              {session.username && (
                <div className="editarEmprendedorContainer">
                  <button
                    type="button"
                    className="icono "
                    onClick={() => borrarUser(user._id)}
                  >
                    <i className="far fa-trash-alt"></i>
                  </button>
                </div>
              )}
           
           </div>
          ))}
   

 
      
     
       
         


      </div>
  
  );
}
