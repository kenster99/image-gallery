import React from 'react'
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import { useAuthenticator } from '@aws-amplify/ui-react';
import { Typography, Toolbar, Box, Button } from '@mui/material';
import { Logout } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import Modal from '@mui/material/Modal';
import UploadImage from './UploadImage';

const Topbar = () => {
  const { user, signOut } = useAuthenticator((context) => [context.user]);
  const [open, setOpen] = React.useState(false);
  const openModal = () => setOpen(true);
  const closeModal = () => {
    setOpen(false);
    window.location.reload();
  }

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
  
  return (
    <div className='Topbar'>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              AIDDIA
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              <Typography variant="h6" component="div" >
                <Button
                  sx={{ my: 2, color: 'white', display: 'block' }}
                  onClick={openModal}>
                    UPLOAD
                  {/* <Link to="/uploadImage" style={{ textDecoration: 'none', color: 'white'}}>UPLOAD</Link> */}
                </Button>     
              </Typography>
              <Typography variant="h6" component="div" >
                <Button
                  sx={{ my: 2, color: 'white', display: 'block' }}>
                  <Link to="/catalog" style={{ textDecoration: 'none', color: 'white'}}>CATALOG</Link>
                </Button>
                           
              </Typography>

            </Box>    
            <Logout onClick={signOut} align="right" />
        </Toolbar>
      </AppBar>
      <Modal
        open={open}
        onClose={closeModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
            <UploadImage />
        </Box>
      </Modal>      
    </div>
    
  )
}

export default Topbar