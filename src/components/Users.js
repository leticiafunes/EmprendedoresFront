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

      <div className="col-md-12">
        <ul className="list-group">
          <li className="usuariosLinea">
            <div className="usuarioDatos">
              <div className="oscuro"> Nombre y Apellido</div>
              <div className="oscuro"> Nombre de Usuario</div>
              <div className="oscuro"> Clave</div>
              <div className="oscuro">Nivel</div>
            </div>
          </li>
          {users.map((user) => (
            <li
              className="usuariosLinea"
              key={user._id}
              onDoubleClick={() => borrarUser(user._id)}
            >
              <div className="usuarioDatos">
                <div>
                  {user.nombre} {user.apellido}
                </div>
                <div>{user.username}</div>
                <div>{user.password}</div>
                <div>{user.nivel} </div>
              </div>

              <div className="editarEmprendedorCoontainer">
                <Link
                  className={botonEditar()}
                  title="Editar Usuario"
                  to={"/user/edit/" + user._id}
                >
                  <i className="fas fa-user-edit"></i>
                </Link>
              </div>

              {session.username && (
                <div className="editarEmprendedorCoontainer">
                  <button
                    type="button"
                    className="icono "
                    onClick={() => borrarUser(user._id)}
                  >
                    <i className="far fa-trash-alt"></i>
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
