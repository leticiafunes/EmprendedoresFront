import React from 'react'
import {BrowserRouter as Router, Routes,  Route} from 'react-router-dom'  //para crear Rutas en el SPA

//import 'bootstrap/dist/css/bootstrap.min.css'

import './App.css';

import Navigation from './components/Navigation'
import CreateNote from './components/CreateNote'
import CreateUser from './components/CreateUser'
import NotesList from './components/NotesList'
import UploadImage from './components/UploadImage'
import Emprendedores from './components/Emprendedores'
import CreateEmprendedor from './components/CreateEmprendedor'

function App() {
  return (
     
      <Router>
      
         <Navigation />
        
      
         <div className = "container p-4">
       
         <Routes>
       
            <Route path="/" element={<NotesList/>}/>
         
            <Route path="/edit/:id" element={<CreateNote/>}/>
         
            <Route path="/create" element={<CreateNote/>}/>
         
            <Route path="/user" element={<CreateUser/>}/>

            <Route path="/uploadImage" element={<UploadImage/>}/>

            <Route path="/emprendedores" element={<Emprendedores/>}/>

            <Route path="/emprendedores/create" element={<CreateEmprendedor/>}/>

            <Route path="/emprendedores/edit/:id" element={<CreateEmprendedor/>}/>

         </Routes>

         </div>


            

       </Router>
      
  
    
  );
}

export default App;
