import './App.css'
import HeaderUI from './componentes/HeaderUI';
import AlertUI from './componentes/AlertUI';
import { Grid, type SelectChangeEvent } from '@mui/material';
import SelectorUI from './componentes/SelectorUI';
import IndicatorUI from './componentes/IndicatorUI';
import DataFetcher from './functions/DataFetcher';
import TableUI from './componentes/TableUI';
import ChartUI from './componentes/ChartUI';
import { useState } from 'react';
import CohereAssitant from './functions/CohereAssitant';

function App() {
  const [cityInput, setCityInput] = useState<string>("");
  const handleChange = (event: SelectChangeEvent<string>) => {
          setCityInput(event.target.value)
  };
  const dataFetcherOutput = DataFetcher(cityInput);
  CohereAssitant(dataFetcherOutput, cityInput);

  return (
    <Grid container spacing={5} justifyContent="center" alignItems="center">
      <Grid size={{ xs: 12, md: 12 }}>
        <HeaderUI />
      </Grid>


      <Grid size={{ xs: 12, md: 12 }} container justifyContent="right" alignItems="center">


        <AlertUI description="No se preveen lluvias" />
      </Grid>


      <Grid size={{ xs: 12, md: 3 }}>
        <SelectorUI cityInput={cityInput} handleChange={handleChange}/>
      </Grid>


      <Grid container size={{ xs: 12, md: 9 }}>

        {/* Renderizado condicional de los datos obtenidos */}

        {dataFetcherOutput.loading && <p>Cargando datos...</p>}
        {dataFetcherOutput.error && <p>Error: {dataFetcherOutput.error}</p>}
        {dataFetcherOutput.data && (
          <>

            {/* Indicadores con datos obtenidos */}

            <Grid size={{ xs: 12, md: 3 }} >
              <IndicatorUI
                title='Temperatura (2m)'
                description={dataFetcherOutput.data.current.temperature_2m + " " + dataFetcherOutput.data.current_units.temperature_2m} />
            </Grid>

            <Grid size={{ xs: 12, md: 3 }}>
              <IndicatorUI
                title='Temperatura aparente'
                description={dataFetcherOutput.data.current.apparent_temperature + " " + dataFetcherOutput.data.current_units.apparent_temperature} />
            </Grid>

            <Grid size={{ xs: 12, md: 3 }}>
              <IndicatorUI
                title='Velocidad del viento'
                description={dataFetcherOutput.data.current.wind_speed_10m + " " + dataFetcherOutput.data.current_units.wind_speed_10m} />
            </Grid>

            <Grid size={{ xs: 12, md: 3 }}>
              <IndicatorUI
                title='Humedad relativa'
                description={dataFetcherOutput.data.current.relative_humidity_2m + " " + dataFetcherOutput.data.current_units.relative_humidity_2m} />
            </Grid>

          </>
        )}
      </Grid>

      {/* Gráfico */}
      <Grid container size={{ xs: 12, md: 6 }} sx={{ display: { xs: "none", md: "block" } }}>
        {dataFetcherOutput.loading && <p>Cargando datos...</p>}
        {dataFetcherOutput.error && <p>Error: {dataFetcherOutput.error}</p>}
        {dataFetcherOutput.data && (
          <>

            <ChartUI
              arrValues1={dataFetcherOutput.data.hourly.temperature_2m}
              arrValues2={dataFetcherOutput.data.hourly.wind_speed_10m}
              arrLabels={dataFetcherOutput.data.hourly.time} />

          </>)}

      </Grid>

      {/* Tabla */}
      <Grid size={{ xs: 12, md: 6 }} sx={{ display: { xs: "none", md: "block" } }}>
        {dataFetcherOutput.loading && <p>Cargando datos...</p>}
        {dataFetcherOutput.error && <p>Error: {dataFetcherOutput.error}</p>}
        {dataFetcherOutput.data && (
          <>

            <TableUI
              arrValues1={dataFetcherOutput.data.hourly.temperature_2m}
              arrValues2={dataFetcherOutput.data.hourly.wind_speed_10m}
              arrLabels={dataFetcherOutput.data.hourly.time} />

          </>)}
      </Grid>


      <Grid size={{ xs: 12, md: 12 }}>Elemento: Información adicional</Grid>

      

    </Grid>

  );
}

export default App
