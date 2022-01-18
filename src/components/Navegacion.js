import React from "react";
import {Link} from 'react-router-dom'

import { useState} from "react";
import './Navegacion.css';


export default function Navegacion ({navigationStatus,setNavigationStatus}) {

    
    const [click, setClick] = useState(false);

    


    const handleClick = () => {
      
      setClick(!click);
      setNavigationStatus(!click);
   }

    const closeMobileMenu = () => {
       setClick(false);
       setNavigationStatus(false);

    }



  return (


    <div className="nav-container">
     <nav className="navbar">
       
            
         <Link className="navbar-logo" to='/'> Emprendedores </Link>
 
         <div className={(click&&navigationStatus) ? 'menu-toggle is-active' : 'menu-toggle' }   onClick={handleClick} id="mobile-menu">
             <span className="bar"></span>
             <span className="bar"></span>
             <span className="bar"></span>
         </div>
         
         
       
         <ul className={(click&&navigationStatus) ? 'nav-menu active' : 'nav-menu' }>

            <li className="item-lista">
               <Link className='nav-links' to ="/" onClick={closeMobileMenu}> Notas </Link>
            </li>
            <li className="item-lista">
               <Link className='nav-links' to ="/create" onClick={closeMobileMenu}> Nueva Nota </Link>
            </li>
            <li className="item-lista">
             <Link className='nav-links' to ="/user" onClick={closeMobileMenu}> Crear Usuario </Link>
            </li>

            <li className="item-lista">
            <Link className='nav-links' 
            
            to={{
               pathname: "/emprendedores" ,
               search: "?sort=name",
               hash: "#the-hash",
               state: { fromDashboard: true }
             }}
            
            onClick={closeMobileMenu}>Emprendedores </Link>
            </li> 


            
            
            </ul>


);


         
     </nav> 
    </div>
 
 
 
    
  );
}