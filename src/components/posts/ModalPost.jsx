import React, { useEffect, useState } from 'react'
import { Box, Modal, Typography, TextField, InputLabel, MenuItem, FormControl, Select, Button } from '@mui/material';
import useAxiosFetch from '../../hooks/useAxiosFetch'
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import axios from "axios";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const ModalPost = ({open, handleClose}) => {
  const { isLoading, isError, data } = useAxiosFetch('https://jsonplaceholder.typicode.com/users');
  const { register, handleSubmit, formState: {errors}, reset } = useForm();
  const [users, setUsers] = useState([]) 

    useEffect(() => {
      if(data !== null) {
        setUsers(data)
      }  
    }, [data])

    const customSubmit = async (datas) => {
    
      const objRequest = JSON.stringify({
        title: datas.title,
        body: datas.body,
        userId: datas.userId,
      });

      const headers = {
        'Content-type': 'application/json; charset=UTF-8',
      };
    
      const response = await axios.post(`https://jsonplaceholder.typicode.com/posts`, objRequest, headers)

      const { status, data } = response;

      if (status === 201) {
        console.log(data);
        Swal.fire(
          'Guardado!',
          `El Post ${data.id} ha sido guardado exitosamente!`,
          'success'
        )
        handleClose();
        reset();
      }else {
          Swal.fire(
              'Error!',
              'Hubo un problema al guardar el post!',
              'error'
          )
      }
    }
  
  return (
    <div>
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
            {/* <Typography id="modal-modal-title" variant="h6" component="h2">
                Text in a modal
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            </Typography> */}
                <form onSubmit={handleSubmit(customSubmit)}>
                    <TextField id="outlined-basic" label="Titulo" variant="outlined" {...register('title', { required:true })} />
                    {errors.titulo && <small style={{color:'red'}} >el campo no puede estar vacío</small>}
                    <TextField id="outlined-basic" label="Body" variant="outlined" {...register('body', { required:true })} />
                    {errors.body && <small style={{color:'red'}} >el campo no puede estar vacío</small>}
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Usuario</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            //value={age}
                            label="Usuario"
                            {...register('userId', { required:true })}
                            //onChange={handleChange}
                        >
                            {
                                users.map((val) => (
                                  <MenuItem key={val.id} value={val.id}>
                                    {val.name}
                                  </MenuItem>
                                ))
                            }
                        </Select>
                    </FormControl>
                    {errors.usuario && <small style={{color:'red'}} >el campo no puede estar vacío</small>}
                    <Button variant="contained" type="submit" >Guardar Post</Button>
                </form>
            </Box>
        </Modal>
    </div>
  )
}

export default ModalPost