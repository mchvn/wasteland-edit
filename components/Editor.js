import brace from 'brace';
import "ace-builds/src-noconflict/mode-xml";
import "ace-builds/src-noconflict/theme-monokai";
import 'brace/ext/searchbox'
import AceEditor from 'react-ace';
window.ace.require = window.ace.acequire;

const textEditor = (props) => (
  <div>
    <AceEditor
        mode={props.lan}
       
        name="UNIQUE_ID_OF_DIV"
        editorProps={{
            $blockScrolling: true
        }}
        fontSize={21}
        height='80vh'
        width='100%'
    />
  </div>
)

export default textEditor