import React from "react";
import { useEffect, useState } from "react";
import axios from 'axios';



console.log (process.env.REACT_APP_INITIAL_PATH);


export default function CreateUser() {
  const [users, setUsers] = useState([]);
  const [username, setUsername] = useState('');
  const [nombre, setNombre] = useState({   //las var de estado tienen que coincidir con los nombres de los inputs que los modificaran
        nombre: '',
        apellido: ''
 });
  


  useEffect(() => {
       obtenerDatos();
        
  }, []);

  const obtenerDatos = async () => {
  
    const res = await axios.get('http://localhost:4001/api/users');
    
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
   
       await axios.post ('http://localhost:4001/api/users', newUser)

      obtenerDatos ();
      
      setUsername('');
      setNombre ({ ...nombre,  
        nombre: '',
        apellido: ''})
  
  };


  const borrarUser =  async (id) => {

   
    await axios.delete ('http://localhost:4001/api/users/'+ id)
    
    obtenerDatos ();
    
 };

  return (
    <div className="row">
      <div className="col-md-4">
        <div className="card card-body">
        <h1>Usuarios</h1>
          <form onSubmit={guardarUser}>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="Ingrese username"
                onChange={onChangeUserName}
                name= "username"
                value= {username}
              />
                <input
                type="text"
                className="form-control"
                placeholder="Ingrese Nombre"
                onChange={onChangeNombreApellido}
                name= "nombre"
                value= {nombre.nombre}
              />
                <input
                type="text"
                className="form-control"
                placeholder="Ingrese Apellido"
                onChange={onChangeNombreApellido}
                name= "apellido"
                value= {nombre.apellido}
              />
            </div>
            <button type="submit" className="btn btn-primary ">
              Guardar Usuario
            </button>
          </form>

     
        </div>
      </div>
      <div className="col-md-8">
        <ul className="list-group">
        {users.map((user) => (
            <li
              className="list-group-item list-group-item-action"
              key={user._id}
              onDoubleClick={()=>borrarUser(user._id) }
              > 
              {user.username}

            </li>
          ))}
        </ul>
      </div>

      
    </div>
  );
}
