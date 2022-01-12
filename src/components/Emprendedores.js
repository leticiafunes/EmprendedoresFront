import React from "react";
import { useEffect, useState } from "react";
import axios from 'axios';
//import moment from 'moment';

import './estilosemprendedores.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import {Link} from 'react-router-dom'

export default function EmprendedoresList() {

    const [emprendedores, setEmprendedores] = useState([]);
    const [tablaemprendedores, setTablaemprendedores]= useState([]);
    const [busqueda, setBusqueda] = useState("");
    
  
    
    useEffect(() => {
       
      obtenerDatos();
        
    }, []);


    const obtenerDatos = async () => {
     
      const res = await axios.get(process.env.REACT_APP_INITIAL_PATH +"/api/emprendedores");
      if (res.data) 
      { 
        setEmprendedores(res.data)
        setTablaemprendedores (res.data)
      }
      else {console.log ('No hay emprendedores cargados')}
      
    };


/*
    const deleteEmprendedor = async (id) =>  {
        await axios.delete (process.env.REACT_APP_INITIAL_PATH + "/api/emmprendedor/" + id);
        obtenerDatos();
    }
    */

    
    const handleChange=e=>{
      setBusqueda(e.target.value);
      filtrar(e.target.value)
    }
    

    const filtrar=(busqueda)=>{
     
      const empFiltrados = tablaemprendedores.filter (
        (emprendedor) => {
          if (emprendedor.nombre.toString().toLowerCase().includes(busqueda.toLowerCase())
                     || emprendedor.resena.toString().toLowerCase().includes(busqueda.toLowerCase()))
        {return emprendedor}
        });

        setEmprendedores (empFiltrados)
    }


    return (
    
    <container>
  
     <div className="containerInput">
        <input
          className="form-control inputBuscar"
          value={busqueda}
          placeholder="Búsqueda por Emprendedor o Rubro"
          onChange={handleChange}
        />
        <button className="btn btn-success">
          <FontAwesomeIcon icon={faSearch}/>
        </button>
       
        <Link className = "btn btn-secondary" to ={'/emprendedores/create'}>
          Emprendedor Nuevo
        </Link>
     </div>

     <div className= "emprendedor">
        {emprendedores.map ((emprendedor) => ( 
           
           
           <div className= "emprendedor-tarjeta"  key={emprendedor._id}>
             

                 
                        <div className="empre-imagen">  
                            <img className= "imagen-empre-chica" src= {emprendedor.imagen}  alt="Emprendedor"   />            
                         </div>
                        <div className= "empre-marca" data-open="modal1" className="text">
                           <h3 className= "rubro" claves= "platería"> {emprendedor.nombre} </h3>
                        </div>  

                         <div class="container text-center">
                        <Link className = "btn btn-outline-secondary  btn-sm" to ={'/emprendedores/edit/' + emprendedor._id}>
                            Modificar
                        </Link>   
                        </div>  

                        
                            
                        
                        
                        <div className="claves oculto"> {emprendedor.tags} </div>  
                        </div>   ))}
     
     </div>
        
    
         
           <i className="fas fa-arrow-circle-up ir-arriba"></i>

        </container>

      
    )}
