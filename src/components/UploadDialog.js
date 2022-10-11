import React from 'react'
import { Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { Storage, API, graphqlOperation } from 'aws-amplify';
import { createImage } from '../graphql/mutations';
import awsmobile from "../aws-exports"
import { useState } from 'react';

const UploadDialog = () => {
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

    return (
    <>
        {/* <Dialog aria-labelledby='dialog-title'
            open={open}
            onClose={ () => setOpen(false) }
            aria-label='dialog-title'
            aria-describedby='dialog-description'
            > */}
            <DialogTitle id='dialog-title'>File Upload</DialogTitle>
            <DialogContent>
                <p>Select an image to upload</p>
                <input type="file" onChange={onChange} />
            </DialogContent>
            <DialogActions>
                <Button onClick={() => setOpen(false) }>Cancel</Button>
                <Button autoFocus onClick={() => setOpen(false) }>Submit</Button>
            </DialogActions>
        {/* </Dialog> */}
    </>
    )
}

export default UploadDialog