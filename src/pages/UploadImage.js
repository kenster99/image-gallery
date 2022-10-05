import React, { useEffect, useState } from 'react';
import './UploadImage.css';

import { Storage, API, graphqlOperation } from 'aws-amplify';
import { createImage } from '../graphql/mutations';
import awsmobile from "../aws-exports"
import Topbar from '../components/Topbar'

const UploadImage = (props) => {
    const [fileUrl, setFileUrl] = useState(null)

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
            setFileUrl(URL.createObjectURL(file))
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
        <div className="UploadImage">
            <Topbar />
            <div>
                <p>Select an image to upload</p>
                <input type="file" onChange={onChange} />
            </div>
            <div>
                <img src={fileUrl} alt=""/>
            </div>
        </div>
    )


}

export default UploadImage;
