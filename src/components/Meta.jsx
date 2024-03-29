import {
  Card,
  ProgressCircle,
  } from "@tremor/react";

import React, { useEffect, useState } from "react";

import axios from "axios";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
function Meta() {
  const [met, setMet] = useState([]);
  const [countdown, setCountdown] = useState(60); // Contador para la próxima actualización en segundos (1 minuto)
 
  useEffect(() => {
    const fetchDataAndSetInterval = async () => {
      try {
        const response = await axios.get("https://mun-pucu-dash.up.railway.app/meta");
        setMet(response.data);
        setCountdown(60); // Reinicia el contador a 60 segundos después de actualizar los datos
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    // Llama a fetchDataAndSetInterval cuando el componente se monta por primera vez
    fetchDataAndSetInterval();

    // Configura el intervalo para actualizar los datos cada minuto
    const intervalId = setInterval(() => {
      fetchDataAndSetInterval(); // Llama a la función de actualización cada vez que el contador llegue a cero
    }, 60 * 1000); // 1 minuto

    // Limpia el intervalo cuando el componente se desmonta
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    // Segundo efecto secundario para actualizar el contador
    const timer = setInterval(() => {
      setCountdown((prevCountdown) => {
        // Reducir el contador cada segundo
        if (prevCountdown > 0) {
          return prevCountdown - 1;
        } else {
          // Si el contador llega a cero, no realizar ninguna acción aquí
          return 0;
        }
      });
    }, 1000); // Ejecutar cada segundo

    return () => clearInterval(timer); // Limpia el intervalo cuando el componente se desmonta
  }, []);

  // Convertir el contador a minutos y segundos
  const minutes = Math.floor(countdown / 60);
  const seconds = countdown % 60;

  return (
    <>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-3">
        {met.length > 0 && (
          <Card   >
            <div className="flex items-center justify-between">
              <p className="text-tremor-default font-medium text-tremor-content dark:text-dark-tremor-content">
                META
              </p>{" "}
              <br />
            </div>
            <p className="text-tremor-metric font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong">
              S/.{" "}
              {parseFloat(met[0].totalemision).toLocaleString("es-PE", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </p>
          </Card>
        )}
        {met.map((item,index) => (
          <Card   key={index}>
            <div className="flex items-center justify-between">
              <p className="text-tremor-default font-medium text-tremor-content dark:text-dark-tremor-content">
                UMBRAL: {item.tipo}
              </p>
              <span className="bg-emerald-100 text-emerald-800 ring-emerald-600/10 dark:bg-emerald-400/10 dark:text-emerald-500 dark:ring-emerald-400/20 inline-flex items-center rounded-tremor-small px-2 py-1  font-medium ring-1 ring-inset text-2xl">
                %{item.pormeta}
              </span>
            </div>
            <p className="text-tremor-metric font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong">
              S/.{" "}
              {parseFloat(item.totalmeta).toLocaleString("es-PE", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </p>
          </Card>
        ))}
      </div>
    
      <div   className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-4 ">  
      {met.map((item,index) => (
          <div  className="space-y-3" key={index}>
            <Card  key='a' className="mx-auto max-w-sm">
              <div className="flex justify-start space-x-5 items-center">
                <ProgressCircle value={item.porrecaudacion} size="lg"  color={item.porrecaudacion > 50 ? 'green' : 'red'}>
                  <span className="text-sm font-medium text-slate-700">
                    %{item.porrecaudacion}
                  </span>
                </ProgressCircle>
                <div>
                  <p className="text-tremor-default text-tremor-content-strong dark:text-dark-tremor-content-strong font-medium">
                    S/.{" "}
                    {parseFloat(item.totalrecaudacion).toLocaleString("es-PE", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </p>
                  <p className="text-tremor-default text-tremor-content dark:text-dark-tremor-content">
                    RECAUDACION UMBRAL {item.tipo}
                  </p>
                </div>
              </div>
            </Card>
          </div>
        ))}
        {met.map((item,index) => (
          <div className="space-y-3 " key={index + "faltante"}>
            <Card  className="mx-auto max-w-sm">
              <div className="flex justify-start space-x-5 items-center">
                <ProgressCircle value={item.porfaltante}  size="lg"   color={item.porfaltante > 50 ? 'green' : 'red'}>
                  <span className="text-sm font-medium text-slate-700">
                    %{item.porfaltante}
                  </span>
                </ProgressCircle>
                <div>
                  <p className="text-tremor-default text-tremor-content-strong dark:text-dark-tremor-content-strong font-medium">
                    S/.{" "}
                    {parseFloat(item.totalfaltante).toLocaleString("es-PE", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </p>
                  <p className="text-tremor-default text-tremor-content dark:text-dark-tremor-content ">
                    SALDO UMBRAL {item.tipo}
                  </p>
                </div>
              </div>
            </Card>
          </div>
        ))}
        </div>
        <div >
        {met.length > 0 && (
          <div  className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-3">
           <center><div className= "w-[300px] rounded-lg flex px-50  bg-white p-1 text-black font-black" >ULTIMA ACTUALIZACION: {met[0].fecactualizacion}</div></center> 
           <div className="fixed bottom-0 right-0 mb-2 mr-4">Próxima actualización en: {seconds} seg</div>
          </div>
        )}
      </div>
    </>
  );
}
export default Meta;
