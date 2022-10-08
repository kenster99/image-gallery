import React, {useEffect, useState} from 'react'
import { Box, CircularProgress, Fab } from '@mui/material';
import { Check, Save, Edit } from '@mui/icons-material';
import { green } from '@mui/material/colors';

const Actions = ({ params, rowId, setRowId }) => {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async () => {
    
  };

  return (
    <Box
      sx={{m:1,
          position:'relative'
          }}
    >
      { success ? (
        <Fab color='primary'
          sx={{
            width:40,
            height:40,
            bgcolor: green[500],
            '&:hover':{bgcolor: green[700]}
          }}>
            <Check />
        </Fab>) :
        (<Fab color='primary'
          sx={{
            width:40,
            height:40,
          }}
          disabled={params.id !== rowId || loading}
          onClick={handleSubmit}
          >
            <Edit />
        </Fab>)}
    </Box>
    )
}

export default Actions