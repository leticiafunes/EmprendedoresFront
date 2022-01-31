import axios from "axios";
import React, { useState, useEffect } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { useParams, useNavigate } from "react-router-dom"; //hook
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import "./CreateEmprendedor.css";

export default function CreateEmprendedor(props) {
  const [edit, setEdit] = useState({ editing: false, id: "" });
  const [mensaje, setMensaje] = useState("");

  const [emprendedor, setEmprendedor] = useState({
    nombre: "",
    activo: true,
    tags: [],
    resena: "",
    telefono: "",
    mail: "",
    redes: [{ nombre: "Red", link: "Sin redes", icono: " " }],
    imagen: "",
    nombre_emprendimiento: "",
    rubro: "",
    descripcioncorta: "",
  });

  const navigate = useNavigate();

  const { id } = useParams(); //Para ver que emprendedor tengo que editar

  useEffect(() => {
    const obtenerDatos = async () => {
      if (id) {
        const res = await axios.get(
          process.env.REACT_APP_INITIAL_PATH + "/api/emprendedores/" + id
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
            rubro: new_emprendedor.rubro,
            descripcioncorta: new_emprendedor.descripcioncorta,
          });

          setEdit({ ...edit, editing: true, _id: id });
        }
      }
    };

    obtenerDatos();
  });

  const updateEmprendedor = (e) => {
    setEmprendedor({ ...emprendedor, [e.target.name]: e.target.value });
  };

  const updateEmprendedorActivo = (e) => {
    setEmprendedor({ ...emprendedor, [e.target.name]: e.target.checked });
  };

  const cambiarMensaje = (mensaje) => {
    setMensaje(mensaje);
  };

  const mostrarMensaje = () => {
    return <p>{mensaje}</p>;
  };

  const onSubmit = async (e) => {
    e.preventDefault();

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
      rubro: emprendedor.rubro,
      descripcioncorta: emprendedor.descripcioncorta,
    };

    if (edit.editing) {
      try {
        await axios.put(
          process.env.REACT_APP_INITIAL_PATH + "/api/emprendedores/" + edit._id,
          updateEmprendedor
        );
        volverEmprendedores();
      } catch (err) {
        cambiarMensaje("No se pudo crear el Emprendedor: ", err);
      }
    } else {
      try {
        await axios.post(
          process.env.REACT_APP_INITIAL_PATH + "/api/emprendedores/",
          updateEmprendedor
        );
        volverEmprendedores();
      } catch (err) {
        cambiarMensaje("No se pudo grabar el Emprendedor: ", err);
      }
    }
  };

  const openWidget = () => {
    var myWidget = window.cloudinary.createUploadWidget(
      {
        cloudName: process.env.REACT_APP_CLOUDINARY_CLOUDNAME,
        uploadPreset: process.env.REACT_APP_CLOUDINARY_UPLOADPRESET,
      },
      (error, result) => {
        if (!error && result && result.event === "success") {
          const imageurl = result.info.secure_url;

          setEmprendedor({ ...emprendedor, imagen: imageurl });
        }
      }
    );

    myWidget.open();
  };

  const onRedChangeNombre = (e) => {
    const newRedes = emprendedor.redes.map((red, index) => {
      if (e.target.name === index.toString()) {
        return { ...red, nombre: e.target.value };
      }
      return red;
    });

    setEmprendedor({ ...emprendedor, redes: newRedes });
  };

  const onRedChangeLink = (e) => {
    const newRedes = emprendedor.redes.map((red, index) => {
      if (e.target.name === index.toString()) {
        return { ...red, link: e.target.value };
      }
      return red;
    });

    setEmprendedor({ ...emprendedor, redes: newRedes });
  };

  const agregarRed = () => {
    const nuevaRed = { nombre: "Nueva Red", link: "Sin Link" };

    const newRedes = [...emprendedor.redes, nuevaRed];

    setEmprendedor({ ...emprendedor, redes: newRedes });
  };

  const borrarRed = (indice) => {
    if (indice > 0) {
      const nuevaRed = emprendedor.redes.filter(
        (red, index) => indice !== index
      );
      setEmprendedor({ ...emprendedor, redes: nuevaRed });
    }
  };

  const volverEmprendedores = () => {
    navigate("/emprendedores");
  };

  return (
    <div>
      {mensaje && <div className="mensajeLogin">{mostrarMensaje()}</div>}
      <form className="formCrearEmprendedor" onSubmit={onSubmit}>
        <div className="tituloCrearEmprendedorContainer">
          <div className="titulo">
            {" "}
            {edit.editing ? (
              <p>Editar Emprendedor</p>
            ) : (
              <p>Nuevo Emprendedor</p>
            )}
          </div>

          <div className="btnVolver">
            <label className="col-sm-6 col-form-label oscuro">Volver</label>

            <button
              type="button"
              className="icono "
              onClick={volverEmprendedores}
            >
              <i className="fas fa-arrow-right"></i>
            </button>
          </div>
        </div>

        <div className="row mb-3">
          <label htmlFor="nombre_id" className="col-sm-2 col-form-label oscuro">
            Nombre
          </label>

          <div className="col-sm-10">
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
        </div>

        <div className="row mb-3">
          <label htmlFor="nombre_id" className="col-sm-2 col-form-label oscuro">
            Empresa
          </label>

          <div className="col-sm-10">
            <input
              type="text"
              className="form-control"
              placeholder="Nombre del emprendimiento"
              name="nombre_emprendimiento"
              onChange={updateEmprendedor}
              value={emprendedor.nombre_emprendimiento}
              required
            />
          </div>
        </div>

        <div className="row mb-3">
          <label htmlFor="nombre_id" className="col-sm-2 col-form-label oscuro">
            Rubro
          </label>

          <div className="col-sm-10">
            <input
              type="text"
              className="form-control"
              placeholder="Rubro del emprendimiento"
              name="rubro"
              onChange={updateEmprendedor}
              value={emprendedor.rubro}
              required
            />
          </div>
        </div>

        <div className="row mb-3">
          <label htmlFor="nombre_id" className="col-sm-2 col-form-label oscuro">
            Descripción
          </label>

          <div className="col-sm-10">
            <input
              type="text"
              className="form-control"
              placeholder="Descripción Corta"
              name="descripcioncorta"
              onChange={updateEmprendedor}
              value={emprendedor.descripcioncorta}
              required
            />
          </div>
        </div>

        <div className="row mb-3">
          <label htmlFor="nombre_id" className="col-sm-2 col-form-label oscuro">
            Reseña
          </label>

          <div className="col-sm-10">
            <textarea
              name="resena"
              className="form-control"
              placeholder="Reseña del emprendimiento"
              onChange={updateEmprendedor}
              value={emprendedor.resena}
              required
            />
          </div>
        </div>

        <div className="mb-3">
          <div className="form-check form-switch">
            <input
              className="form-check-input"
              type="checkbox"
              placeholder="Activo"
              name="activo"
              onChange={updateEmprendedorActivo}
              value={emprendedor.activo}
              required
              id="activo"
              checked={emprendedor.activo}
            />
            <label className="form-check-label oscuro" htmlFor="activo">
              Activo
            </label>
          </div>
        </div>

        <div className="row mb-3">
          <label htmlFor="nombre_id" className="col-sm-2 col-form-label oscuro">
            Tags
          </label>

          <div className="col-sm-10">
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
        </div>

        <div className="row mb-3">
          <label htmlFor="nombre_id" className="col-sm-2 col-form-label oscuro">
            Teléfono
          </label>

          <div className="col-sm-10">
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
        </div>

        <div className="row mb-3">
          <label htmlFor="nombre_id" className="col-sm-2 col-form-label oscuro">
            Mail
          </label>

          <div className="col-sm-10">
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
        </div>

        <div className="row mb-3">
          <div className="col-sm-2">
            <label
              htmlFor="nombre_id"
              className="col-sm-6 col-form-label oscuro"
            >
              Logo
            </label>

            <button type="button" className="icono " onClick={openWidget}>
              <FontAwesomeIcon icon={faSearch} />
            </button>
          </div>

          <div className="col-sm-10">
            <input
              type="text"
              className="form-control"
              placeholder="Logo del Emprendimiento"
              name="imagen"
              onChange={updateEmprendedor}
              value={emprendedor.imagen}
              required
            />
          </div>
        </div>

        {emprendedor.redes &&
          emprendedor.redes.map((red, indice) => (
            <div className="row mb-3" key={indice}>
              {indice === 0 && (
                <div className="col-sm-2">
                  <label
                    htmlFor="nombre_id"
                    className="col-sm-6 col-form-label oscuro"
                  >
                    Redes
                  </label>

                  <button type="button" onClick={agregarRed} className="icono">
                    <i className="fas fa-plus"></i>
                  </button>
                </div>
              )}

              {indice > 0 && (
                <div className="col-sm-2">
                  <label
                    htmlFor="nombre_id"
                    className="col-sm-6 col-form-label"
                  ></label>

                  <button onClick={agregarRed} type="button"></button>
                </div>
              )}

              <div className="col-sm-10">
                <div className="row mb-3">
                  <div className="col-sm-1">
                    <button
                      className="icono"
                      type="button"
                      onClick={() => borrarRed(indice)}
                    >
                      <i className="fas fa-times"></i>
                    </button>
                  </div>

                  <div className="col-sm-3">
                    <select
                      className="form-control"
                      name={indice}
                      value={emprendedor.redes[indice].nombre}
                      onChange={onRedChangeNombre}
                      required
                    >
                      <option value="Red" name="red">
                        {" "}
                        Red{" "}
                      </option>
                      <option value="Web" name="web">
                        {" "}
                        Web{" "}
                      </option>
                      <option value="Facebook" name="facebook">
                        {" "}
                        Facebook{" "}
                      </option>
                      <option value="Instagram" name="instagram">
                        {" "}
                        Instagram{" "}
                      </option>
                      <option value="Twiter" name="twiter">
                        {" "}
                        Twiter{" "}
                      </option>
                      <option value="Otro" name="otro">
                        {" "}
                        Otro{" "}
                      </option>
                    </select>
                  </div>

                  <div className="col-sm-8">
                    <input
                      type="text"
                      className="form-control "
                      placeholder="Redes"
                      name={indice}
                      onChange={onRedChangeLink}
                      value={emprendedor.redes[indice].link}
                      required
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}

        <div className="grabarEmprendedorContainer">
          <button type="submit" className="grabarEmprendedor">
            Guardar
          </button>
          <button
            type="button"
            className="cancelarEmprendedor"
            onClick={volverEmprendedores}
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}
