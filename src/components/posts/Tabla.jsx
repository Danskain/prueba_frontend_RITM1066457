import React, { useEffect, useState } from 'react'
import useAxiosFetch from '../../hooks/useAxiosFetch'
import { Box, Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

const Tabla = () => {
    const { isLoading, isError, data } = useAxiosFetch('https://jsonplaceholder.typicode.com/posts');
    const [rows, setRows] = useState([]) 

    useEffect(() => {
      if(data !== null) {
        setRows(data)
      }  
    }, [data])
    

    const handleDelete = (id) => {
      console.log(`Delete item with id: ${id}`);
    };
  
    const handleModify = (id) => {
      console.log(`Modify item with id: ${id}`);
    };

    const columns = [
      { field: 'id', headerName: 'ID', width: 60 },
      {
        field: 'userId',
        headerName: 'Usuario ID',
        width: 90,
        editable: true,
      },
      {
        field: 'title',
        headerName: 'Titulo',
        width: 350,
        editable: true,
      },
      {
        field: 'body',
        headerName: 'Nombre',
        width: 350,
        editable: true,
      },
      {
        field: 'actions',
        headerName: 'Acciones',
        width: 200,
        renderCell: (rowData) => (
          <>
            <Button onClick={() => handleModify(rowData.id)}>Modify</Button>
            <Button onClick={() => handleDelete(rowData.id)}>Delete</Button>
          </>
        ),
      },
    ];

    /* console.log(data, 'es una hp perra');
    console.log(isLoading, 'es una hp perra');
    console.log(isError, 'es una hp perra'); */

    return (
        <Box sx={{ height: 400, width: '100%' }}>
            <DataGrid
                rows={rows}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[10]}
                checkboxSelection
                disableSelectionOnClick
                experimentalFeatures={{ newEditingApi: true }}
            />
        </Box>
    );
}

export default Tabla