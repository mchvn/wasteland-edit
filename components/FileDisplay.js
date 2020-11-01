import React from 'react';
import { useDropzone } from 'react-dropzone'
import styled from '@emotion/styled'


const FileZone = styled.div`
border: 1px solid #ddd;
border-radius: 0px;
padding: 15px 20px;
width: fit-content;
margin: 20px 0;
`

export default function FileDisplay(props) {

    const removeFile = () =>{
        props.setFileName('')
        props.setXml('')
    }
    return (

        <FileZone>
            <>
            <div style={{marginBottom:'4px', position:'relative'}}>
                <div style={{position:'absolute', top:-6,right:-8, cursor: 'pointer'}} onClick={removeFile}>x</div>
                <strong> Save file:</strong>
            </div>

            {props.fileName}
            </>
        </FileZone>
    )
}