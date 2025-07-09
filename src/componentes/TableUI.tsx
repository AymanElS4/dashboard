import Box from '@mui/material/Box';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';



function combineArrays(arrLabels: Array<string>, arrValues1: Array<number>, arrValues2: Array<number>) {
   return arrLabels.map((label, index) => ({
      id: index,
      label: label,
      value1: arrValues1[index],
      value2: arrValues2[index]
   }));
}

const columns: GridColDef[] = [
   
   {
      field: 'label',
      headerName: 'Hour',
      width: 200,
   },
   {
      field: 'value1',
      headerName: 'Temperature 2m (°C)',
      width: 200,
   },
   {
      field: 'value2',
      headerName: 'Wind Speed 10m (km/h)',
      width: 200,
   },
   
];

interface TableUIprops {
    arrValues1: number[] ;
    arrValues2: number[] ;
    arrLabels: string[] ;

}


export default function TableUI(props: TableUIprops) {
    const values1 = props.arrValues1.slice(0, 24);
    const values2 = props.arrValues2.slice(0, 24);
    const labels = props.arrLabels.slice(0, 24);

   const rows = combineArrays( labels, values1, values2);

   return (
      <Box sx={{ height: 350, width: '100%' }}>
         <DataGrid
            rows={rows}
            columns={columns}
            initialState={{
               pagination: {
                  paginationModel: {
                     pageSize: 5,
                  },
               },
            }}
            pageSizeOptions={[5]}
            disableRowSelectionOnClick
         />
      </Box>
   );
}