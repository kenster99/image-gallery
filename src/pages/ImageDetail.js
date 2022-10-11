import React, { useEffect, useState } from 'react'
import { API, graphqlOperation, Storage } from 'aws-amplify'
import { useParams } from 'react-router-dom'
import { getImage } from '../graphql/queries'

const ImageDetail = () => {
    const [image, setImage] = useState() 
    const { id } = useParams()

    async function fetchData() {

        console.log(" Id == " + id)        
        const apiData = await API.graphql({ 
          query: getImage,  
          variables: { id }
        })

        const imageData = apiData.data.getImage;
        setImage(imageData);
        console.log(imageData)
    };

    useEffect( () => {
        fetchData();      
    },[image]);
    
  return (
    <div className='ImageDetail'>
        
    </div>
  )
}

export default ImageDetail