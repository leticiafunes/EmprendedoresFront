import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; //para crear Rutas en el SPA
import { useState } from "react";


import "./App.css";
import Navigation from "./components/Navegacion";
import Users from "./components/Users";
import Emprendedores from "./components/Emprendedores";
import CreateEmprendedor from "./components/CreateEmprendedor";
import Login from "./components/Login";
import NuevoUsuario from "./components/NuevoUsuario";
import { ThemeProvider } from "./context/ThemeContext";
import { LanguageProvider } from "./context/LanguageContext";
import { SessionProvider } from "./context/SessionContext";

function App() {
  const [navigationStatus, setNavigationStatus] = useState(false);


  return (
    <SessionProvider>
    <ThemeProvider>
    <LanguageProvider>
      <Router>
        <Navigation
          navigationStatus={navigationStatus}
          setNavigationStatus={setNavigationStatus}
         
        />

        <div className="contenedor ">
          <Routes>
            <Route path="/" element={<Emprendedores setNavigationStatus={setNavigationStatus} /> } />

            <Route path="/user" element={<Users />} />
            
            <Route path="/login" element={<Login />} />

            <Route
              path="/emprendedores"
              element={
                <Emprendedores setNavigationStatus={setNavigationStatus} />
              }
            />

            <Route
              path="/emprendedores/create"
              element={<CreateEmprendedor />}
            />

            <Route
              path="/emprendedores/edit/:id"
              element={<CreateEmprendedor />}
            />


              <Route
              path="/user/create"
              element={<NuevoUsuario />}
            />

              <Route
              path="/user/edit/:id"
              element={<NuevoUsuario />}
            />


          </Routes>
        </div>



      </Router>
    
    </LanguageProvider>
    </ThemeProvider>
    </SessionProvider>
  );
}

export default App;
