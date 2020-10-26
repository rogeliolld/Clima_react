import React, {Fragment, useState, useEffect} from 'react';
import Header from './component/Header';
import Formulario from './component/Formulario';
import Clima from './component/Clima';
import Error from './component/Error';


function App() {
  //state del formulario
  const [busqueda, guardarBusqueda] = useState({
    ciudad:'',
    pais: ''
});

 //Extraer ciudad y pais
 const {ciudad, pais} = busqueda;

const [consulta, guardarConsulta] = useState(false);
const [resultado, guardarResultado] = useState({});
const [error, guardarError] = useState(false);


useEffect(() => {
  const consultarAPI = async () => {

      if(consulta) {
        const appId = 'a414a4c37166542463934bf29c838742';
        const url = `http://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`;

        const respuesta = await fetch(url);
        const resultado = await respuesta.json();

        guardarResultado(resultado);
        guardarConsulta(false);

        // Detecta si hubo resultados correctos en la consulta

        if(resultado.cod === "404") {
            guardarError(true);
        } else {
            guardarError(false);
        }
      }
      
  }
  consultarAPI();
  // eslint-disable-next-line
},[consulta]);

let componente;

if(error){
  componente= <Error mensaje="No hay Resultado"/>
}else{
  componente = <Clima resultado={resultado} />
}

  return (
    <Fragment>
      <Header
        titulo='Clima React App '
      />
      <div className="contenedor-form">
        <div className="container">
          <div className="row">
            <div className="col m6 s12">
              <Formulario
                busqueda={busqueda}
                guardarBusqueda={guardarBusqueda}
                guardarConsulta={guardarConsulta}
              />
            </div>
            <div className="col m6 s12">
              {componente}
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
