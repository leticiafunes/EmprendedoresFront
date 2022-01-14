import axios from "axios";
import React, { useState, useEffect } from "react";
//import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useParams } from "react-router-dom"; //hook

import {CloudinaryUploadWidget , url} from './CloudinaryUploadWidget'

export default function CreateEmprendedor(props) {
  
  
  const [emprendedor, setEmprendedor] = useState({
    //las var de estado tienen que coincidir con los nombres de los inputs que los modificarán

    nombre: "",
    activo: true,
    tags: [],
    resena: "",
    telefono: "",
    mail: "",
    redes: [],
    imagen: "",
    nombre_emprendimiento: "",
  });

  const [edit, setEdit] = useState({
    //las var de estado tienen que coincidir con los nombres de los inputs que los modificarán

    editing: false,
    _id: "",
  });

  const { id } = useParams(); //para saber que id viene en la  consulta

  useEffect(() => {
    const obtenerDatos = async () => {
     
     
      if (id) {
        const res = await axios.get(process.env.REACT_APP_INITIAL_PATH + 
          "/api/emprendedores/" + id
        );
      
        
        if (res.data) {
          const new_emprendedor = res.data;
          setEmprendedor({
            ...emprendedor,

            nombre: new_emprendedor.nombre,
            activo: new_emprendedor.activo,
            tags: new_emprendedor.tags,
            resena: new_emprendedor.resena,
            telefono: new_emprendedor.telefono,
            mail: new_emprendedor.mail,
            redes: new_emprendedor.redes,
            imagen: new_emprendedor.imagen,
            nombre_emprendimiento: new_emprendedor.nombre_emprendimiento,
            
          });
         
          console.log ('Editando: ' + new_emprendedor.nombre + ' id: ' +  id) 
        }

       


        
        setEdit({ ...edit, editing: true, _id: id });
      }
    };

    obtenerDatos();
    
   
  }, []);

  const updateEmprendedor = (e) => {
   
   
    setEmprendedor({ ...emprendedor, [e.target.name]: e.target.value });
  };


  const updateEmprendedorActivo = (e) => {
      setEmprendedor({ ...emprendedor, [e.target.name]: e.target.checked });
   
  };



  const onSubmit = async (e) => {
    e.preventDefault();
 
    if (edit.editing) {
      const updateEmprendedor = {
        nombre: emprendedor.nombre,
        activo: emprendedor.activo,
        tags: emprendedor.tags,
        resena: emprendedor.resena,
        telefono: emprendedor.telefono,
        mail: emprendedor.mail,
        redes: emprendedor.redes,
        imagen: emprendedor.imagen,
        nombre_emprendimiento: emprendedor.nombre_emprendimiento,
      };
       
      console.log (updateEmprendedor);
      console.log ('axios:' + process.env.REACT_APP_INITIAL_PATH + "/api/emprendedores/" + edit._id);

      await axios.put( process.env.REACT_APP_INITIAL_PATH + 
        "/api/emprendedores/" + edit._id,
        updateEmprendedor
      );

    
    } else {
      const newEmprendedor = {
        nombre: emprendedor.nombre,
        activo: emprendedor.activo,
        tags: emprendedor.tags,
        resena: emprendedor.resena,
        telefono: emprendedor.telefono,
        mail: emprendedor.mail,
        redes: emprendedor.redes,
        imagen: emprendedor.imagen,
        nombre_emprendimiento: emprendedor.nombre_emprendimiento,
      };

      await axios.post(process.env.REACT_APP_INITIAL_PATH + "/api/emprendedores/", newEmprendedor);
    }
    

    //window.location.href = "/emprendedores";
  };

  const clearInputs = () => {
    setEmprendedor({
      ...emprendedor,
      nombre: "",
      nombre_emprendimiento: "",
      activo: true,
      tags: [],
      resena: "",
      telefoo: "",
      mail: "",
      redes: [],
      imagen: "",
    });
  };


  const openWidget = () => {
  
    var myWidget = window.cloudinary.createUploadWidget(
      {
        cloudName: "dlujwnnwv",
        uploadPreset: "emprendedores"
      },
      (error, result) => {
        if (!error && result && result.event === "success") {
          console.log("Done! Here is the image info: ", result.info.secure_url);
          const imageurl = result.info.secure_url
       
          setEmprendedor({ ...emprendedor, imagen: imageurl  });
         
          
        
        }
      }
    )

    myWidget.open();

    }




  return (
    <div className="col-md-6 offset-md-3">
      <div className="card card-body">
        <h4> {edit.editing && <p>Editar Emprendedor</p>}</h4>
        <h4> {!edit.editing && <p>Crear Emprendedor</p>}</h4>

        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="nombre"
            name="nombre"
            onChange={updateEmprendedor}
            value={emprendedor.nombre}
            required
          />
        </div>

        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="nombre_emprendimiento"
            name="nombre_emprendimiento"
            onChange={updateEmprendedor}
            value={emprendedor.nombre_emprendimiento}
            required
          />
        </div>

        <div className="mb-3">
          <textarea
            name="resena"
            className="form-control"
            placeholder="Content"
            onChange={updateEmprendedor}
            value={emprendedor.resena}
            required

          />
        </div>
        <div className="mb-3">
        <div className="form-check form-switch">
          <input
            className="form-check-input"
            type="checkbox"
            placeholder="Activo"
            name="activo"onChange={updateEmprendedorActivo}
            value= {emprendedor.activo}
            required
            id="activo"
            checked= {emprendedor.activo}

           
          />
          <label className="form-check-label" htmlFor="activo">
            Activo
          </label>
        </div>
        </div>
       

        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Tags"
            name="tags"
            onChange={updateEmprendedor}
            value={emprendedor.tags}
            required
          />
        </div>

        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Redes"
            name="redes"
            onChange={updateEmprendedor}
            value={emprendedor.redes}
            required
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Teléfono"
            name="telefono"
            onChange={updateEmprendedor}
            value={emprendedor.telefono}
            required
          />
        </div>

        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Mail"
            name="mail"
            onChange={updateEmprendedor}
            value={emprendedor.mail}
            required
          />
        </div>

        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Imagen"
            name="imagen"
            onChange={updateEmprendedor}
            value={emprendedor.imagen}
            required
          />
           <button className="cloudinary-button" onClick= {openWidget} >
            Elegir foto
           </button>     
        </div>

          
  
        <form onSubmit={onSubmit}>
          <button type="submit" className="btn btn-primary">
            Grabar Emprendedor
          </button>
        </form>
      </div>
    </div>
  );
}
