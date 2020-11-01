import brace from 'brace';
import "ace-builds/src-noconflict/mode-xml";
import "ace-builds/src-noconflict/theme-monokai";
import 'brace/ext/searchbox'
import AceEditor from 'react-ace';

const textEditor = (props) => (
  <div>
    <AceEditor
        mode={props.lan}
        theme='monokai'
        onChange={props.onChange}
        name="xmlEditor"
        editorProps={{
            $blockScrolling: true
        }}
        value={props.value}
        height='80vh'
        width='100%'
    />
  </div>
)

export default textEditor