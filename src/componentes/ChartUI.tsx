import { LineChart } from '@mui/x-charts/LineChart';
import Typography from '@mui/material/Typography';


interface ChartUIProps{

    arrValues1: number[];
    arrValues2: number[];
    arrLabels: string[];
}



export default function ChartUI( props: ChartUIProps) {
   // Slicing para mostrar solo hasta el índice 23 (24 elementos)
   const values1 = props.arrValues1.slice(0, 24);
   const values2 = props.arrValues2.slice(0, 24);
   const labels = props.arrLabels.slice(0, 24);
   return (
      <>
         <Typography variant="h5" component="div">
            Chart Tiempo vs Temperatura 2 (°C) & Velocidad del viento 10m (km/h)
         </Typography>
         <LineChart
            height={300}
            series={[
               { data: values1, label: 'temperature 2m'},
               { data: values2, label: 'wind speed 10m'},
            ]}
            xAxis={[{ scaleType: 'point', data: labels }]}
         />
      </>
   );
}