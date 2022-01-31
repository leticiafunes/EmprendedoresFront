import React, { useContext } from "react";
import { Link } from "react-router-dom";

import { useState } from "react";
import "./Navegacion.css";

import SessionContext from "../context/SessionContext";
import { useNavigate } from "react-router-dom"; //hook

export default function Navegacion({ navigationStatus, setNavigationStatus }) {
  const [click, setClick] = useState(false);

  const { session, closeSession } = useContext(SessionContext); //Para leer la Session  global

  const navigate = useNavigate();

  const handleClick = () => {
    setClick(!click);
    setNavigationStatus(!click);
  };

  const closeMobileMenu = () => {
    setClick(false);
    setNavigationStatus(false);
  };

  const aLogin = () => {
    closeMobileMenu();
  };

  const loginTitulo = () => {
    if (session.username) {
      return <span>{session.username}</span>;
    } else {
      return <span>Login</span>;
    }
  };

  const volverEmprendedores = () => {
    navigate("/emprendedores");
  };

  return (
    <div className="nav-container">
      <nav className="navbar">
        <div className="navLogoContainer">
          <img
            className="navImagenLogo"
            src={"./images/emprendedoresLogo.png"}
            alt="Emprendedor"
            onClick={volverEmprendedores}
          />
        </div>

        <div
          className={
            click && navigationStatus ? "menu-toggle is-active" : "menu-toggle"
          }
          onClick={handleClick}
          id="mobile-menu"
        >
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>

        <ul
          className={click && navigationStatus ? "nav-menu active" : "nav-menu"}
        >
            {session.username && (
            <li className="item-lista">
              <Link
                className="nav-links"
                to="/user/create"
                onClick={closeMobileMenu}
              >
                {" "}
                Nuevo Usuario{" "}
              </Link>
            </li>
          )}

          {session.username && (
            <li className="item-lista">
              <Link className="nav-links" to="/user" onClick={closeMobileMenu}>
                {" "}
                Usuarios{" "}
              </Link>
            </li>
          )}

    

          {session.username && (
            <li className="item-lista">
              <Link
                className="nav-links"
                to="/emprendedores/create"
                onClick={closeMobileMenu}
              >
                {" "}
                Nuevo Emprendedor{" "}
              </Link>
            </li>
          )}

          <li className="item-lista">
            <Link
              className="nav-links"
              to={{ pathname: "/emprendedores" }}
              onClick={closeMobileMenu}
            >
              Emprendedores{" "}
            </Link>
          </li>

          <li className="item-lista">
            <Link
              className="nav-links"
              to="/login"
              id="logueado"
              onClick={aLogin}
            >
              {" "}
              {loginTitulo()}
              {session.username && (
                <ul id="listaSalir">
                  <li onClick={closeSession}>Salir</li>
                </ul>
              )}
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
