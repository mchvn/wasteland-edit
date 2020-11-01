import React, { useState, useEffect } from 'react';

import FileSelector from '../components/FileSelector'
import { Button, ActionButton, SmallButton } from '../components/Button'
//import DecompressionWorker from '../utils/decompression.worker.js';
import { recompress } from '../utils/compression'
import { decompress } from '../utils/decompression'
import FileDisplay from '../components/FileDisplay'
import dynamic from 'next/dynamic'

const TextEditor = dynamic(import('../components/Editor'), {
  ssr: false
})

var format = require('xml-formatter');

export default function App() {


  const [xml, setXml] = useState("<empty/>");
  const [saveData, setSaveData] = useState("");
  const [dataSize, setDataSize] = useState(0); //decompressed, should be bigger
  const [saveDataSize, setSaveDataSize] = useState(0); //compressed, should be smaller
  const [fileName, setFileName] = useState('');
  const [isSaved, setSaved] = useState(false);
  const [editor, setEditor] = useState(<div></div>)
  /**
   * Create a file and download it (a bit workaroundy, but it works)
   */
  const downloadTxtFile = () => {
    const element = document.createElement("a");
    const file = new Blob([saveData], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = fileName;
    document.body.appendChild(element);
    element.click();
  }

  // useEffect(() => {
  //   if (typeof window !== 'undefined') {
  //     import(/* webpackChunkName: "react-ace" */ 'react-ace').then(({ default: AceEditor }) => {

  //       setEditor(
  //         <AceEditor
  //           mode="xml"
  //           theme="monokai"
  //           onChange={updateXml}
  //           width="100%"
  //           value={xml}
  //           name="saveEditor"
  //           editorProps={{ $blockScrolling: true, $width: '100%' }}
  //         />
  //       )
  //     }).catch(error => 'An error occurred while loading the slider component')
  //   }


// }, [])

const Editor = ()=>{
  return<></>
}
/**
 * Stage the file to be downloaded
 * Recompress, and calculate new metadata
 */
const save = () => {
  const { newData, dSize, sdSize } = recompress(xml)
  setSaveData(newData)
  console.log(dSize, sdSize)
  setDataSize(dSize)
  setSaveDataSize(sdSize)
  setSaved(true)
}

/**
 * Decompresses and displays file in editor
 * @param {Blob[]} files 
 */
const loadFile = async (files) => {
  setXml('Processing...')
  decompress(files[0]).then(res => {
    console.log(res)
    updateXml(res.xml)
    setFileName(res.fileName)
  })
}

/**
 * When the user makes a change to the XML, set the save state to unsaved to hide the download button
 * because the data will need to be recompressed before downloading
 * @param {string} newData 
 */
const updateXml = (newData) => {
  setXml(newData)
  setSaved(false)
}


const beautify = (xml) => {
  try {
    var formattedXml = format(xml, {
      indentation: '  ',
      filter: (node) => node.type !== 'Comment',
      collapseContent: true,
      lineSeparator: '\n'
    });
    setXml(formattedXml)
  }
  catch (error) {
    alert('Invalid XML')
  }
}

return (

  <div>
    <div style={{ width: '70%', margin: 'auto' }}>
      <div style={{ margin: '45px 0' }}>
        <span style={{ fontSize: '42px', fontFamily: 'Goetz', borderRight: '3px solid white', margin: '20px 15px 15px 0', width: 'fit-content', padding: '8px 15px 0px 0' }}>Wasteland 3</span>
        <span style={{ fontSize: '32px', fontWeight: '400', opacity: '.6', position: 'relative', top: '-4px', fontFamily: 'Helvetica', margin: '20px 0', width: 'fit-content', padding: '10px 0' }}>Save Editor </span>
      </div>
      {fileName === '' ?
        <FileSelector onFileLoad={loadFile} />
        : <FileDisplay fileName={fileName} setXml={setXml} setFileName={setFileName} />}
      <SmallButton onClick={() => beautify(xml)}>Auto-format</SmallButton>
      <TextEditor lan='xml' />
      <ActionButton onClick={save}>Generate savefile</ActionButton>
      {isSaved && fileName ?
        <>
          <Button onClick={downloadTxtFile}>Download!</Button>
          <div>Use these values to update the corresponding metadata file:</div>
          <div style={{ margin: '10px 0' }}>
            <span>DataSize: {dataSize}</span>
            <span> SaveDataSize: {saveDataSize}</span>
          </div>
        </>
        : null}
    </div>
  </div>


);
}