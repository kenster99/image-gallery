import React, {useEffect, useState} from 'react'
import { Box, CircularProgress, Fab } from '@mui/material';
import { Check, Save, Edit } from '@mui/icons-material';
import { green } from '@mui/material/colors';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

const Actions = ({ params, rowId, setRowId }) => {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const navigate = useNavigate();

  const handleEdit = async (rowId) => {
    navigate("/image/"+rowId);
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
//           disabled={params.id !== rowId || loading}
          >
            <Edit onClick={(event) => {
              handleEdit(params.id);
            }}
        />

        </Fab>)}
    </Box>
    )
}

export default Actions