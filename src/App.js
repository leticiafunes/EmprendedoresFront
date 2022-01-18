import React from 'react'
import {BrowserRouter as Router, Routes,  Route} from 'react-router-dom'  //para crear Rutas en el SPA
import { useState } from "react";
//import 'bootstrap/dist/css/bootstrap.min.css'

import './App.css';

import Navigation from './components/Navegacion'
import CreateNote from './components/CreateNote'
import CreateUser from './components/CreateUser'
import NotesList from './components/NotesList'
// import {CloudinaryUploadWidget} from './components/CloudinaryUploadWidget'
import Emprendedores from './components/Emprendedores'
import CreateEmprendedor from './components/CreateEmprendedor'




function App() {

  const [navigationStatus , setNavigationStatus] = useState (false)


  return (
     
      <Router>

     
         <Navigation navigationStatus = {navigationStatus} setNavigationStatus = {setNavigationStatus}/>
        
      
         <div className = "container ">
       
         <Routes>
       
            <Route path="/" element={<NotesList/>}/>
         
            <Route path="/edit/:id" element={<CreateNote/>}/>
         
            <Route path="/create" element={<CreateNote/>}/>
         
            <Route path="/user" element={<CreateUser/>}/>

            <Route path="/emprendedores" element={<Emprendedores setNavigationStatus = {setNavigationStatus}/>}/>

            <Route path="/emprendedores/create" element={<CreateEmprendedor/>}/>

            <Route path="/emprendedores/edit/:id" element={<CreateEmprendedor/>}/>

         </Routes>

         </div>


            

       </Router>
      
  
    
  );
}

export default App;
