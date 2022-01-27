import React from "react";
import { useEffect, useState, useContext } from "react";
import axios from 'axios';
import SessionContext from "../context/SessionContext";
import { Link } from "react-router-dom";
import "./Users.css";

export default function Users() {


  const [users, setUsers] = useState([]);
  const [username, setUsername] = useState('');
  const [nombre, setNombre] = useState({   //las var de estado tienen que coincidir con los nombres de los inputs que los modificaran
        nombre: '',
        apellido: ''
 });
  
 const {session, handleSession, closeSession } = useContext(SessionContext); //Para leer la Session  global


  useEffect(() => {
       obtenerDatos();
        
  }, []);

  const obtenerDatos = async () => {
  
    const res = await axios.get(process.env.REACT_APP_INITIAL_PATH +'/api/users');
    
        setUsers(res.data);
    
    }


  const onChangeUserName = (e) => {
    setUsername(e.target.value);
  };
  
  const onChangeNombreApellido = (e) => {                //en e vienen los datos del evento del input
    setNombre({...nombre, [e.target.name] : e.target.value});
   };           
 



  const guardarUser = async (e) => {

      e.preventDefault();      //evita reiniciar la pagina con cada submit

      let newUser = { username: username, nombre: nombre.nombre, apellido:  nombre.apellido };
   
       await axios.post (process.env.REACT_APP_INITIAL_PATH +'/api/users', newUser)

      obtenerDatos ();
      
      setUsername('');
      setNombre ({ ...nombre,  
        nombre: '',
        apellido: ''})
  
  };


  const borrarUser =  async (id) => {

   
    await axios.delete (process.env.REACT_APP_INITIAL_PATH +'/api/users/'+ id)
    
    obtenerDatos ();
    
 };



 const botonEditar = () => {
  {


    if (session.username) {

       return (
        "btn btn-outline-secondary  btn-sm"
        );

    }     

    return ( "btn btn-outline-secondary  btn-sm oculto" )

   
  }


   
 }


  return (
      

    
    <div className="pantallaUsuarios">

        <h1>Usuarios</h1>

      <div className="col-md-8">
        <ul className="list-group">
        {users.map((user) => (
            <li className= "usuariosLinea"
              
              key={user._id}
              onDoubleClick={()=>borrarUser(user._id) }
              > 
              {user.username} - {user.password} - {user.nombre} - {user.apellido} - {user.nivel}

           

             <div className="editarEmprendedorCoontainer">
               
               <Link
                 className= {botonEditar()}
                 title="Editar Emprendedor"
                 to={"/user/edit/" + user._id}
               >
                 <i className="fas fa-user-edit"></i>
               </Link>

             </div>

             {session.username && <div className="editarEmprendedorCoontainer">
               
             <button type="button" className="icono " onClick={()=>borrarUser(user._id)}>
             
             <i class="far fa-trash-alt"></i>
             </button>

             </div>}

             </li>

          ))}
        </ul>
      </div>

      
    </div>
  );
}
