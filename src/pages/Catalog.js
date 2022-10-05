import React from 'react'
import Topbar from '../components/Topbar'
import { useEffect, useState } from 'react'
import { API, graphqlOperation, Storage } from 'aws-amplify'
import { listImages } from '../graphql/queries'
import { Box } from '@mui/system';
import { DataGrid } from '@mui/x-data-grid';

const Catalog = () => {
    const [images, setImages] = useState(null)
    const [rowId, setRowId] = useState(null)

    useEffect( () => {
        async function fetchData() {
            const imageData = await API.graphql(graphqlOperation(listImages));
            setImages(imageData.data.listImages.items);
            console.log("== images == ")
            console.log(images)
        };
        fetchData();
    }, [images]);


    const columns = [
        { field: "url", headerName: "", height: "500px", sortable: false, filterable: false, 
            renderCell: (params) => {
                return (
                    <>
                        <img src={params.value} alt="{image.id}" height="100%" width="100%"  />
                    </>
                )
            } 
        },
        { field: "id", headerName: "ID", flex: 1},
        { field: "created", headerName: "Created", flex: 1},
        // { field: "action", headerName: "Action", type: "actions", 
        //     renderCell: (params) => <Actions {...{params, rowId, setRowId}} /> }
    ]

    // function getFileUrl (file) {
    //     const fileBlob = Storage.get(file.key)
    //     // return URL.createObjectURL(fileBlob)
    //     return fileBlob
    // }
    // const rows = images.map(image => ({
    //     id: image.id,
    //     url: image.file.key,
    //     created: image.createdAt
    // }))

  return (
    <>
    <Topbar />
    <div>Catalog</div>
    <Box sx={{display:'flex', mx:'auto', margin:8, height:500, width:'90%'}}>
        {/* <DataGrid rows={rows} columns={columns} pageSize={10} pagination={true} 
            getRowId={(row) => row.id}
            initialState= {{
                sorting: { sortModel: [{field: 'created', sort: 'desc'}]}
            }}
            onCellEditCommit={(params) => setRowId(params.id)} /> */}
    </Box>
    </>
  )
}

export default Catalog