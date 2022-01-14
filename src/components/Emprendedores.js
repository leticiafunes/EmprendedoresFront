import React from "react";
import { useEffect, useState } from "react";
import axios from 'axios';
//import moment from 'moment';


import './estilosemprendedores.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import {Link} from 'react-router-dom'



import { Emprendedor_modal } from './Emprendedor_modal';




export default function Emprendedores() {

    const [emprendedores, setEmprendedores] = useState([]);
    const [tablaemprendedores, setTablaemprendedores]= useState([]);
    const [busqueda, setBusqueda] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [emprendedor_id, setEmprendedor_id] = useState('');
  
  
    
    useEffect(() => {
       
      obtenerDatos();
        
    }, []);

    
 

    const obtenerDatos = async () => {
      console.log (process.env.REACT_APP_INITIAL_PATH)
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


   

    const handleClick = (index) => () => {     
      
      setShowModal(true);
      setEmprendedor_id(index);
    };
      
      
      //buscar los datos del emprendedor
  

      //cargarlos en la variable de estado emprendedor
      //Mostrar el Modal
     






    return (
    
    <div>

    <div className="App">
      <h1>Popup Modal</h1>
      <button onClick={handleClick}>Open Modal</button>
      {showModal ? <Emprendedor_modal  setShowModal={setShowModal} emprendedor_id= {emprendedor_id} /> : null}
    </div>  


    


    <div className= "barraTareas"> 
   
      <div className="btn-buscar">
        <input 
        type="search" 
       className="input-buscar"
       placeholder="Buscar" 
       name="input-buscar" 
        id="input-buscar"
       value={busqueda}
      onChange={handleChange}/>
      
       <div id="icono-buscar">
         <FontAwesomeIcon icon={faSearch}/>
       </div>

   
      </div> 
      
      
      <div className="container ">
      <Link className = "btn btn-secondary btn-sm" to ={'/emprendedores/create'}>
          Emprendedor Nuevo
      </Link> 
                        </div>  

    </div>
       
     
  

     <div className= "emprendedor">
        {emprendedores.map ((emprendedor, index) => ( 
           
           
           <div className= "emprendedor-tarjeta"  key={emprendedor._id}>
                           <div className="container text-center">    
                        <div className="empre-imagen">  
                            <img 
                               className= "imagen-empre-chica" 
                               src= {emprendedor.imagen}  
                               alt="Emprendedor" 
                               onClick={handleClick(index+1)} 
                                    />
                         </div>
                         </div>
                        <div className="container text-center">
                           <div className= "empre-marca" data-open="modal1" className="text">
                           <h3 className= "nombre_emprendimiento" claves= "platería"> {emprendedor.nombre} </h3>
                        </div>  
                        </div>  
                         <div className="container text-center">
                        <Link className = "btn btn-outline-secondary  btn-sm" to ={'/emprendedores/edit/' + emprendedor._id}>
                            Modificar
                        </Link>   
                        </div>  

                        
                            
                        
                        
                        <div className="claves oculto"> {emprendedor.tags} </div>  
                        </div>   ))}
     
     </div>
        
    
         
           <i className="fas fa-arrow-circle-up ir-arriba"></i>

    </div>

      
    )}
