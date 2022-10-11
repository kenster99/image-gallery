import React, { useLayoutEffect, useState } from 'react'
import { API, graphqlOperation, Storage } from 'aws-amplify'
import { useParams } from 'react-router-dom'
import { getImage } from '../graphql/queries'
import { Grid, Box, TextField } from '@mui/material'
import { AmplifyS3Image } from '@aws-amplify/ui-react/legacy';
import Topbar from '../components/Topbar'


const ImageDetail = () => {
    const [image, setImage] = useState(null) 
    const { id } = useParams()

    async function fetchData() {

        console.log(" Id == " + id)        
        const apiData = await API.graphql({ 
          query: getImage,  
          variables: { id }
        })

        setImage(apiData.data.getImage);

    };

    useLayoutEffect( () => {
        fetchData();      
    },[]);

    console.log('image: ', image)
  return (
    <div>
      <Topbar />
      <Grid container spacing={2} margin={4}>
        <Grid xs={4}>
          <AmplifyS3Image imgKey={image.name} height="100%" width="100%" />
        </Grid>
        <Grid xs={8}>
          <Box
            component="form"
            sx={{
              '& .MuiTextField-root': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
          >
            <div>
              <TextField
                required
                id="outlined-required"
                label="Required"
                defaultValue="Hello World"
              />              
            </div>
          </Box>
        </Grid>          
      </Grid>
    </div>
  )
}

export default ImageDetail