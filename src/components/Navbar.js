import React from "react";
import {Link} from 'react-router-dom'

import { useState} from "react";
import './estilosnavegacion.css';
export default function Navigation() {



    
    const [click, setClick] = useState(false);

    const handleClick = () => setClick(!click);

    const closeMobileMenu = () => setClick(false);



  return (


    <div className="nav-container">
     <nav className="navbar">
       
            
         <Link className="navbar-logo" to='/'> Emprendedores </Link>
 
         <div className={click ? 'menu-toggle is-active' : 'menu-toggle' }   onClick={handleClick} id="mobile-menu">
             <span className="bar"></span>
             <span className="bar"></span>
             <span className="bar"></span>
         </div>
         
         
       
         <ul className={click ? 'nav-menu active' : 'nav-menu' }>

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
            <Link className='nav-links' to ="/emprendedores" onClick={closeMobileMenu}>Emprendedores </Link>
            </li> 


            
            
            </ul>


);


         
     </nav> 
    </div>
 
 
 
    
  );
}