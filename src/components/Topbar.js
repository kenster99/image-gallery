import React, { useState } from 'react'
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import { useAuthenticator } from '@aws-amplify/ui-react';
import { Typography, Toolbar, Box } from '@mui/material';
import { Logout } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import Modal from '@mui/material/Modal';
import UploadImage from './UploadImage';
import UploadDialog from './UploadDialog';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { Storage, API, graphqlOperation } from 'aws-amplify';
import { createImage } from '../graphql/mutations';
import awsmobile from "../aws-exports"

const Topbar = () => {
  const { user, signOut } = useAuthenticator((context) => [context.user]);
  const [open, setOpen] = useState(false)

  async function addImageToDB (image) {
      console.log('add image to DB')
      try {
          await API.graphql(graphqlOperation(createImage, {input: image}));
      } catch (error) {
          console.log(error)
      }
  }

  function onChange(e) {
      const file = e.target.files[0];
      console.log(file);

      Storage.put(file.name, file, {
          contentType: file.type
      }).then (() => {
          // setFileUrl(URL.createObjectURL(file))
          const image = {
              name: file.name,
              file: {
                  bucket: awsmobile.aws_user_files_s3_bucket,
                  region: awsmobile.aws_user_files_s3_bucket_region,
                  key: 'public/' + file.name
              }
          }
          console.log(image)
          addImageToDB(image);
          console.log("added complete")
      })
  }

  const openModal = () => setOpen(true);
  const closeDialog = () => {
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
      {/* <Modal
        open={open}
        onClose={closeModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
            <UploadImage />
        </Box>
      </Modal>       */}
        <Dialog aria-labelledby='dialog-title'
            open={open}
            onClose={ () => setOpen(false) }
            aria-describedby='dialog-description'
            >
            <DialogTitle id='dialog-title'>File Upload</DialogTitle>
            <DialogContent>
                <p>Select an image to upload</p>
                <input type="file" onChange={onChange} />
            </DialogContent>
            <DialogActions>
                <Button onClick={() => setOpen(false) }>Cancel</Button>
                <Button autoFocus onClick={closeDialog}>Submit</Button>
            </DialogActions>
        </Dialog>
    </div>
    
  )
}

export default Topbar