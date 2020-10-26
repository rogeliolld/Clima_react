import React, {useState} from "react";
import Error from './Error';
import PropTypes from 'prop-types';

const Formulario = ({busqueda, guardarBusqueda, guardarConsulta}) => {
    

    //Extraer ciudad y pais
    const {ciudad, pais} = busqueda;

    //funcion que coloca los datos en el state
    const handleChange = e =>{
        guardarBusqueda({
            ...busqueda,
            [e.target.name] : e.target.value
        });
        
    }

    const [error, guardarError] = useState(false);

    //funcion del submit
    const handleSubmit = e =>{
        e.preventDefault();

        if(ciudad.trim()==='' || pais.trim()===''){
            guardarError(true)
            
            return;
        }
        guardarError(false);
        guardarConsulta(true);
    }
  return (
    <form
        onSubmit={handleSubmit}
    >
        {error ? <Error mensaje="Los campos son obligatorios"/>: null}
      <div className="input-field col s12">
        <input 
            type="text" 
            name="ciudad" 
            id="ciudad" 
            onChange={handleChange}
            />
        <label htmlFor="ciudad">Ciudad:</label>
      </div>
      <div className="input-field col s12">
        <select 
            name="pais"
            id="pais"
            onChange={handleChange}
        >
          <option>-- Seleccione un país --</option>
          <option value="US">Estados Unidos</option>
          <option value="MX">México</option>
          <option value="AR">Argentina</option>
          <option value="CO">Colombia</option>
          <option value="CR">Costa Rica</option>
          <option value="ES">España</option>
          <option value="PE">Perú</option>
        </select>
      </div>
      <div className="input-field col s12">
          <input
            type="submit"
            value="Buscar Clima"
            className="waves-effect waves-light btn-large btn-block yellow accent-4"
          />

      </div>
    </form>
  );
};

Formulario.protoTypes = {
  busqueda: PropTypes.object.isRequired,
  guardarBusqueda: PropTypes.func.isRequired,
  guardarConsulta: PropTypes.func.isRequired

}
export default Formulario;
