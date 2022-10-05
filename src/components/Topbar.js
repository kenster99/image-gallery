import React from 'react'
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import { useAuthenticator } from '@aws-amplify/ui-react';

const Topbar = () => {
  const { user, signOut } = useAuthenticator((context) => [context.user]);

  return (
    <div className='Topbar'>Topbar {user.attributes.email}</div>
  )
}

export default Topbar