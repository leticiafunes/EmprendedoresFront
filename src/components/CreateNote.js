import axios from "axios";
import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useParams } from "react-router-dom"; //hook



export default function CreateNote(props) {
  
  
  const [users, setUsers] = useState({
    //las var de estado tienen que coincidir con los nombres de los inputs que los modificarán

    usuarios: [],
    userSelected: "",
  });

  const [nota, setNota] = useState({
    //las var de estado tienen que coincidir con los nombres de los inputs que los modificarán

    author: "",
    date: "",
    title: "",
    content: ""
  });

  const [edit, setEdit] = useState({
    //las var de estado tienen que coincidir con los nombres de los inputs que los modificarán

    editing: false,
    _id: "",
  });


  const { id } = useParams(); //para saber que id viene en la  consulta


  useEffect(() => {
     
    const obtenerDatos = async () => {
      
      const res_users = await axios.get(process.env.REACT_APP_INITIAL_PATH + "/api/users");
      
      if (res_users.data) {
        setUsers({ 
          usuarios: res_users.data.map(user => user.username), //filtro para que no cargue toda la info del request
          userSelected: res_users.data[0].username
        })
  
       
       }
  
       if (id) {
   
        const res = await axios.get( process.env.REACT_APP_INITIAL_PATH +
          "/api/notes/" + id
        );
  
        if (res.data) {     
          const fecha = new Date(res.data.date);
        
  
          setUsers({ usuarios: res_users.data.map(user => user.username), 
            userSelected: res.data.author 
          })
           
        
  
           setNota({ ...nota, 
            date: fecha,
            title: res.data.title,
            content: res.data.content,
            author: users.userSelected
  
          });
  
         
          setEdit ({...edit, 
              editing: true, 
              _id: id
          });
  
          
  
         }
       
       }
        
    };
    obtenerDatos();
    

  }, []);

  const updateNote = (e) => {
    setNota({ ...nota, [e.target.name]: e.target.value });
  };

  const onUserChange = (e) => {
    setUsers({ ...users, userSelected: e.target.value });

  };

  const onDateChange = (date) => {
    setNota({ ...nota, date });
  };

  const onTitleChange = (e) => {
    updateNote(e);
  };
  const onContentChange = (e) => {
    updateNote(e);
  };

  const onSubmit = async (e) => {
    
    e.preventDefault();

    if (edit.editing) {
      const updateNote = {
        title: nota.title,
        content: nota.content,
        date: nota.date,
        author:  users.userSelected,
      };
      
      await axios.put(process.env.REACT_APP_INITIAL_PATH + "/api/notes/" + edit._id, updateNote);
    } else {
      const newNote = {
        title: nota.title,
        content: nota.content,
        date: nota.date,
        author: users.userSelected,
      };
      await axios.post(process.env.REACT_APP_INITIAL_PATH +"/api/notes", newNote);
    }

    window.location.href ='/';
  };

  const clearInputs = () => {
    const fecha = new Date();

    setNota({ ...nota, date: fecha, title: "", content: "", author: "" });
  };

  return (
    <div className="col-md-6 offset-md-3">
      <div className="card card-body">
        
      

        <h4> {edit.editing && <p>Edit Note</p>}</h4>
        
        <h4> {!edit.editing && <p>Create Note</p>}</h4>

         
        <div className="mb-3">
          <select
            className="form-control"
            name="userSelected" //Author de la Nota
            value = {users.userSelected}
            onChange={onUserChange}
            required
          >
            { 
              users.usuarios.map((user) => (
              <option key={user} value={user.author} name="author">
                {user}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="title"
            name="title"
            onChange={onTitleChange}
            value={nota.title}
            required
          />
        </div>

        <div className="mb-3">
          <textarea
            name="content"
            className="form-control"
            placeholder="Content"
            onChange={onContentChange}
            value={nota.content}
            required
          />
        </div>

        <div className="mb-3">
          <DatePicker
            className="form-control"
            selected={nota.date}
            onChange={onDateChange}
          />
        </div>

        <form onSubmit={onSubmit}>
          <button type="submit" className="btn btn-primary">
            Save
          </button>
        </form>
      </div>
    </div>
  );
}
