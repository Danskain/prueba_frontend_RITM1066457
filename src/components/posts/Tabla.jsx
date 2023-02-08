import React, { useEffect, useState } from 'react'
import useAxiosFetch from '../../hooks/useAxiosFetch'
import { Box, Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import ModalPosyModificar from './ModalPosyModificar';
import Swal from 'sweetalert2';
import axios from "axios";

const Tabla = () => {
    const { isLoading, isError, data } = useAxiosFetch('https://jsonplaceholder.typicode.com/posts');
    const [rows, setRows] = useState([])
    const [objmodificar, setObjmodificar] = useState({}) 
    const [open, setOpen] = useState(false);

    useEffect(() => {
      if(data !== null) {
        setRows(data)
      }  
    }, [data])

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    

    /* const handleDelete = (id) => {
      console.log(`Delete item with id: ${id}`);
    }; */

    const handleDelete = async (id) => {

      Swal.fire({
          title: `Estás seguro de eliminar el Post?`,
          text: "Esta acción no se puede deshacer!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          cancelButtonText: 'Cancelar',
          confirmButtonText: 'Sí, Eliminarlo!'
        }).then((result) => {
          if (result.isConfirmed) {
              
              axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`).then((response) => {
                  console.log(response);
                  if (response.status === 200) {
                      Swal.fire(
                          'Eliminado!',
                          `Se eliminó con éxito el post!`,
                          'success'
                      )
                      //setUpdateList(!updateList)
                  }else {
                      Swal.fire(
                          'Error!',
                          'Hubo un problema al elminar el post!',
                          'error'
                      )
                  }
              })
          }
        })
    }
  
    const handleModify = async (id) => {
      const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`)
      const {data} = response;
      console.log(data);
      setObjmodificar(data)
      handleOpen();
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
            <ModalPosyModificar
              objmodificar={objmodificar}
              open={open}
              handleClose={handleClose}
            />
        </Box>
    );
}

export default Tabla