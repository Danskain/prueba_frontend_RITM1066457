import React from 'react'
import { Container, Grid, Button } from '@mui/material';
import Tabla from './Tabla';
import ModalPost from './ModalPost';

const Index = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Container>
      <Grid container>
        <Grid item xs={12} alignItems="center" justifyContent="center">
          <Button variant="contained" onClick={handleOpen}>Nuevo Post</Button>
          <Tabla />
          <ModalPost
            open={open}
            handleClose={handleClose}
          />
        </Grid>
      </Grid>
    </Container>
  )
}

export default Index