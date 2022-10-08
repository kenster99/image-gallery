import React from 'react'
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import { useAuthenticator } from '@aws-amplify/ui-react';
import { Typography, Toolbar, Box, Button } from '@mui/material';
import { Logout } from '@mui/icons-material';
import { Link } from 'react-router-dom';

const Topbar = () => {
  const { user, signOut } = useAuthenticator((context) => [context.user]);

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
                  sx={{ my: 2, color: 'white', display: 'block' }}>
                  <Link to="/uploadImage" style={{ textDecoration: 'none', color: 'white'}}>UPLOAD</Link>
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
    </div>
    
  )
}

export default Topbar