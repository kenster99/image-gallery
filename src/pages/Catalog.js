import React from 'react'
import Topbar from '../components/Topbar'
import { useEffect, useState } from 'react'
import { API, graphqlOperation, Storage } from 'aws-amplify'
import { listImages } from '../graphql/queries'
import { Box } from '@mui/system';
import { DataGrid } from '@mui/x-data-grid';
import { AmplifyS3Image } from '@aws-amplify/ui-react/legacy';
import './Catalog.css';
import Actions from '../components/Actions';
import { onCreateImage } from '../graphql/subscriptions';

const Catalog = () => {
    const [images, setImages] = useState([])
    const [rowId, setRowId] = useState(null)
    const [image, setImage] = useState()


    let subOnCreate;

    useEffect( () => {
        fetchData();      
    },[image]);
    
    useEffect( () => {
        setupSubscriptions();
        return () => {
            subOnCreate.unsubscribe();
        }
    })


    function setupSubscriptions() {
        subOnCreate = API.graphql(graphqlOperation(onCreateImage)).subscribe({
            next: (imagesData) => {
                setImage(imagesData)
            }
        })
    }

    async function fetchData() {
        const apiData = await API.graphql(graphqlOperation(listImages));
        const imageData = apiData.data.listImages.items;
        setImages(imageData);
    };
 
    console.log("== images == ")
    console.log(images)   
    const columns = [
        { field: "url", headerName: "", sortable: false, filterable: false, 
            renderCell: (params) => {
                return (
                    <>
                        <AmplifyS3Image imgKey={params.value} height="100" width="150" />
                    </>
                )
            } 
        },
        // { field: "url", headerName: "URL", flex: 1},        
        { field: "filename", headerName: "Filename", flex: 1},
        { field: "id", headerName: "ID", flex: 1},
        { field: "created", headerName: "Created", flex: 1},
        { field: "action", headerName: "Action", type: "actions", 
            renderCell: (params) => <Actions {...{params, rowId, setRowId}} /> }
    ]

    async function getFileUrl (file) {
        const fileBlob = await Storage.get(file.key)
        // return URL.createObjectURL(fileBlob)
        return fileBlob
    }
    
    const rows = images.map(image => ({
        id: image.id,
        filename: image.name,
        url: image.name,
        created: image.createdAt
    }))

    console.log("== rows == ")
    console.log(rows)  
  return (
    <>
    <Topbar />
    <Box sx={{display:'flex', mx:'auto', my:'auto', margin:8, height:500, width:'90%'}}>
        <DataGrid rows={rows} columns={columns} pageSize={10} pagination={true} rowHeight={120}
            getRowId={(row) => row.id}
            initialState= {{
                sorting: { sortModel: [{field: 'created', sort: 'desc'}]}
            }}
            onCellEditCommit={(params) => setRowId(params.id)} />
    </Box>
    </>
  )
}

export default Catalog