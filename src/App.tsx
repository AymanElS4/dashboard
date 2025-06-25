
import './App.css'
import HeaderUI from './componentes/HeaderUI';
import AlertUI from './componentes/AlertUI';
import { Grid } from '@mui/material';
import SelectorUI from './componentes/SelectorUI';

function App() {
  

  return (
    <Grid container spacing={5} justifyContent="center" alignItems="center">
        <Grid size={{ xs: 12, md: 12 }}>
          <HeaderUI/>
          Elemento: Encabezado</Grid>

         
        <Grid size={{ xs: 12, md: 12 }} container justifyContent="right" alignItems="center">
           

            <AlertUI description="No se preveen lluvias"/>
          Elemento: Alertas</Grid>

         
        <Grid size={{ xs: 12, md: 3  }}>
         <SelectorUI/>
          Elemento: Selector</Grid>

        
        <Grid size={{ xs: 12, md: 9 }}>Elemento: Indicadores</Grid>

        
        <Grid size={{ xs: 12, md: 6 }} sx={{ display: { xs: "none", md: "block"} }}>Elemento: Gráfico</Grid>

         
        <Grid size={{ xs: 12, md: 6 }} sx={{ display: { xs: "none", md: "block" } }}>Elemento: Tabla</Grid>

         
        <Grid size={{ xs: 12, md: 12 }}>Elemento: Información adicional</Grid>

    </Grid>
    
  );
}

export default App
