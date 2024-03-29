import React, { useState } from "react";
import axios from "axios";
import { DatePicker, Button, Card ,Badge} from "@tremor/react";
import { es } from "date-fns/locale";
import { RiSearch2Line } from '@remixicon/react';

function CardsCajeros() {
  const [fecIni, setFecIni] = useState(null);
  const [fecFin, setFecFin] = useState(null);
  const [pagos, setPagos] = useState([]);

  const handleClickSearch = async () => {
    // Formatear las fechas para la solicitud HTTP
    const fechaInicial = fecIni.toISOString().split('T')[0];
    const fechaFinal = fecFin.toISOString().split('T')[0];
 

    // Realizar la solicitud HTTP al servidor con las fechas seleccionadas
    try {
      const response = await axios.get(`https://mun-pucu-dash.up.railway.app/pagos/${fechaInicial}/${fechaFinal}`);
      
      setPagos(response.data); // Actualizar el estado con los datos recibidos
    } catch (error) {
      
    }
  };

  return (
    <>
      <div className="flex flex-col mb-8">
        <DatePicker
          selected={fecIni}
          onValueChange={date => setFecIni(date)} 
          className="mx-auto w-56"
          placeholder="FECHA DE INICIO"
          locale={es}
        />
        <DatePicker
          selected={fecFin}
          onValueChange={date => setFecFin(date)} 
          className="mx-auto w-56 mb-1"
          placeholder="FECHA DE TERMINO"
          locale={es}
        />
        <div className="flex justify-center ">
          <Button variant="secondary" icon={RiSearch2Line} onClick={handleClickSearch}>
            Buscar
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {pagos.map((item,index) => (
          <Card
            key={index}
            className="mx-auto max-w-sm"
            decoration="top"
            decorationColor="blue"
          >
            <p className="text-tremor-default font-medium text-tremor-content dark:text-dark-tremor-content">
              {item.cajero}
            </p>
            <div className="mt-2 flex items-baseline space-x-2.5">
              <p className="text-tremor-metric font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong">
              <Badge color="teal" className="text-xl" > 
              S/. {parseFloat(item.total).toLocaleString('es-PE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </Badge>
              </p>
            </div>
          </Card>
        ))}
      </div>
    </>
  );
}

export default CardsCajeros;
