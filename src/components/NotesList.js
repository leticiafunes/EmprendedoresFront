import React from "react";
import { useEffect, useState } from "react";
import axios from 'axios';
import moment from 'moment';


import {Link} from 'react-router-dom'

export default function NotesList() {

    const [notes, setNotes] = useState([]);
    
  
    useEffect(() => {
        obtenerDatos();
        
        
      }, []);


    const obtenerDatos = async () => {
     

        const res = await axios.get(process.env.REACT_APP_INITIAL_PATH +"/api/notes");
        //const notes = res.data.map (user => user.username ) ; //filtro para que no cargue toda la info del request
        setNotes(res.data);
       
    };


    const deleteNote = async (id) =>  {
        await axios.delete (process.env.REACT_APP_INITIAL_PATH +"/api/notes/" + id);
        obtenerDatos();
    }


    return (
      
       <div className="row">
       {notes.map ((note) =>  (
            <div className="col-md-4 p-2" key = {note._id}>
                <div className="card">

                    <div 
                    className="card-header d-flex justify-content-between">
                        <h5>{note.title}</h5>
                     
                        <Link className = "btn btn-secondary btn-default" to ={'/edit/'+ note._id}>
                           Edit
                        </Link>
                    </div>
                    
                    <div 
                    className="card-body">
                        <p>{note.content}</p>
                        <p>{note.author}</p>
                        <p>{moment(note.date, "YYYYMMDD").fromNow()}</p>
                        
                         
                    </div>

                    <div className="card-footer">
                        <button 
                        className="btn btn-danger" 
                        onClick = {()=>deleteNote(note._id)}>
                              Delete
                        </button>
                    </div>
                 </div>
            </div>
       ))}
      </div>
       
    )
}
