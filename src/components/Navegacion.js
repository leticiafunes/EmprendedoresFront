import React, { useContext } from "react";
import {Link} from 'react-router-dom'

import { useState} from "react";
import './Navegacion.css';
import ThemeContext from "../context/ThemeContext";
import LanguageContext from "../context/LanguageContext";
import SessionContext from "../context/SessionContext";

export default function Navegacion ({navigationStatus,setNavigationStatus}) {

    
    const [click, setClick] = useState(false);

    const {theme, handleTheme} = useContext(ThemeContext) //Para leer el theme global
    const {texts, handleLanguage} = useContext(LanguageContext) //Para leer el lenguage global
    const {session, handleSession, closeSession } = useContext(SessionContext); //Para leer la Session  global



    const handleClick = () => {
      
      setClick(!click);
      setNavigationStatus(!click);
   }

    const closeMobileMenu = () => {
       setClick(false);
       setNavigationStatus(false);

    }


   const aLogin = () => {
      
      closeMobileMenu ();
      

   }

    const loginTitulo = () => {

     
      if (session.username) {

         return (
            <span>
              {session.username}
            </span>
          );

      }
      else {
         return (
            <span>
              Login
            </span>
          );



      }

     
    }


  return (


    <div className="nav-container">

     <nav className="navbar">
       
  
        
        

         <div  className = "navLogoContainer"  >

          <img className= "navImagenLogo" src={"./images/emprendedoresLogo.png"}
          alt="Emprendedor" />
          
          <Link className="navLetrasLogo" to='/'> </Link>

         </div>
      
         
 
         <div className={(click&&navigationStatus) ? 'menu-toggle is-active' : 'menu-toggle' }   onClick={handleClick} id="mobile-menu">
             <span className="bar"></span>
             <span className="bar"></span>
             <span className="bar"></span>
         </div>
         
        
       
         <ul className={(click&&navigationStatus) ? 'nav-menu active' : 'nav-menu' }>

      
            <li className="item-lista" >
             
               <Link className='nav-links'  to ="/login" id="logueado" onClick={aLogin}> {loginTitulo()}
               
               {session.username && 
               
               <ul id= "listaSalir">
                 <li onClick= {closeSession} >Salir</li>
               </ul>  }
               
               </Link>
            </li>
  



            {session.username &&  <li className="item-lista">
             <Link className='nav-links' to ="/user" onClick={closeMobileMenu} > Usuarios </Link>
            </li>}
          
            {session.username &&  <li className="item-lista">
             <Link className='nav-links' to ="/user/create" onClick={closeMobileMenu} > Crear Usuario </Link>
            </li>}
            

            <li className="item-lista">
            <Link className='nav-links' 
            
            to={{ pathname: "/emprendedores"    
             }}
            
            onClick={closeMobileMenu}>Emprendedores </Link>
            </li> 



         </ul>





         
     </nav> 

     </div>
 
 
 
    
  );
}